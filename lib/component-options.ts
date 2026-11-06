/** Recommendations only. Availability describes this portfolio, not other repositories. */
export const componentApps = [
  "Portfolio",
  "Account Signal Engine",
  "Security Market Map",
  "Detector Coverage Atlas",
  "Truffle Camp",
  "Interview dashboard",
  "GTM Revenue OS",
] as const;
export type ComponentApp = (typeof componentApps)[number];
export type ComponentOption = {
  id: string;
  name: string;
  purpose: string;
  availability: "Available here" | "Candidate";
  parts: string[];
  apps: readonly ComponentApp[];
  source: string;
  adoption: string;
};
export const componentOptions: ComponentOption[] = [
  {
    id: "identity",
    name: "Identity & ownership",
    purpose: "Recognize a person, author, stakeholder, or owner.",
    availability: "Available here",
    parts: ["Avatar", "Avatar group", "Tooltip"],
    apps: [
      "Portfolio",
      "Account Signal Engine",
      "Interview dashboard",
      "GTM Revenue OS",
    ],
    source: "https://ui.shadcn.com/docs/components/avatar",
    adoption:
      "Keep the existing Radix avatar and fallback. Use named owner rows when identity matters; portraits are optional.",
  },
  {
    id: "summaries",
    name: "Summary & discovery",
    purpose: "Show the key idea before a reader opens detail.",
    availability: "Available here",
    parts: ["Card", "Bento grid", "Carousel"],
    apps: [
      "Portfolio",
      "Security Market Map",
      "Truffle Camp",
      "Interview dashboard",
    ],
    source: "https://ui.shadcn.com/docs/components/card",
    adoption:
      "Start with cards. Use a carousel only for a short collection, with controls and an alternative path to all items.",
  },
  {
    id: "disclosure",
    name: "Organize long content",
    purpose: "Group information without creating an endless vertical list.",
    availability: "Available here",
    parts: ["Tabs", "Accordion"],
    apps: componentApps,
    source: "https://ui.shadcn.com/docs/components/tabs",
    adoption:
      "Tabs switch peer views. Accordions reveal optional detail. Leave essential summaries visible.",
  },
  {
    id: "context",
    name: "Inspect in context",
    purpose: "Open evidence or a short task near the originating item.",
    availability: "Available here",
    parts: ["Sheet", "Dialog", "Hover card"],
    apps: [
      "Portfolio",
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Interview dashboard",
    ],
    source: "https://ui.shadcn.com/docs/components/sheet",
    adoption:
      "Use a sheet for evidence, a dialog for a bounded action, and hover content only as supplementary information.",
  },
  {
    id: "data",
    name: "Compare & triage data",
    purpose: "Sort, filter, select, and compare many records.",
    availability: "Candidate",
    parts: ["Data table", "Pagination", "Column filters"],
    apps: [
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "GTM Revenue OS",
    ],
    source: "https://ui.shadcn.com/docs/components/data-table",
    adoption:
      "Pull into the data app when needed. Define row identifiers, server permissions, query behavior, and mobile summaries first.",
  },
  {
    id: "search",
    name: "Find & choose",
    purpose: "Search a growing collection or select a specific entity.",
    availability: "Candidate",
    parts: ["Command", "Combobox", "Popover"],
    apps: [
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Interview dashboard",
    ],
    source: "https://ui.shadcn.com/docs/components/command",
    adoption:
      "Use command search for navigation and combobox for selection. Keyboard access and a useful empty state are required.",
  },
  {
    id: "schedule",
    name: "Plan & schedule",
    purpose: "Choose dates and review upcoming work.",
    availability: "Candidate",
    parts: ["Calendar", "Date picker"],
    apps: ["Interview dashboard", "GTM Revenue OS", "Account Signal Engine"],
    source: "https://ui.shadcn.com/docs/components/calendar",
    adoption:
      "A date picker is a UI control, not calendar synchronization. Define timezone and all-day behavior before integration.",
  },
  {
    id: "feedback",
    name: "Communicate system state",
    purpose: "Explain loading, empty results, success, and failures.",
    availability: "Candidate",
    parts: ["Skeleton", "Empty", "Alert", "Toast", "Progress"],
    apps: componentApps,
    source: "https://ui.shadcn.com/docs/components/empty",
    adoption:
      "Add alongside a real asynchronous workflow. Keep errors inline and actionable; toast messages supplement durable feedback.",
  },
  {
    id: "workspace",
    name: "Workspace navigation",
    purpose: "Support repeated work across multiple views.",
    availability: "Candidate",
    parts: ["Sidebar", "Breadcrumb", "Resizable panels"],
    apps: [
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Interview dashboard",
      "GTM Revenue OS",
    ],
    source: "https://ui.shadcn.com/docs/components/sidebar",
    adoption:
      "Use application navigation in workspaces. The portfolio’s editorial header and existing breadcrumb remain its default.",
  },
  {
    id: "measurement",
    name: "Explain change over time",
    purpose: "Make numeric trends and comparisons easier to understand.",
    availability: "Candidate",
    parts: ["Chart", "Metric summary", "Accessible data table"],
    apps: [
      "Account Signal Engine",
      "Detector Coverage Atlas",
      "GTM Revenue OS",
    ],
    source: "https://ui.shadcn.com/docs/components/chart",
    adoption:
      "Use verified data, units, source, and date. Supply a text summary or table; a chart is not a relationship map.",
  },
  {
    "id": "visx-comparison",
    "name": "Compare quantities",
    "purpose": "Compare category counts or modeled scenario outputs on a shared scale.",
    "availability": "Candidate",
    "parts": [
      "Horizontal bars",
      "Stacked bars",
      "Exact-value table"
    ],
    "apps": [
      "Portfolio",
      "GTM Revenue OS",
      "Detector Coverage Atlas"
    ],
    "source": "https://visx.airbnb.tech/gallery",
    "adoption": "Adapt existing local bars first. Start magnitude bars at zero; stack only additive parts with a shared unit. Retain exact values, source and date. Portfolio feedback bars are already proposed in PR #223; do not duplicate them. No visx dependency installed."
  },
  {
    "id": "visx-coverage",
    "name": "Inspect evidence coverage",
    "purpose": "Find which capabilities have evidence and which remain unknown.",
    "availability": "Candidate",
    "parts": [
      "Heatmap",
      "Labeled coverage matrix",
      "Evidence details"
    ],
    "apps": [
      "Detector Coverage Atlas",
      "Security Market Map"
    ],
    "source": "https://visx.airbnb.tech/gallery",
    "adoption": "Use the existing semantic comparison table as the foundation. Categorical evidence states require explicit text, not a numeric heat scale. Unknown, not evaluated and unsupported remain distinct. Cells link to evidence; chart density must not imply detection effectiveness or market leadership."
  },
  {
    "id": "visx-trend",
    "name": "Inspect signals over time",
    "purpose": "See dated changes without mistaking collection activity for buying intent.",
    "availability": "Candidate",
    "parts": [
      "Line chart",
      "Event timeline",
      "Date range"
    ],
    "apps": [
      "Account Signal Engine",
      "GTM Revenue OS",
      "Detector Coverage Atlas"
    ],
    "source": "https://visx.airbnb.tech/gallery",
    "adoption": "Require timestamped history and documented aggregation. Missing observations are gaps, not zero. Label modeled Revenue OS series as scenarios. Keep individual signal sources accessible; defer brush/zoom until the data volume warrants it and provide keyboard date controls."
  },
  {
    "id": "visx-hierarchy",
    "name": "Explore a category hierarchy",
    "purpose": "Understand parent and child categories before opening their evidence.",
    "availability": "Candidate",
    "parts": [
      "Tree",
      "Indented outline",
      "Category detail"
    ],
    "apps": [
      "Security Market Map",
      "Portfolio"
    ],
    "source": "https://visx.airbnb.tech/gallery",
    "adoption": "Use a tree only for genuine hierarchy, with a readable outline on narrow screens. Security categories overlap, so preserve cross-links separately. No treemap sized by vendor count as a proxy for market share; no skills radar with invented personal scores."
  },
  {
    id: "chapter-story",
    name: "Chapter-based learning story",
    purpose: "Break a long lesson or guided workflow into labeled, readable chapters.",
    availability: "Candidate",
    parts: ["Chapter navigation", "Illustration", "Scroll-linked progress"],
    apps: ["Portfolio", "Truffle Camp", "Interview dashboard"],
    source: "https://caliperui.site/docs/components/scene-story-block",
    adoption:
      "Use the chapter structure as a design reference for lessons and onboarding. Keep native scrolling, text complete without art, chapter links keyboard-accessible, and mobile chapters stacked. Rebuild with local tokens; do not copy the Pro source.",
  },
  {
    id: "process-illustrations",
    name: "Process & system illustrations",
    purpose: "Make an integration, decision path, or multi-step system easier to understand at a glance.",
    availability: "Candidate",
    parts: ["Workflow illustration", "Decision branches", "Labeled stages"],
    apps: [
      "Portfolio",
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "GTM Revenue OS",
    ],
    source: "https://prestigeui.com/components/illustrations",
    adoption:
      "Use original SVG/CSS and project data to explain one real workflow at a time. Keep labels and a text explanation in the DOM, avoid animation as the only signal, and mark synthetic examples clearly. The Academy systems page already demonstrates this pattern.",
  },
  {
  "id": "game-inkjs",
  "name": "InkJS: branching practice",
  "purpose": "Practice discovery choices and see scripted consequences.",
  "availability": "Available here",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "GTM Revenue OS",
    "Portfolio"
  ],
  "source": "https://github.com/y-lohse/inkjs",
  "adoption": "Local pilot implemented: DiscoveryPilot. GTM #116 owns its consumer. Not merged, deployed or approved public UI. 2.4.0, MIT; see gameful-adoption.md."
},
  {
  "id": "game-react-quiz",
  "name": "React Quiz Component: practice challenges",
  "purpose": "Answer a sequence of existing lesson questions with feedback and scoring.",
  "availability": "Available here",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio",
    "Truffle Camp",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/wingkwong/react-quiz-component",
  "adoption": "Local LearningChallenge pilot only. Other app assignments are potential uses. 2.1.1, MIT. Keep lesson sources canonical and practice scores separate from certification."
},
  {
  "id": "game-hexgrid",
  "name": "React Hexgrid: learning territories",
  "purpose": "Explore numbered learning paths using tiles and equivalent text controls.",
  "availability": "Available here",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio",
    "Truffle Camp"
  ],
  "source": "https://github.com/Hellenic/react-hexgrid",
  "adoption": "Local LearningChallenge pilot only. 2.0.1, MIT. Keep native keyboard controls and readable labels; no invented prerequisite or mastery claims."
},
  {
  "id": "game-rpgui",
  "name": "RPGUI: quest journals and inventory",
  "purpose": "Explore an RPG-style quest journal or character-sheet interface.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio",
    "Truffle Camp"
  ],
  "source": "https://github.com/RonenNess/RPGUI",
  "adoption": "Potential only; not installed. Isolate to a themed Design Lab experiment. Recheck zlib license, maintenance, CSS scope, keyboard controls and contrast before adoption."
},
  {
  "id": "game-nes-css",
  "name": "NES.css: retro arcade interface",
  "purpose": "Try retro buttons, panels and progress styling for a small arcade or interactive resume.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio"
  ],
  "source": "https://github.com/nostalgic-css/NES.css",
  "adoption": "Potential only; not installed. Keep professional portfolio pages unchanged. Verify exact release/license, font and asset rights, responsive styling and focus visibility first."
},
  {
  "id": "game-matter",
  "name": "Matter.js: 2D physics puzzles",
  "purpose": "Experiment with sorting, stacking or colliding puzzle pieces.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio",
    "Truffle Camp"
  ],
  "source": "https://github.com/liabru/matter-js",
  "adoption": "Potential only; not installed. MIT reference. Define one learning task, lifecycle cleanup, performance budget and a keyboard/static alternative before a scoped pilot."
},
  {
  "id": "game-rapier",
  "name": "React Three Rapier: 3D physics",
  "purpose": "Add physical interactions to a future React Three Fiber scene.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio"
  ],
  "source": "https://github.com/pmndrs/react-three-rapier",
  "adoption": "Potential only; not installed. MIT reference. Depends on choosing a 3D use case first; inspect compatible R3F/React versions, WASM loading and mobile/static fallback."
},
  {
  "id": "game-ecctrl",
  "name": "Ecctrl: walkable project gallery",
  "purpose": "Let a visitor explore project stations through a controllable character.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio"
  ],
  "source": "https://github.com/pmndrs/ecctrl",
  "adoption": "Potential only; not installed. Larger experiment depending on R3F/Rapier. Verify exact license/version, touch controls, keyboard navigation and a complete ordinary project list."
},
  {
  "id": "game-howler",
  "name": "Howler.js: optional interaction audio",
  "purpose": "Try opt-in sound feedback for a completed challenge or interactive demo.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio",
    "Truffle Camp"
  ],
  "source": "https://github.com/goldfire/howler.js",
  "adoption": "Potential only; not installed. MIT reference. Sound off by default; require user initiation, mute/volume controls, equivalent visual feedback and separately licensed audio assets."
},
  {
  "id": "game-rewards",
  "name": "React Rewards: completion feedback",
  "purpose": "Try a brief celebration after a meaningful practice milestone.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio",
    "Truffle Camp",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/thedevelobear/react-rewards",
  "adoption": "Potential only; not installed. Existing CSS acknowledgment already covers the basic task. Add only for a demonstrated benefit after version/license and reduced-motion/cleanup checks."
},
  {
  "id": "game-dicebear",
  "name": "DiceBear: fictional persona avatars",
  "purpose": "Distinguish fictional personas in a learning or discovery exercise.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio",
    "Truffle Camp",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/dicebear/dicebear",
  "adoption": "Potential only; not installed. Inspect the chosen style license separately, bundle locally, preserve attribution and the approved joy. portrait; no remote avatar requests."
},
  {
  "id": "game-r3f",
  "name": "React Three Fiber: explorable scenes",
  "purpose": "Prototype a small three-dimensional project or learning scene.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio"
  ],
  "source": "https://github.com/pmndrs/react-three-fiber",
  "adoption": "Potential only; not installed. Define one scene and load budget, inspect license/version compatibility, and retain mobile/static and keyboard access before implementation."
},
  {
  "id": "game-phaser",
  "name": "Phaser React template: training mini-game",
  "purpose": "Prototype one fictional secrets-triage or learning exercise.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio",
    "Truffle Camp"
  ],
  "source": "https://github.com/phaserjs/template-react",
  "adoption": "Potential only; not installed. Isolated starter, not a production portfolio dependency. Review template/engine licenses, input/resize behavior and React lifecycle cleanup."
},
  {
  "id": "game-boardgame",
  "name": "boardgame.io: turn-based simulation",
  "purpose": "Explore a fictional negotiation or resource-allocation game.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/boardgameio/boardgame.io",
  "adoption": "Potential only; not installed. Begin single-player with deterministic rules and reset. Verify maintenance/license; no multiplayer, live finance, or forecast changes implied."
},
  {
  "id": "game-kenney",
  "name": "Kenney assets: game art and controls",
  "purpose": "Find a coherent asset pack for an approved mini-game prototype.",
  "availability": "Candidate",
  "parts": [
    "Game-like interactions",
    "Practice and exploration"
  ],
  "apps": [
    "Portfolio",
    "Truffle Camp"
  ],
  "source": "https://kenney.nl/assets",
  "adoption": "Potential only; no assets downloaded. Select a specific pack and record its exact license/file list and attribution before importing; this is an asset source, not a React package."
},
];
export function optionsForApp(
  app: ComponentApp | "All",
  query = "",
  availability: ComponentOption["availability"] | "All" = "All",
) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return componentOptions.filter(
    (option) =>
      (app === "All" || option.apps.includes(app)) &&
      (availability === "All" || option.availability === availability) &&
      terms.every((term) =>
        [option.name, option.purpose, ...option.parts, ...option.apps]
          .join(" ")
          .toLowerCase()
          .includes(term),
      ),
  );
}
