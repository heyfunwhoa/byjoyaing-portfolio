/**
 * Small evidence overlay for the existing component-options catalog.
 *
 * This does NOT create a second catalog of component ideas. It supplies status,
 * family and exact source-level evidence to the canonical records.
 * "Adopted" means inspected use in repository source, not deployed or approved
 * for another application. All other repository names are suggestions.
 */
import {
  componentOptions,
  optionsForApp,
  type ComponentApp,
  type ComponentOption,
} from "../component-options.ts";

export const patternStages = [
  "Candidate",
  "Prototype",
  "Approved",
  "Adopted",
] as const;
export type PatternStage = (typeof patternStages)[number];

export const patternFamilies = [
  "Core UI & navigation",
  "Data & evidence",
  "Motion & feedback",
  "Learning & gameful",
  "Content & workflow",
] as const;
export type PatternFamily = (typeof patternFamilies)[number];

export const stageDefinitions: Record<PatternStage, string> = {
  Candidate: "An idea or upstream option; no local adoption is implied.",
  Prototype: "Local source or a bounded workbench demo exists; not approved for reuse.",
  Approved: "An owner has reviewed a named use and recorded an approval decision.",
  Adopted: "An exact source-level use has been inspected in a consuming component.",
};

export type PatternFile = {
  path: string;
  label: string;
  /** A pinned feature-branch commit when the source is not yet on main. */
  ref?: string;
};
export type PatternUse = PatternFile & {
  repository: `heyfunwhoa/${string}`;
  /** This is source code evidence, not proof of a deployed page. */
  scope: "source-level";
};

type PatternEvidence = {
  localSource?: readonly PatternFile[];
  uses?: readonly PatternUse[];
  /** Approval is distinct from verified use. None is asserted without an owner record. */
  approval?: { decisionUrl: string; namedUse: string };
};
const gamefulCommit = "f4ecd7d11d41ac9c665e51861a80262111f95bd8";

/** Only inspected source-level examples are recorded here. */
export const patternEvidence: Readonly<Record<string, PatternEvidence>> = {
  identity: {
    localSource: [
      { path: "components/ui/avatar.tsx", label: "Radix avatar source" },
      { path: "components/design-lab/demos.tsx", label: "Design Lab example" },
    ],
  },
  summaries: {
    localSource: [
      { path: "components/ui/card.tsx", label: "Card primitive" },
      { path: "components/ui/bento-grid.tsx", label: "Bento component" },
    ],
    uses: [
      {
        repository: "heyfunwhoa/byjoyaing-portfolio",
        path: "components/stakeholder-map/stakeholder-detail.tsx",
        label: "Stakeholder detail uses Card",
        scope: "source-level",
      },
    ],
  },
  disclosure: {
    localSource: [
      { path: "components/ui/tabs.tsx", label: "Tabs primitive" },
      { path: "components/ui/accordion.tsx", label: "Accordion primitive" },
    ],
    uses: [
      {
        repository: "heyfunwhoa/byjoyaing-portfolio",
        path: "components/toolkit-explorer.tsx",
        label: "Toolkit explorer uses Tabs",
        scope: "source-level",
      },
      {
        repository: "heyfunwhoa/security-market-map",
        path: "components/scenario-player.tsx",
        ref: "92c01d81770c24be95e41057bdbdf991879dbe42",
        label: "Security Market Map scenario tabs",
        scope: "source-level",
      },
    ],
  },
  context: {
    localSource: [
      { path: "components/ui/sheet.tsx", label: "Sheet primitive" },
      { path: "components/ui/dialog.tsx", label: "Dialog primitive" },
      { path: "components/design-lab/motion-workbench.tsx", label: "Local workbench demo" },
    ],
    uses: [
      {
        repository: "heyfunwhoa/account-signal-engine",
        path: "components/feed-app.tsx",
        ref: "ea4971dcb81da1463f672e2d71f1cd460718c777",
        label: "Account Signal Engine drafting sheet",
        scope: "source-level",
      },
      {
        repository: "heyfunwhoa/truffle-camp",
        path: "components/trail-checkpoint.tsx",
        ref: "b3bcfae69a959fc2fe7142689335018f4c891974",
        label: "Truffle Camp checkpoint dialog",
        scope: "source-level",
      },
    ],
  },
  "game-inkjs": {
    localSource: [
      {
        path: "components/gameful/discovery-pilot.tsx",
        label: "Local fictional branching pilot",
        ref: gamefulCommit,
      },
    ],
  },
  "game-react-quiz": {
    localSource: [
      {
        path: "components/design-lab/learning-challenge.tsx",
        label: "Local challenge prototype",
        ref: gamefulCommit,
      },
    ],
  },
  "game-hexgrid": {
    localSource: [
      {
        path: "components/design-lab/learning-challenge.tsx",
        label: "Local challenge source (not a shared game engine)",
        ref: gamefulCommit,
      },
    ],
  },
};

