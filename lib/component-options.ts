/** Living opportunity inventory. Availability describes source in this portfolio, not adoption elsewhere. */
export const componentApps = [
  "Portfolio",
  "Account Signal Engine",
  "Security Market Map",
  "Detector Coverage Atlas",
  "Truffle Camp",
  "Interview dashboard",
  "GTM Revenue OS",
  "Channel Territory Mapping",
  "Portfolio Ops Runtime",
  "Technical Docs Platform",
  "Attio Setup",
  "DailySecrets"
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
    "id": "identity",
    "name": "Identity & ownership",
    "purpose": "Recognize a person, author, stakeholder, or owner.",
    "availability": "Available here",
    "parts": [
      "Avatar",
      "Avatar group",
      "Tooltip"
    ],
    "apps": [
      "Portfolio",
      "Account Signal Engine",
      "Interview dashboard",
      "GTM Revenue OS"
    ],
    "source": "https://ui.shadcn.com/docs/components/avatar",
    "adoption": "Keep the existing Radix avatar and fallback. Use named owner rows when identity matters; portraits are optional."
  },
  {
    "id": "summaries",
    "name": "Summary & discovery",
    "purpose": "Show the key idea before a reader opens detail.",
    "availability": "Available here",
    "parts": [
      "Card",
      "Bento grid",
      "Carousel"
    ],
    "apps": [
      "Portfolio",
      "Security Market Map",
      "Truffle Camp",
      "Interview dashboard"
    ],
    "source": "https://ui.shadcn.com/docs/components/card",
    "adoption": "Start with cards. Use a carousel only for a short collection, with controls and an alternative path to all items."
  },
  {
    "id": "disclosure",
    "name": "Organize long content",
    "purpose": "Group information without creating an endless vertical list.",
    "availability": "Available here",
    "parts": [
      "Tabs",
      "Accordion"
    ],
    "apps": [
      "Portfolio",
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Truffle Camp",
      "Interview dashboard",
      "GTM Revenue OS",
      "Channel Territory Mapping",
      "Portfolio Ops Runtime",
      "Technical Docs Platform",
      "Attio Setup",
      "DailySecrets"
    ],
    "source": "https://ui.shadcn.com/docs/components/tabs",
    "adoption": "Tabs switch peer views. Accordions reveal optional detail. Leave essential summaries visible."
  },
  {
    "id": "context",
    "name": "Inspect in context",
    "purpose": "Open evidence or a short task near the originating item.",
    "availability": "Available here",
    "parts": [
      "Sheet",
      "Dialog",
      "Hover card"
    ],
    "apps": [
      "Portfolio",
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Interview dashboard",
      "Channel Territory Mapping",
      "Portfolio Ops Runtime",
      "Technical Docs Platform"
    ],
    "source": "https://ui.shadcn.com/docs/components/sheet",
    "adoption": "Use a sheet for evidence, a dialog for a bounded action, and hover content only as supplementary information."
  },
  {
    "id": "data",
    "name": "Compare & triage data",
    "purpose": "Sort, filter, select, and compare many records.",
    "availability": "Candidate",
    "parts": [
      "Data table",
      "Pagination",
      "Column filters"
    ],
    "apps": [
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "GTM Revenue OS",
      "Channel Territory Mapping",
      "Portfolio Ops Runtime"
    ],
    "source": "https://ui.shadcn.com/docs/components/data-table",
    "adoption": "Pull into the data app when needed. Define row identifiers, server permissions, query behavior, and mobile summaries first."
  },
  {
    "id": "search",
    "name": "Find & choose",
    "purpose": "Search a growing collection or select a specific entity.",
    "availability": "Candidate",
    "parts": [
      "Command",
      "Combobox",
      "Popover"
    ],
    "apps": [
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Interview dashboard",
      "Channel Territory Mapping",
      "Portfolio Ops Runtime",
      "Technical Docs Platform"
    ],
    "source": "https://ui.shadcn.com/docs/components/command",
    "adoption": "Use command search for navigation and combobox for selection. Keyboard access and a useful empty state are required."
  },
  {
    "id": "schedule",
    "name": "Plan & schedule",
    "purpose": "Choose dates and review upcoming work.",
    "availability": "Candidate",
    "parts": [
      "Calendar",
      "Date picker"
    ],
    "apps": [
      "Interview dashboard",
      "GTM Revenue OS",
      "Account Signal Engine"
    ],
    "source": "https://ui.shadcn.com/docs/components/calendar",
    "adoption": "A date picker is a UI control, not calendar synchronization. Define timezone and all-day behavior before integration."
  },
  {
    "id": "feedback",
    "name": "Communicate system state",
    "purpose": "Explain loading, empty results, success, and failures.",
    "availability": "Candidate",
    "parts": [
      "Skeleton",
      "Empty",
      "Alert",
      "Toast",
      "Progress"
    ],
    "apps": [
      "Portfolio",
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Truffle Camp",
      "Interview dashboard",
      "GTM Revenue OS",
      "Channel Territory Mapping",
      "Portfolio Ops Runtime",
      "Technical Docs Platform",
      "Attio Setup",
      "DailySecrets"
    ],
    "source": "https://ui.shadcn.com/docs/components/empty",
    "adoption": "Add alongside a real asynchronous workflow. Keep errors inline and actionable; toast messages supplement durable feedback."
  },
  {
    "id": "workspace",
    "name": "Workspace navigation",
    "purpose": "Support repeated work across multiple views.",
    "availability": "Candidate",
    "parts": [
      "Sidebar",
      "Breadcrumb",
      "Resizable panels"
    ],
    "apps": [
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "Interview dashboard",
      "GTM Revenue OS",
      "Channel Territory Mapping",
      "Portfolio Ops Runtime",
      "Technical Docs Platform"
    ],
    "source": "https://ui.shadcn.com/docs/components/sidebar",
    "adoption": "Use application navigation in workspaces. The portfolio\u2019s editorial header and existing breadcrumb remain its default."
  },
  {
    "id": "measurement",
    "name": "Explain change over time",
    "purpose": "Make numeric trends and comparisons easier to understand.",
    "availability": "Candidate",
    "parts": [
      "Chart",
      "Metric summary",
      "Accessible data table"
    ],
    "apps": [
      "Account Signal Engine",
      "Detector Coverage Atlas",
      "GTM Revenue OS"
    ],
    "source": "https://ui.shadcn.com/docs/components/chart",
    "adoption": "Use verified data, units, source, and date. Supply a text summary or table; a chart is not a relationship map."
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
    "id": "chapter-story",
    "name": "Chapter-based learning story",
    "purpose": "Break a long lesson or guided workflow into labeled, readable chapters.",
    "availability": "Candidate",
    "parts": [
      "Chapter navigation",
      "Illustration",
      "Scroll-linked progress"
    ],
    "apps": [
      "Portfolio",
      "Truffle Camp",
      "Interview dashboard"
    ],
    "source": "https://caliperui.site/docs/components/scene-story-block",
    "adoption": "Use the chapter structure as a design reference for lessons and onboarding. Keep native scrolling, text complete without art, chapter links keyboard-accessible, and mobile chapters stacked. Rebuild with local tokens; do not copy the Pro source."
  },
  {
    "id": "process-illustrations",
    "name": "Process & system illustrations",
    "purpose": "Make an integration, decision path, or multi-step system easier to understand at a glance.",
    "availability": "Candidate",
    "parts": [
      "Workflow illustration",
      "Decision branches",
      "Labeled stages"
    ],
    "apps": [
      "Portfolio",
      "Account Signal Engine",
      "Security Market Map",
      "Detector Coverage Atlas",
      "GTM Revenue OS"
    ],
    "source": "https://prestigeui.com/components/illustrations",
    "adoption": "Use original SVG/CSS and project data to explain one real workflow at a time. Keep labels and a text explanation in the DOM, avoid animation as the only signal, and mark synthetic examples clearly. The Academy systems page already demonstrates this pattern."
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
    "name": "Native hex learning territories",
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
    "source": "https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path",
    "adoption": "Local LearningChallenge prototype using native HTML buttons and CSS clip-path. No hexgrid library or native optional dependencies. Keep visible focus, readable labels, an equivalent text list and no invented prerequisite or mastery claims."
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
  {
    "id": "game-fsrs",
    "name": "TS-FSRS: spaced repetition",
    "purpose": "Schedule concept review from previous practice answers.",
    "availability": "Candidate",
    "parts": [
      "Game-like interactions",
      "Potential"
    ],
    "apps": [
      "Portfolio",
      "Truffle Camp"
    ],
    "source": "https://github.com/open-spaced-repetition/ts-fsrs",
    "adoption": "Learning mechanic; candidate only. Requires explicit progress storage, retention/reset choices and timezone behavior. Check exact Node/browser compatibility and MIT release license before adoption."
  },
  {
    "id": "game-code-move",
    "name": "Shiki Magic Move: explain code changes",
    "purpose": "Show how a code or configuration example changes between steps.",
    "availability": "Candidate",
    "parts": [
      "Game-like interactions",
      "Potential"
    ],
    "apps": [
      "Portfolio",
      "Truffle Camp",
      "Technical Docs Platform"
    ],
    "source": "https://github.com/shikijs/shiki-magic-move",
    "adoption": "Teaching visualization; candidate only. Current package is @shikijs/magic-move. Review Shiki/version requirements, MIT notices and bundle cost. Provide static before/after code and reduced-motion handling."
  },
  {
    "id": "game-xstate",
    "name": "XState: simulation and workflow states",
    "purpose": "Model prerequisites, retries and consequences in a complex interaction.",
    "availability": "Candidate",
    "parts": [
      "Game-like interactions",
      "Potential"
    ],
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Truffle Camp",
      "Portfolio Ops Runtime"
    ],
    "source": "https://github.com/statelyai/xstate",
    "adoption": "Logic library, not a UI kit. Candidate only; MIT reference. Existing simple state helpers stay canonical until complexity justifies replacement. No implicit permissions, production automation or financial changes."
  },
  {
    "id": "game-twine",
    "name": "Twine: visual story authoring",
    "purpose": "Author nonlinear training stories visually and export standalone HTML.",
    "availability": "Candidate",
    "parts": [
      "Game-like interactions",
      "Potential"
    ],
    "apps": [
      "Portfolio",
      "Truffle Camp",
      "GTM Revenue OS"
    ],
    "source": "https://twinery.org/",
    "adoption": "Authoring alternative to InkJS, not a second required runtime. Candidate only. Verify editor and selected story-format licenses separately, accessible output and source/version control. No employer-confidential scenarios."
  },
  {
    "id": "game-pixi",
    "name": "PixiJS React: interactive 2D scenes",
    "purpose": "Explore 2D tokens, scenes or learning environments with React.",
    "availability": "Candidate",
    "parts": [
      "Game-like interactions",
      "Potential"
    ],
    "apps": [
      "Portfolio",
      "Truffle Camp"
    ],
    "source": "https://github.com/pixijs/pixi-react",
    "adoption": "Renderer alternative for a defined 2D pilot. Candidate only; MIT reference. Verify React/Pixi versions, rendering budget and complete DOM controls; not automatically a game engine."
  },
  {
    "id": "game-kaplay",
    "name": "KAPLAY: small training games",
    "purpose": "Prototype a fictional incident-routing or secret-finding mini-game.",
    "availability": "Candidate",
    "parts": [
      "Game-like interactions",
      "Potential"
    ],
    "apps": [
      "Portfolio",
      "Truffle Camp"
    ],
    "source": "https://github.com/kaplayjs/kaplay",
    "adoption": "Alternative engine to Phaser or Excalibur, not an additive dependency. Candidate only. Review exact license/release, input cleanup, keyboard/mobile access and a specific learning outcome first."
  },
  {
    "id": "game-excalibur",
    "name": "Excalibur: TypeScript 2D games",
    "purpose": "Build a bounded training game with levels and interactive objects.",
    "availability": "Candidate",
    "parts": [
      "Game-like interactions",
      "Potential"
    ],
    "apps": [
      "Portfolio",
      "Truffle Camp"
    ],
    "source": "https://github.com/excaliburjs/excalibur",
    "adoption": "Alternative engine to Phaser or KAPLAY. Candidate only; BSD-2-Clause reference. Choose one engine for one experiment, with resize/input/cleanup checks and a non-game learning route."
  },
  {
    "id": "game-rot",
    "name": "ROT.js: exploration puzzles",
    "purpose": "Explore rooms with fictional security or systems decisions.",
    "availability": "Candidate",
    "parts": [
      "Game-like interactions",
      "Potential"
    ],
    "apps": [
      "Portfolio",
      "Truffle Camp"
    ],
    "source": "https://github.com/ondras/rot.js",
    "adoption": "Roguelike toolkit; experimental candidate only. BSD-3-Clause reference. Lower priority than current practice pilots. Require text/keyboard access and explicit instructional value."
  },
  {
    "id": "game-trophy",
    "name": "Trophy UI: achievements and practice progress",
    "purpose": "Display meaningful achievements, practice milestones or streak history.",
    "availability": "Candidate",
    "parts": [
      "Game-like interactions",
      "Potential"
    ],
    "apps": [
      "Portfolio",
      "Truffle Camp",
      "GTM Revenue OS"
    ],
    "source": "https://github.com/trophyso/ui",
    "adoption": "Candidate only; components are distinct from any hosted backend. Use actual activity evidence, avoid public leaderboards or invented mastery. Review exact component license, Tailwind compatibility and accessible states before copying."
  },
  {
    "id": "import-review",
    "name": "Import review and duplicate resolution",
    "purpose": "Review mapped columns, row errors, duplicates and ownership before accepting an import.",
    "availability": "Candidate",
    "parts": [
      "Workflow composition",
      "Potential"
    ],
    "apps": [
      "Channel Territory Mapping",
      "Account Signal Engine",
      "Attio Setup"
    ],
    "source": "https://ui.shadcn.com/docs/components/table",
    "adoption": "Composition candidate using table, fields, status and confirmation. No file parser or CRM sync is installed by this record. Confirm Attio Setup requirements before proposing runtime UI. Keep row-level errors, reversible preview and human approval."
  },
  {
    "id": "evidence-workflow",
    "name": "Evidence and review checkpoints",
    "purpose": "Inspect provenance, freshness, missing evidence and a reviewed next action.",
    "availability": "Candidate",
    "parts": [
      "Workflow composition",
      "Potential"
    ],
    "apps": [
      "Detector Coverage Atlas",
      "Security Market Map",
      "Account Signal Engine",
      "Portfolio Ops Runtime",
      "Technical Docs Platform"
    ],
    "source": "https://ui.shadcn.com/docs/components/sheet",
    "adoption": "Composition candidate using existing detail/disclosure patterns. Suggested status never equals verified evidence or approval. Keep source URLs, timestamps, missing/denied states and keyboard return paths. Ops Runtime stays on its native stack unless separately justified."
  },
  {
    "id": "runbook-progress",
    "name": "Runbook and checklist progress",
    "purpose": "Follow a procedure with prerequisites, evidence links and explicit completion.",
    "availability": "Candidate",
    "parts": [
      "Workflow composition",
      "Potential"
    ],
    "apps": [
      "Technical Docs Platform",
      "Attio Setup",
      "Portfolio Ops Runtime",
      "Truffle Camp"
    ],
    "source": "https://ui.shadcn.com/docs/components/checkbox",
    "adoption": "Composition candidate; documentation-only consumers may use Markdown checklists. No new runtime required. Reuse canonical procedures; distinguish self-review from approved release. Attio scope is unverified because README was unavailable."
  },
  {
    "id": "editorial-review",
    "name": "Editorial source and publication review",
    "purpose": "Review a draft, source references and publication readiness.",
    "availability": "Candidate",
    "parts": [
      "Workflow composition",
      "Potential"
    ],
    "apps": [
      "Portfolio",
      "Technical Docs Platform",
      "DailySecrets"
    ],
    "source": "https://ui.shadcn.com/docs/components/card",
    "adoption": "Composition candidate; DailySecrets destination is provisional because README was unavailable. Confirm its intended workflow first. No publishing service, editor package or automated send is authorized by this record."
  },
{
  "id": "creative-motion-canvas",
  "name": "Motion Canvas explainers",
  "purpose": "Create code-driven visual explanations for content and marketing assets.",
  "availability": "Candidate",
  "parts": [
    "Creative production",
    "Video",
    "Marketing assets",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://motioncanvas.io/docs/",
  "adoption": "MIT upstream; evaluate a single narrated scene, editable source and caption workflow. No package installed."
},
{
  "id": "creative-obs",
  "name": "OBS product capture",
  "purpose": "Record authentic product workflows for demos, tutorials and marketing video.",
  "availability": "Candidate",
  "parts": [
    "Creative production",
    "Video",
    "Marketing assets",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/obsproject/obs-studio",
  "adoption": "GPL-2.0-or-later upstream; capture a controlled fictional demo, then inspect readability, cursor pacing and clean audio. No desktop integration installed."
},
{
  "id": "creative-ffmpeg",
  "name": "FFmpeg asset processing",
  "purpose": "Transform reviewed video and audio into content and marketing export variants.",
  "availability": "Candidate",
  "parts": [
    "Creative production",
    "Video",
    "Marketing assets",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://ffmpeg.org/legal.html",
  "adoption": "LGPL/GPL depends on build configuration; review the exact binary and codecs before distribution. Preserve caption and transcript outputs."
},
{
  "id": "creative-penpot",
  "name": "Penpot visual templates",
  "purpose": "Explore reusable storyboards, campaign layouts and visual marketing assets.",
  "availability": "Candidate",
  "parts": [
    "Creative production",
    "Video",
    "Marketing assets",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/penpot/penpot",
  "adoption": "MPL-2.0 upstream; keep company brand context separate from joy. and verify imported asset rights. No service connected."
},
{
  "id": "creative-remotion",
  "name": "Remotion coded video",
  "purpose": "Evaluate reusable React video templates for content and marketing explainers.",
  "availability": "Candidate",
  "parts": [
    "Creative production",
    "Video",
    "Marketing assets",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://www.remotion.dev/docs/license/pricing",
  "adoption": "Source-available with free/company license conditions; do not assume permissive OSS. Check organization/use eligibility before adoption. No package installed."
},
{
  "id": "asset-excalidraw",
  "name": "Diagrams and visual frameworks",
  "purpose": "Create reusable content and marketing assets for diagrams and visual frameworks.",
  "availability": "Candidate",
  "parts": [
    "Excalidraw",
    "Asset production",
    "Marketing",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/excalidraw/excalidraw",
  "adoption": "Export a reviewed diagram and text equivalent; reuse Mermaid for precise repo-native diagrams first."
},
{
  "id": "asset-marp",
  "name": "Presentation templates",
  "purpose": "Create reusable content and marketing assets for presentation templates.",
  "availability": "Candidate",
  "parts": [
    "Marp",
    "Asset production",
    "Marketing",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/marp-team/marp",
  "adoption": "Evaluate Markdown slide templates for enablement; no slide renderer installed."
},
{
  "id": "asset-inkscape",
  "name": "Editable vector illustrations",
  "purpose": "Create reusable content and marketing assets for editable vector illustrations.",
  "availability": "Candidate",
  "parts": [
    "Inkscape",
    "Asset production",
    "Marketing",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/inkscape/inkscape",
  "adoption": "Use SVG source for reusable visual assets; review fonts and imported artwork rights."
},
{
  "id": "asset-scribus",
  "name": "Reports and print collateral",
  "purpose": "Create reusable content and marketing assets for reports and print collateral.",
  "availability": "Candidate",
  "parts": [
    "Scribus",
    "Asset production",
    "Marketing",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/scribusproject/scribus",
  "adoption": "Evaluate page layout for briefs/handouts; include a readable digital alternative."
},
{
  "id": "asset-vega-lite",
  "name": "Data stories and charts",
  "purpose": "Create reusable content and marketing assets for data stories and charts.",
  "availability": "Candidate",
  "parts": [
    "Vega-Lite",
    "Asset production",
    "Marketing",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/vega/vega-lite",
  "adoption": "Reuse existing chart components first; require source data, table alternative and explicit limitations."
},
{
  "id": "asset-h5p",
  "name": "Portable interactive learning",
  "purpose": "Create reusable content and marketing assets for portable interactive learning.",
  "availability": "Candidate",
  "parts": [
    "H5P",
    "Asset production",
    "Marketing",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://h5p.org/",
  "adoption": "Compare only for unmet portability needs; existing Academy exercises remain the default. Hosting and content-type accessibility need review."
},
{
  "id": "asset-audacity",
  "name": "Audio and narration",
  "purpose": "Create reusable content and marketing assets for audio and narration.",
  "availability": "Candidate",
  "parts": [
    "Audacity",
    "Asset production",
    "Marketing",
    "Visual content"
  ],
  "apps": [
    "Portfolio",
    "GTM Revenue OS"
  ],
  "source": "https://github.com/audacity/audacity",
  "adoption": "Evaluate local recording/editing with a transcript and confirmed input rights; no voice generation or recording upload."
},
  {
    id: "motion-react-purposeful",
    name: "Motion for React: state and layout feedback",
    purpose: "Animate a meaningful step, panel, validation, or selected-state transition in a complex task.",
    availability: "Candidate",
    parts: ["Layout transition", "Presence for conditional panels", "Reduced-motion support"],
    apps: ["Portfolio", "GTM Revenue OS", "Account Signal Engine", "Interview dashboard"],
    source: "https://motion.dev/docs/react",
    adoption: "MIT candidate. Prefer existing native CSS for hover and color feedback. Only add Motion after a named workflow needs a layout/enter-exit interaction CSS cannot express. Follow useReducedMotion/MotionConfig and test interrupted focus, mobile and no-motion states; no package installed in GTM OS or Portfolio by this catalog.",
  },
  {
    id: "autoanimate-list-transitions",
    name: "FormKit AutoAnimate: changing list order",
    purpose: "Make additions, removals, and reordered workflow or editorial cards understandable without inventing extra state.",
    availability: "Candidate",
    parts: ["List reorder", "Filtered results", "Kanban transition"],
    apps: ["GTM Revenue OS", "Portfolio", "Account Signal Engine", "Detector Coverage Atlas"],
    source: "https://github.com/formkit/auto-animate",
    adoption: "MIT candidate. Consider only for a genuine dynamic collection such as Northline's editorial board. Check reduced-motion behavior and React 19 compatibility in a bounded prototype; never animate dense numeric tables or interfere with drag/keyboard focus. Not installed.",
  },
  {
    id: "motion-primitives-disclosure",
    name: "Motion-Primitives: contextual disclosure",
    purpose: "Present expandable evidence or decision details without hiding essential status and next action.",
    availability: "Candidate",
    parts: ["Animated disclosure", "Content preview", "Progress feedback"],
    apps: ["Portfolio", "GTM Revenue OS", "Security Market Map", "Interview dashboard"],
    source: "https://github.com/ibelick/motion-primitives",
    adoption: "Source candidate; exact-source license remains unresolved in this review. Review and pin exact source and licensing before adapting a single component, preserve local semantics and styling, and respect reduced-motion. Start with native details/accordion or existing workbench patterns. No copy or Motion dependency added.",
  },
  {
    "id": "motion-selection-indicator",
    "name": "Motion: selected-view indicator",
    "purpose": "Make a tab or workflow-view selection easier to follow.",
    "availability": "Candidate",
    "parts": [
      "Animated background",
      "Shared selection indicator",
      "Keyboard selected state"
    ],
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Security Market Map"
    ],
    "source": "https://github.com/ibelick/motion-primitives/blob/main/components/core/animated-background.tsx",
    "adoption": "Reference only: inspected blob ae0a1ffc5b375ee59744089c83527cdbe6acec8b imports motion/react and adds click/hover handlers, not complete tab semantics. Preserve the consumer's aria-selected and keyboard model; do not overwrite handlers. License file was not resolved in this review, so do not copy until exact-source licensing is verified. Static selected state under reduced motion."
  },
  {
    "id": "motion-evidence-accordion",
    "name": "Radix: expandable evidence motion",
    "purpose": "Open qualification guidance or supporting evidence while keeping the decision and blocker visible.",
    "availability": "Candidate",
    "parts": [
      "Accordion height transition",
      "Chevron rotation",
      "Evidence disclosure"
    ],
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Account Signal Engine"
    ],
    "source": "https://www.radix-ui.com/primitives/docs/components/accordion",
    "adoption": "First prototype choice for SPIN prompts and qualification evidence. Adapt existing native disclosure first; portfolio already has Radix, GTM OS does not. Review package/version/license before importing. Animate only optional detail; keep blocker summaries visible, return focus safely and disable motion when requested."
  },
  {
    "id": "motion-copy-feedback",
    "name": "Animate UI: copy confirmation",
    "purpose": "Confirm copying a discovery summary or handoff note after clipboard success.",
    "availability": "Candidate",
    "parts": [
      "Copy button",
      "Icon swap",
      "Inline success and error"
    ],
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Account Signal Engine"
    ],
    "source": "https://animate-ui.com/docs/primitives/animate-ui/copy-button",
    "adoption": "Prefer a local CSS/icon adaptation. Current docs use @animate-ui/react and separate icon packages; do not install the full stack for one button. MIT + Commons Clause inspected (blob 4c99063f507027c06af430d54c5b3cf167be51d7), not unrestricted open source. Reference only in this library; no component source redistribution. Review exact terms and dependencies before application use. Show Copied only after success; retain visible failure/retry and a polite text announcement. Download requested is not proof a file was saved."
  },
  {
    "id": "motion-native-view-transition",
    "name": "Native browser view transitions",
    "purpose": "Preserve orientation when moving between a workspace overview and its detail.",
    "availability": "Candidate",
    "parts": [
      "View Transition API",
      "Progressive enhancement",
      "Route transition"
    ],
    "apps": [
      "GTM Revenue OS",
      "Portfolio"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API",
    "adoption": "Later experiment, not a required runtime package. Check current browser support and Next.js routing integration before adoption. Ordinary navigation must work without the API. Preserve focus, back/forward, scroll restoration and unsaved-work guards. Skip transitions for reduced motion; never delay access or snapshot confidential overlays."
  },
  {
    "id": "motion-task-progress",
    "name": "Motion: truthful task progress",
    "purpose": "Show completed discovery sections or evaluation checklist items as their real state changes.",
    "parts": [
      "Progress indicator",
      "Completion labels",
      "Reduced-motion fill"
    ],
    "source": "https://www.radix-ui.com/primitives/docs/components/progress",
    "adoption": "Next: prototype a CSS transition on existing progress markup or native progress before adding a package. State the denominator and count only defined evidence, not clicks, time, or deal probability. Keep exact count and unknown states visible; no fake loading timer. Under reduced motion update instantly.",
    "availability": "Candidate",
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Account Signal Engine"
    ]
  },
  {
    "id": "motion-context-panel",
    "name": "Motion: contextual evidence panel",
    "purpose": "Inspect stakeholder notes or account evidence while keeping the originating record nearby.",
    "parts": [
      "Dialog or side panel",
      "Short enter and exit",
      "Focus return"
    ],
    "source": "https://www.radix-ui.com/primitives/docs/components/dialog",
    "adoption": "Later: reuse portfolio Dialog/Sheet; GTM OS needs a named benefit over an ordinary detail page. Pair motion with existing accessible modal semantics, visible close, Escape, focus management and background inertness. Retain edits across interruption, make mobile content scrollable and bypass motion when requested. Panel visibility is not authorization.",
    "availability": "Candidate",
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Account Signal Engine"
    ]
  },
  {
    "id": "motion-operation-feedback",
    "name": "Motion: confirmed operation feedback",
    "purpose": "Make a completed save, import or reversible action noticeable without interrupting the workflow.",
    "parts": [
      "Status toast",
      "Inline durable feedback",
      "Optional undo"
    ],
    "source": "https://www.radix-ui.com/primitives/docs/components/toast",
    "adoption": "Next after a real operation exists: keep success/error inline; a brief toast supplements it. Never say Saved on animation completion or offer Undo without a working reversal. Failed imports retain data and explain recovery. Test announcements, dismissal, repeated operations and reduced motion. Prefer local CSS for the initial feedback.",
    "availability": "Candidate",
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Account Signal Engine"
    ]
  },
  {
    "id": "motion-priority-reorder",
    "name": "Motion: reorder a short priority list",
    "purpose": "Let an operator arrange discovery questions or personal follow-up priorities and follow the changed order.",
    "parts": [
      "Reorder handles",
      "Move up and down buttons",
      "Cancel and restore"
    ],
    "source": "https://motion.dev/docs/react-reorder",
    "adoption": "Later bounded prototype: distinct from AutoAnimate, this is an actual reorder interaction. Stable IDs, button/keyboard alternatives and explicit persistence semantics required. Announce new position and support cancellation. Never change calculation order, deal stage, territory assignment or approval through drag. Compare existing dnd-kit guidance before adding Motion.",
    "availability": "Candidate",
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Account Signal Engine"
    ]
  },
  {
    "id": "motion-field-validation",
    "name": "Motion: inline validation feedback",
    "purpose": "Help a seller find and correct invalid discovery or POC fields without losing their entries.",
    "parts": [
      "Field error highlight",
      "Error summary links",
      "Inline correction"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid",
    "adoption": "Next: local CSS border/background transition only. MDN provides semantic guidance, not a motion component. Pair aria-invalid with linked text and a summary; retain entered data. Validate at deliberate boundaries, not every keystroke. No shaking fields, color-only error or focus theft. Reduced motion gets an immediate static error.",
    "availability": "Candidate",
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Account Signal Engine"
    ]
  },
  {
    "id": "motion-loading-placeholder",
    "name": "Motion: loading-to-content handoff",
    "purpose": "Reserve space while account/report data loads and distinguish loading, empty and failed requests.",
    "parts": [
      "Static skeleton",
      "Busy region",
      "Content replacement"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy",
    "adoption": "Next only for a real asynchronous request: prefer a static skeleton and readable status. aria-busy guidance is semantic, not animation code. Avoid shimmer loops and fake percentages; errors need retry and empty results need a distinct message. Replace placeholders without moving focus or unnecessarily hiding stale-but-labeled data. Do not delay fast responses.",
    "availability": "Candidate",
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Account Signal Engine"
    ]
  },
  {
    "id": "motion-workflow-trace",
    "name": "Motion: user-triggered workflow trace",
    "purpose": "Explain one campaign-to-sales handoff or evaluation decision path with a short labeled connector trace.",
    "parts": [
      "SVG path drawing",
      "Replay control",
      "Static text alternative"
    ],
    "source": "https://motion.dev/docs/react-svg-animation",
    "adoption": "Later learning/demo pattern: start with original SVG and CSS; Motion is optional after measured need. Trace only on explicit Play, with Stop/Replay and an immediate complete diagram under reduced motion. Keep all labels and a text explanation visible; a moving connector is an illustration, not live integration or a completed handoff. No looping flow animation or invented progress.",
    "availability": "Candidate",
    "apps": [
      "GTM Revenue OS",
      "Portfolio",
      "Account Signal Engine"
    ]
  },
  {
    "id": "story-journey",
    "name": "Interactive story journey",
    "purpose": "Navigate a lesson through scenes, chapters, actions and replay.",
    "availability": "Candidate",
    "parts": [
      "Scene stepper",
      "Chapter context",
      "Replay and orientation"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "Portfolio"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Refine the DailySecrets rail rather than replace it. Keep keyboard focus, current step, text-only navigation and reduced-motion behavior."
  },
  {
    "id": "story-living-system",
    "name": "Living system and cumulative copy map",
    "purpose": "Show the consequences of events across connected systems over time.",
    "availability": "Candidate",
    "parts": [
      "System nodes",
      "Cumulative copies",
      "Active versus revoked states"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "Security Market Map"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Extend the existing DailySecrets copy map using a static accessible list first. Separate exposure location from credential validity and avoid implying every location is scanned."
  },
  {
    "id": "story-decision-feedback",
    "name": "Decision and consequence",
    "purpose": "Invite meaningful choices and explain why each response succeeds or fails.",
    "availability": "Candidate",
    "parts": [
      "Choice cards",
      "Persistent outcome",
      "Retry and explanation"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "GTM Revenue OS"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Use a small fixed set of synthetic decisions, not an unrestricted branching engine. Ensure every choice has readable feedback and recovery."
  },
  {
    "id": "story-recap",
    "name": "Scenario recap and debrief",
    "purpose": "Connect actions, changed state, evidence and transferable learning outcomes.",
    "availability": "Candidate",
    "parts": [
      "Event summary",
      "Decision recap",
      "Learning takeaways"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "GTM Revenue OS"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Keep a static end-state summary accessible even without animation. Do not treat completion as certification or actual incident closure."
  },
  {
    "id": "story-explorer",
    "name": "Clickable concept and system explorer",
    "purpose": "Let learners inspect a connected technical environment while retaining a readable overview.",
    "availability": "Candidate",
    "parts": [
      "Interactive nodes",
      "Details panel",
      "Text alternative"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "Security Market Map"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Start with labeled buttons and a text list; defer graph packages until network size and navigation requirements demonstrate need."
  },
  {
    "id": "story-replay",
    "name": "Time travel and state replay",
    "purpose": "Compare what was true at different steps without losing the chronology.",
    "availability": "Candidate",
    "parts": [
      "Scene scrubber",
      "Step history",
      "Replay and reset"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Derive states from canonical scene data; ensure scrubbing does not falsely undo issuer-side revocation or imply saved progress."
  },
  {
    "id": "story-sandbox",
    "name": "Guided technical sandbox",
    "purpose": "Practice commands and process choices without invoking real infrastructure.",
    "availability": "Candidate",
    "parts": [
      "Simulated console",
      "Bounded tasks",
      "Safe validation feedback"
    ],
    "apps": [
      "Truffle Camp",
      "DailySecrets"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Use synthetic inputs and deterministic local validation. Do not execute real commands, use credentials or introduce an extra runtime for an explanatory lesson."
  },
  {
    "id": "story-swimlane",
    "name": "Role-based responsibility explorer",
    "purpose": "Reveal who owns, investigates, is affected by and authorizes each step.",
    "availability": "Candidate",
    "parts": [
      "Role lanes",
      "Handoff links",
      "Authority explanations"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "GTM Revenue OS"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Differentiate job title from authorization. Prefer accessible structured rows over a complex swimlane canvas for the first specimen."
  },
  {
    "id": "story-what-if",
    "name": "What-if and dependency simulator",
    "purpose": "Explore counterfactual changes with explicit assumptions and consequences.",
    "availability": "Candidate",
    "parts": [
      "Scenario controls",
      "Dependency view",
      "Counterfactual explanation"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "Security Market Map"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Mark simulated results as hypotheses; show unknown consumers and failure cases. No actual production state changes."
  },
  {
    "id": "story-predict-reveal",
    "name": "Predict then reveal",
    "purpose": "Ask the learner to predict an outcome before exposing the evidence.",
    "availability": "Candidate",
    "parts": [
      "Prediction choices",
      "Reveal action",
      "Explanatory feedback"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "Portfolio"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Avoid ambiguous scoring: distinguish possible locations from confirmed copies. Feedback must not rely on color or motion."
  },
  {
    "id": "story-evidence",
    "name": "Evidence inspector",
    "purpose": "Teach the difference between detection, verification, ownership and proof of closure.",
    "availability": "Candidate",
    "parts": [
      "Evidence card",
      "Source and uncertainty",
      "Finding state comparison"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "Security Market Map"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Keep evidence provenance and unknowns visible. A detector finding does not establish a valid credential or successful remediation."
  },
  {
    "id": "story-hotspots",
    "name": "Annotated scene and contextual glossary",
    "purpose": "Explain technical objects in place without obscuring the story.",
    "availability": "Candidate",
    "parts": [
      "Accessible hotspot",
      "Plain-language definition",
      "Optional technical depth"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "Portfolio"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Support touch and keyboard; do not require hover. Keep essential definitions visible and optional detail behind explicit controls."
  },
  {
    "id": "story-comparator",
    "name": "Before and after state comparator",
    "purpose": "Compare two system states and explain the causal difference.",
    "availability": "Candidate",
    "parts": [
      "Paired states",
      "Change summary",
      "Accessible labels"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "Security Market Map"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Label the exact moment and scenario; do not collapse exposure, verification and revocation into one success badge."
  },
  {
    "id": "story-misconception",
    "name": "Misconception check and interactive checklist",
    "purpose": "Test a common mistaken belief and practice its corrective sequence.",
    "availability": "Candidate",
    "parts": [
      "Claim check",
      "Sequence checklist",
      "Why feedback"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Reconcile with existing quiz and runbook patterns. Build a composition, not another quiz package; distinguish simulation from real action."
  },
  {
    "id": "story-perspectives",
    "name": "Perspective switching",
    "purpose": "Explain the same event to technical, operational and business audiences.",
    "availability": "Candidate",
    "parts": [
      "Persona selector",
      "Shared facts",
      "Audience-specific explanation"
    ],
    "apps": [
      "DailySecrets",
      "Truffle Camp",
      "GTM Revenue OS"
    ],
    "source": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "adoption": "Keep the underlying facts unchanged across views. Titles do not imply permissions; avoid duplicate content in the source."
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
