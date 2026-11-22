import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import enterprise from "../../content/field-notes/guides/enterprise-deal.json" with { type: "json" };
import multithreading from "../../content/field-notes/guides/multithreading.json" with { type: "json" };
import { fieldNoteBodies, fieldNoteIds, readFieldNote } from "./bodies.ts";
import { marketingPlaybooks } from "./marketing-playbooks.ts";
import { salesPlaybooks } from "./sales-playbooks.ts";
import { resolvePlaybookConnections, type PlaybookOutline } from "./playbook-links.ts";
import { connectedSources } from "../field-notes.ts";
import { directoryProjects } from "../project-directory.ts";

const read = (file: string) =>
  readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

test("every playbook connection resolves to an existing public destination without exposing a private repository", () => {
  const playbooks: readonly PlaybookOutline[] = [...salesPlaybooks, ...marketingPlaybooks];
  const ids = playbooks.map((playbook) => playbook.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const playbook of playbooks) {
    const links = resolvePlaybookConnections(playbook);
    assert.ok(links.length > 0, `${playbook.id} needs connected work`);
    assert.equal(new Set(links.map((link) => link.href)).size, links.length);
    for (const link of links) {
      assert.ok(link.contribution.trim());
      const source = connectedSources.find((source) => source.name === link.source);
      assert.ok(source);
      if (link.href.startsWith("/work/")) {
        const project = directoryProjects.find((project) => project.caseStudyUrl === link.href);
        assert.ok(project, `${playbook.id}: missing public project ${link.href}`);
        assert.equal(link.label, project.title);
        assert.ok(read(`content/work/studies/${project.slug}.json`));
      } else {
        assert.equal(source.visibility, "public");
        assert.ok("url" in source);
        assert.equal(link.href, source.url);
      }
      if (source.visibility === "private") assert.ok(link.href.startsWith("/work/"));
    }
    if (playbook.guide) assert.ok(read(`app${playbook.guide.href}/page.tsx`));
  }
});

test("unresolved source and project references fail instead of publishing a broken or guessed link", () => {
  const playbook: PlaybookOutline = salesPlaybooks[0];
  assert.throws(() => resolvePlaybookConnections({
    ...playbook,
    connections: [{ sourceId: "missing-source", contribution: "Unknown" }],
  } as unknown as PlaybookOutline), /Unknown playbook source/);
  assert.throws(() => resolvePlaybookConnections({
    ...playbook,
    connections: [{ sourceId: "gtm-revenue-os", projectSlug: "missing-project", contribution: "Unknown" }],
  } as unknown as PlaybookOutline), /Missing playbook project/);
});

test("Field Note files are exactly the two published guide ids", () => {
  assert.deepEqual(
    readdirSync(new URL("../../content/field-notes/guides", import.meta.url))
      .filter((name) => name.endsWith(".json"))
      .sort(),
    [...fieldNoteIds].sort().map((id) => `${id}.json`),
  );
});

test("the two guides render one record and leave routes, labels, and the registry in code", () => {
  assert.equal(
    fieldNoteBodies["enterprise-deal"].standfirst,
    enterprise.standfirst,
  );
  assert.equal(
    fieldNoteBodies.multithreading.headline,
    multithreading.headline,
  );
  assert.equal(
    fieldNoteBodies["enterprise-deal"].links.experience.href,
    "/work#enterprise-sales",
  );
  assert.equal(
    fieldNoteBodies.multithreading.links.request.href,
    "/contact?playbook=multithreading#access",
  );
  assert.match(
    fieldNoteBodies.multithreading.sections.conversation.body,
    /stakeholder’s priorities/,
  );

  const dealPage = read("app/field-notes/enterprise-deal/page.tsx");
  const threadPage = read("app/field-notes/multithreading/page.tsx");
  const index = read("app/field-notes/page.tsx");
  const registry = read("lib/field-notes.ts");
  assert.match(dealPage, /fieldNoteBodies/);
  assert.match(dealPage, /status="illustrative"/);
  assert.doesNotMatch(dealPage, /A field-to-leadership view/);
  assert.match(threadPage, /Explore the example/);
  assert.doesNotMatch(threadPage, /Map the people behind the decision/);
  assert.match(index, /salesPlaybooks/);
  assert.match(registry, /Account Signal Engine/);
  assert.doesNotMatch(registry, /fieldNoteBodies/);
  assert.match(read("keystatic.config.ts"), /kind: "local"/);
  assert.doesNotMatch(read("keystatic.config.ts"), /kind: "cloud"/);
});

test("a changed id, new href, or empty sentence fails closed", () => {
  assert.throws(() => readFieldNote("enterprise-deal", null));
  for (const change of [
    { id: "enterprise-deal" },
    { title: " " },
    { headline: "A different headline" },
    { classification: "private" },
    { publicationStatus: "approved" },
    { contentVersion: 0 },
    { reviewDue: "2026-02-30" },
    { routes: ["/field-notes/enterprise-deal"] },
    {
      links: enterprise.links.map((link) =>
        link.key === "experience" ? { ...link, href: "/private-work" } : link,
      ),
    },
    {
      sections: enterprise.sections.map((section) =>
        section.key === "use-when" ? { ...section, body: " " } : section,
      ),
    },
    {
      sections: [
        ...enterprise.sections,
        {
          key: "secret",
          kicker: "",
          heading: "",
          body: "no",
          note: "",
        },
      ],
    },
  ])
    assert.throws(() =>
      readFieldNote("enterprise-deal", { ...enterprise, ...change }),
    );

  assert.throws(() =>
    readFieldNote("multithreading", {
      ...multithreading,
      links: multithreading.links.map((link) =>
        link.key === "deal" ? { ...link, href: "https://example.com" } : link,
      ),
    }),
  );
  const { kicker, heading, note, ...useWhen } = enterprise.sections[0];
  assert.equal(kicker, "");
  assert.equal(heading, "");
  assert.equal(note, "");
  const omitted = {
    ...enterprise,
    sections: [useWhen, ...enterprise.sections.slice(1)],
  };
  assert.equal(
    readFieldNote("enterprise-deal", omitted).sections["use-when"].body,
    enterprise.sections[0].body,
  );

  const edited = readFieldNote("multithreading", {
    ...multithreading,
    standfirst: "Edited.",
  });
  assert.equal(edited.standfirst, "Edited.");
  assert.equal(edited.links.deal.href, "/field-notes/enterprise-deal");
});