function familyFor(id: string): PatternFamily {
  if (id.startsWith("game-") || id === "chapter-story" || id === "process-illustrations")
    return "Learning & gameful";
  if (id.startsWith("motion-") || id === "autoanimate-list-transitions" || id === "feedback")
    return "Motion & feedback";
  if (id.startsWith("visx-") || ["data", "measurement", "tremor-dashboard-measurement"].includes(id))
    return "Data & evidence";
  if (["import-review", "evidence-workflow", "runbook-progress", "editorial-review"].includes(id))
    return "Content & workflow";
  return "Core UI & navigation";
}

export type PatternRecord = ComponentOption & {
  family: PatternFamily;
  stage: PatternStage;
  localSource: readonly PatternFile[];
  uses: readonly PatternUse[];
  approval?: { decisionUrl: string; namedUse: string };
};

export function toPatternRecord(option: ComponentOption): PatternRecord {
  const evidence = patternEvidence[option.id];
  const uses = evidence?.uses ?? [];
  const localSource = evidence?.localSource ?? [];
  // Approval alone is never inferred from availability or a passed build.
  const stage: PatternStage =
    uses.length > 0
      ? "Adopted"
      : evidence?.approval
        ? "Approved"
        : option.availability === "Available here"
          ? "Prototype"
          : "Candidate";
  return {
    ...option,
    family: familyFor(option.id),
    stage,
    localSource,
    uses,
    ...(evidence?.approval ? { approval: evidence.approval } : {}),
  };
}

export type PatternFilters = {
  app?: ComponentApp | "All";
  query?: string;
  availability?: ComponentOption["availability"] | "All";
  family?: PatternFamily | "All";
  stage?: PatternStage | "All";
};

const stageOrder: Record<PatternStage, number> = {
  Adopted: 0,
  Approved: 1,
  Prototype: 2,
  Candidate: 3,
};

/** One searchable view of the canonical componentOptions list, never a copied inventory. */
export function patternsForLibrary(filters: PatternFilters = {}): PatternRecord[] {
  const { app = "All", query = "", availability = "All", family = "All", stage = "All" } = filters;
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return optionsForApp(app, "", availability)
    .map(toPatternRecord)
    .filter((option) => {
      if (family !== "All" && option.family !== family) return false;
      if (stage !== "All" && option.stage !== stage) return false;
      const haystack = [
        option.name,
        option.purpose,
        option.family,
        option.stage,
        ...option.parts,
        ...option.apps,
        ...option.localSource.map((item) => item.label),
        ...option.uses.map((item) => item.label),
      ].join(" ").toLowerCase();
      return terms.every((term) => haystack.includes(term));
    })
    .sort((a, b) => stageOrder[a.stage] - stageOrder[b.stage]);
}

/** A GitHub source link, not an executable import into another application. */
export function patternFileUrl(file: PatternFile, repository = "heyfunwhoa/byjoyaing-portfolio"): string {
  return `https://github.com/${repository}/blob/${file.ref ?? "main"}/${file.path}`;
}

export const patternLibraryCount = componentOptions.length;
