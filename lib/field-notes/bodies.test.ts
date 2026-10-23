import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import enterprise from "../../content/field-notes/guides/enterprise-deal.json" with { type: "json" };
import multithreading from "../../content/field-notes/guides/multithreading.json" with { type: "json" };
import { fieldNoteBodies, fieldNoteIds, readFieldNote } from "./bodies.ts";

const read = (file: string) =>
  readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

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
  assert.match(index, /Strategic account planning/);
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
