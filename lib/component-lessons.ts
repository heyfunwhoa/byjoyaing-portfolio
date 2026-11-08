import type { ComponentOption } from "./component-options.ts";

export type LessonAlternative = { name: string; tradeoff: string };
export type LessonProject = { name: string; application: string };
export type LessonKind = "concept" | "component";
export type LessonLevel = "foundational";
export type LessonTrack = "All" | "Foundations" | "Components";

export type ComponentLesson = {
  id: string;
  title: string;
  family: string;
  kind: LessonKind;
  level: LessonLevel;
  definition: string;
  why: string;
  useCases: readonly string[];
  when: string;
  avoid: string;
  alternatives: readonly LessonAlternative[];
  variants: string;
  accessibility: string;
  projects: readonly LessonProject[];
  prompt: string;
  exercise: string;
  source: string;
  related: readonly string[];
  catalogId?: ComponentOption["id"];
};

const foundations: ComponentLesson[] = [
  {
    id: "typography",
    title: "Typography and type hierarchy",
    family: "Foundations",
    kind: "concept",
    level: "foundational",
    definition:
      "Typography is how words are set: family, size, weight, and line height. Hierarchy is the order those differences create, so a reader can see the title before the detail.",
    why: "A page with one clear title and quieter supporting text is easier to scan. Size and weight do that work. A second font is not required.",
    useCases: [
      "A page title, a short eyebrow, body copy, and a technical date",
      "A card title that is stronger than its summary",
      "Metadata that should look different from the sentence it follows",
    ],
    when: "Every page and card that has a title plus supporting text.",
    avoid:
      "Do not give a page several titles of the same size. Do not set long reading text in a monospace face.",
    alternatives: [
      {
        name: "One size for everything",
        tradeoff: "Simple, but the reader has to find the title by reading.",
      },
      {
        name: "A display typeface",
        tradeoff:
          "Can add character. This site keeps Geist for display and body.",
      },
    ],
    variants:
      "The example switches an eyebrow, a title, body text, and monospace metadata.",
    accessibility:
      "Use a heading for the title, not a bigger div. Keep body text at a readable size with relaxed line height. Do not convey the hierarchy by color alone.",
    projects: [
      {
        name: "Portfolio",
        application:
          "Editorial pages already use an eyebrow, a title, and body text.",
      },
      {
        name: "Technical Docs Platform",
        application: "Long guides need one title and quieter section headings.",
      },
    ],
    prompt: "Can I point to the single title before I read the body?",
    exercise:
      "Take a sample with three same-sized headings and rewrite it so only one is the page title.",
    source:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Fundamentals",
    related: ["color", "spacing", "alignment"],
  },
  {
    id: "color",
    title: "Color systems and contrast",
    family: "Foundations",
    kind: "concept",
    level: "foundational",
    definition:
      "A color system is a small set of named roles, such as page background, body text, and action. Contrast is the difference between the text color and the surface behind it.",
    why: "Named roles keep ivory, charcoal, and copper from being reused at random. Enough contrast makes text readable, including for people who do not see the full range of color.",
    useCases: [
      "Body text on the page background",
      "An action color that is not also used for long paragraphs",
      "A status that is written in words, with color as a supplement",
    ],
    when: "Choosing text, surfaces, and actions from the existing tokens.",
    avoid:
      "Do not invent a new palette for one lesson. Do not use a close pair, such as clay on ivory, for reading text.",
    alternatives: [
      {
        name: "One neutral pair",
        tradeoff:
          "Easiest to read. A second color still helps actions stand out.",
      },
      {
        name: "Color as the only status",
        tradeoff: "Fails when the color cannot be seen or is printed in gray.",
      },
    ],
    variants:
      "The example switches the body pair and a deliberately weak pair. The weak pair is also labeled in words.",
    accessibility:
      "WCAG 2.2 contrast minimum asks for at least 4.5:1 for ordinary text, and at least 3:1 for large text. The ratios in the example were calculated from this site's hex tokens. They are a teaching check, not a conformance audit, and they do not account for thin fonts or anti-aliasing.",
    projects: [
      {
        name: "Portfolio",
        application:
          "Body text stays charcoal on ivory. Copper is for actions and links.",
      },
      {
        name: "Detector Coverage Atlas",
        application: "Coverage status needs a word, not a color alone.",
      },
    ],
    prompt:
      "Can I tell the weak pair from the words, without relying on the color?",
    exercise:
      "Name the text and background of the weak pair, then say what the written label adds.",
    source: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    related: ["typography", "feedback"],
  },
  {
    id: "spacing",
    title: "Spacing and design tokens",
    family: "Foundations",
    kind: "concept",
    level: "foundational",
    definition:
      "Spacing is the gap inside and between elements. Design tokens are the named values a project reuses, so padding and gaps do not get invented on each screen.",
    why: "Related items sit closer together than unrelated sections. Shared values make a button, a card, and a page feel like one product.",
    useCases: [
      "The gap between a label and its control",
      "The rhythm between page sections",
      "A tap target that stays at least 44px tall",
    ],
    when: "Setting the space around text, controls, cards, and sections.",
    avoid:
      "Do not tighten a whole page until labels touch their neighbors. Do not add a new spacing scale for one demo.",
    alternatives: [
      {
        name: "Equal space everywhere",
        tradeoff: "Predictable, but sections and items look equally important.",
      },
      {
        name: "A one-off pixel value",
        tradeoff:
          "Fits a single mock. It drifts the next time someone copies it.",
      },
    ],
    variants:
      "The example switches a compact gap and a wider section gap. The action keeps its minimum height.",
    accessibility:
      "Leave enough space to see groups, and keep tap targets at least 44px. Spacing must not be the only way to know which label belongs to which control.",
    projects: [
      {
        name: "Portfolio",
        application:
          "The page column is max-w-5xl, with px-5 and sm:px-8. Sections use py-12 and sm:py-16.",
      },
      {
        name: "Channel Territory Mapping",
        application:
          "A dense review list can use a tighter gap than a marketing page.",
      },
    ],
    prompt: "Can I see which items belong together before I read them?",
    exercise:
      "Find the action in the example and notice that its height does not shrink when the gap does.",
    source:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction",
    related: ["typography", "alignment", "layout"],
  },
  {
    id: "alignment",
    title: "Alignment and visual hierarchy",
    family: "Foundations",
    kind: "concept",
    level: "foundational",
    definition:
      "Alignment lines elements up on a shared edge or center. Visual hierarchy makes one idea, and usually one next action, more prominent than the rest.",
    why: "A shared left edge is easier to scan. One primary action tells the reader what to do next. Three equal actions make the reader choose without help.",
    useCases: [
      "A summary with one review action and a quieter second action",
      "A form whose labels and fields share a left edge",
      "A page that leads with the task instead of a row of equal buttons",
    ],
    when: "A screen asks the reader to understand one thing and take one next step.",
    avoid:
      "Do not center long paragraphs. Do not make every action the same weight when one task matters more.",
    alternatives: [
      {
        name: "Center everything",
        tradeoff:
          "Can suit a short invitation. It is harder to scan a paragraph.",
      },
      {
        name: "Equal visual weight",
        tradeoff:
          "Fair when the choices are true peers. Confusing when they are not.",
      },
    ],
    variants:
      "The example switches one primary action and a row of three equal actions.",
    accessibility:
      "The primary action needs a specific name. Hierarchy in size or weight should match the heading and button order, so the keyboard sequence agrees with what the eye sees.",
    projects: [
      {
        name: "GTM Revenue OS",
        application:
          "A campaign screen can lead with one save or review action.",
      },
      {
        name: "Security Market Map",
        application: "A comparison can offer one next step after the summary.",
      },
    ],
    prompt: "Can I name the single next action without reading every button?",
    exercise:
      "In the clear example, say the primary action out loud in five words or fewer.",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_alignment",
    related: ["typography", "spacing", "button"],
  },
  {
    id: "responsive",
    title: "Responsive design and breakpoints",
    family: "Foundations",
    kind: "concept",
    level: "foundational",
    definition:
      "Responsive design changes layout when the reading space changes. A breakpoint is a width where those rules change. A media query is how CSS applies them to the viewport.",
    why: "The same lesson has to stay readable on a phone, a tablet, and a desktop. Squeezing a wide layout into a narrow window hides actions and forces sideways scrolling.",
    useCases: [
      "A lesson that stacks on a phone and sits beside its navigation on a wide screen",
      "A table that scrolls inside its own region on a narrow screen",
      "A check at 375px, 768px, and 1280px before calling a layout done",
    ],
    when: "The same content will be read at more than one viewport width.",
    avoid:
      "Do not treat a preview-width cap as a device or a media query. Do not hide the main task at a narrow width.",
    alternatives: [
      {
        name: "A separate mobile site",
        tradeoff: "Two copies of the content drift apart.",
      },
      {
        name: "One fixed desktop width",
        tradeoff:
          "Simple to design. It fails as soon as the window is narrower.",
      },
    ],
    variants:
      "The preview-width control caps this example at the available width, about 360px, or about 680px. The labels name the 375, 768, and 1280 checks.",
    accessibility:
      "Reflow should keep reading order, labels, and focus visible. Zoom to 200% is a separate check from resizing the window. Prefer reduced motion does not change these widths.",
    projects: [
      {
        name: "Account Signal Engine",
        application:
          "Evidence tables need a contained scroll region on a phone.",
      },
      {
        name: "Builder Academy",
        application:
          "A lesson can stack its steps before it uses a side column.",
      },
    ],
    prompt:
      "At the narrow cap, can I still read the task and reach the action?",
    exercise:
      "Set Preview width to 360px, then say which part of the example would be unacceptable if it required sideways scrolling.",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries",
    related: ["layout", "spacing", "table"],
  },
  {
    id: "layout",
    title: "Grid, Flexbox, and containers",
    family: "Foundations",
    kind: "concept",
    level: "foundational",
    definition:
      "Flexbox arranges items in one direction and can wrap them onto the next line. A grid places items in rows and columns together. A container is the parent whose width those items have to live inside.",
    why: "Cards, toolbars, and page columns are layout problems. Flexbox fits a row that may wrap. A grid fits items that should line up in two directions. The page column stops the line length from growing with the monitor.",
    useCases: [
      "A wrapping row of summary cards",
      "A comparison that lines up in columns",
      "A page column such as max-w-5xl",
    ],
    when: "Several related items need to sit together and still fit the available width.",
    avoid:
      "Do not force three columns into a narrow container. Do not use a layout method as a substitute for headings.",
    alternatives: [
      {
        name: "Normal document flow",
        tradeoff: "Best for a single column of headings and paragraphs.",
      },
      {
        name: "A fixed three-column grid",
        tradeoff:
          "Lines the cards up. It squeezes them when the container is narrow.",
      },
    ],
    variants:
      "The example switches a wrapping flex row and three forced columns, using the fictional accounts Northstar, Horizon, and Lumen.",
    accessibility:
      "Reading order should follow the order in the page, not a visual shuffle. A narrow grid still needs readable text. The preview cap does not activate viewport breakpoints.",
    projects: [
      {
        name: "Portfolio",
        application:
          "Project summaries can wrap as cards inside the page column.",
      },
      {
        name: "Security Market Map",
        application:
          "Comparison cards can line up when there is room and stack when there is not.",
      },
    ],
    prompt:
      "Which layout still keeps each account readable at the narrow preview width?",
    exercise:
      "Switch on three columns, set the preview to 360px, and describe what happens to the account names.",
    source:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox",
    related: ["responsive", "spacing", "card"],
  },
];

const components: ComponentLesson[] = [
  {
    id: "button",
    title: "Button",
    family: "Actions",
    kind: "component",
    level: "foundational",
    definition: "A button tells the website to perform an action.",
    why: "An action needs a control that looks operable and has a specific name. A link is for going somewhere else.",
    useCases: [
      "Saving a draft",
      "Submitting a short example",
      "Resetting a local demonstration",
    ],
    when: "Saving, submitting, or opening a panel.",
    avoid: "Do not use a button just to navigate to another page. Use a link.",
    alternatives: [
      { name: "Text link", tradeoff: "Best for navigation, not actions." },
      {
        name: "Icon button",
        tradeoff: "Saves space but needs an accessible name.",
      },
    ],
    variants:
      "The example uses a filled action, an outline action, and a text status.",
    accessibility:
      "Use a real button, a visible focus style, and a name that says what will happen. Do not rely on the fill color alone.",
    projects: [
      {
        name: "GTM Revenue OS",
        application: "Save a seller's campaign draft.",
      },
      {
        name: "Builder Academy",
        application: "Check an exercise answer.",
      },
    ],
    prompt: "Can I identify the action and what happens afterward?",
    exercise:
      "Press Save example, read the status, then press Reset and say what changed.",
    source: "https://ui.shadcn.com/docs/components/button",
    related: ["feedback", "alignment"],
  },
  {
    id: "card",
    title: "Card",
    family: "Content",
    kind: "component",
    level: "foundational",
    definition: "A card groups related information into one scannable unit.",
    why: "A reader can decide whether to open a summary before reading the whole record.",
    useCases: [
      "A project summary",
      "An account snapshot",
      "A learning module with one next step",
    ],
    when: "Showing a project summary, account, or learning module.",
    avoid:
      "Do not make every piece of content a card. Too many borders hurt hierarchy.",
    alternatives: [
      {
        name: "Simple list",
        tradeoff: "More efficient for dense, similar records.",
      },
      {
        name: "Data table",
        tradeoff: "Better for comparing many structured fields.",
      },
    ],
    variants: "The example switches the summary and a short detail sentence.",
    accessibility:
      "The card should have a heading or other name. The detail action needs a specific label. A border is not the name.",
    projects: [
      { name: "Portfolio", application: "Project overview and outcome." },
      {
        name: "Account Signal Engine",
        application: "Account snapshot with dated evidence.",
      },
    ],
    prompt: "Does the grouping help someone decide what to inspect next?",
    exercise:
      "Hide the detail and say whether the summary alone is enough to choose a next step.",
    source: "https://ui.shadcn.com/docs/components/card",
    related: ["table", "layout"],
    catalogId: "summaries",
  },
  {
    id: "tabs",
    title: "Tabs",
    family: "Navigation",
    kind: "component",
    level: "foundational",
    definition:
      "Tabs switch between peer views without leaving the current context.",
    why: "Peer views of one subject can stay on the same page. Steps in a process should not be disguised as peers.",
    useCases: [
      "Overview and evidence for one account",
      "Two equivalent reports of one campaign",
      "Buyer and vendor views of one market",
    ],
    when: "Switching between equivalent views of one subject.",
    avoid:
      "Do not hide critical content in unexplained tabs or use tabs for sequential steps.",
    alternatives: [
      {
        name: "Accordion",
        tradeoff: "Allows more than one section to stay open.",
      },
      {
        name: "Separate pages",
        tradeoff: "Better for large, shareable sections.",
      },
    ],
    variants:
      "The example switches Overview and Evidence. One view is pressed at a time.",
    accessibility:
      "Each control needs a name and a pressed or selected state. The shown panel should follow the control in reading order.",
    projects: [
      {
        name: "Security Market Map",
        application: "Switch buyer, vendor, and evidence views.",
      },
      {
        name: "GTM Revenue OS",
        application: "Review campaign overview, tasks, and outcomes.",
      },
    ],
    prompt: "Are the views peers rather than steps in a process?",
    exercise:
      "Switch views with the keyboard and say whether Evidence is a peer of Overview or a later step.",
    source: "https://ui.shadcn.com/docs/components/tabs",
    related: ["accordion", "search"],
    catalogId: "disclosure",
  },
  {
    id: "accordion",
    title: "Accordion",
    family: "Disclosure",
    kind: "component",
    level: "foundational",
    definition:
      "An accordion expands optional detail without leaving the page.",
    why: "Supporting reasoning can stay nearby without pushing the main answer down the page.",
    useCases: [
      "A short FAQ",
      "The rationale behind a recommendation",
      "Advanced settings that most people can skip",
    ],
    when: "FAQs, supporting rationale, and advanced settings.",
    avoid: "Do not conceal the main takeaway or required instructions.",
    alternatives: [
      { name: "Tabs", tradeoff: "Switches one peer view at a time." },
      {
        name: "Always-visible content",
        tradeoff: "Better for short or essential information.",
      },
    ],
    variants:
      "The example switches collapsed and expanded. The summary stays visible either way.",
    accessibility:
      "The control is a button with an expanded state. The extra text appears after it. Do not put required instructions only in the collapsed panel.",
    projects: [
      {
        name: "Builder Academy",
        application: "Reveal an explanation after a knowledge check.",
      },
      {
        name: "Technical Docs Platform",
        application: "Show implementation details on demand.",
      },
    ],
    prompt: "Can the reader complete the primary task while this is collapsed?",
    exercise:
      "Collapse the panel and decide whether the visible summary is still enough.",
    source: "https://ui.shadcn.com/docs/components/accordion",
    related: ["tabs", "card"],
    catalogId: "disclosure",
  },
  {
    id: "search",
    title: "Search input",
    family: "Discovery",
    kind: "component",
    level: "foundational",
    definition:
      "A search field lets someone find matching entries using words.",
    why: "A growing list is faster to filter by words than to scan from the top. A short list often does not need it.",
    useCases: [
      "Finding a lesson by its task",
      "Finding an account by name",
      "Recovering from a search that matches nothing",
    ],
    when: "Finding an account, design pattern, or lesson in a growing collection.",
    avoid:
      "Do not require search when a short, organized list would be easier.",
    alternatives: [
      { name: "Filter chips", tradeoff: "Good for a few known categories." },
      { name: "Combobox", tradeoff: "Better for selecting one known value." },
    ],
    variants:
      "The example shows matching rows and, when nothing matches, a count of zero plus a way to clear.",
    accessibility:
      "The field has a visible label. The count uses a status so a result change can be announced. Empty results need a recovery action.",
    projects: [
      {
        name: "Design Lab",
        application: "Find component families by name and task.",
      },
      {
        name: "Account Signal Engine",
        application: "Find accounts and evidence.",
      },
    ],
    prompt: "Are empty results clear, and is there a way to recover?",
    exercise: "Search for a word that matches nothing, then clear it.",
    source: "https://ui.shadcn.com/docs/components/input",
    related: ["select", "table"],
    catalogId: "search",
  },
  {
    id: "feedback",
    title: "Status feedback",
    family: "Feedback",
    kind: "component",
    level: "foundational",
    definition:
      "Feedback explains whether an action is waiting, succeeded, or failed.",
    why: "After someone acts, the page has to say what happened. Silence, or a message that disappears, leaves the outcome ambiguous.",
    useCases: [
      "A save that has not started",
      "A save that is in progress",
      "A save that succeeded or failed",
    ],
    when: "A form saves, a job runs, or no results match.",
    avoid: "Do not rely only on a disappearing toast for important errors.",
    alternatives: [
      {
        name: "Inline message",
        tradeoff: "Persists near the affected field.",
      },
      {
        name: "Toast",
        tradeoff: "Useful for a short, noncritical confirmation.",
      },
    ],
    variants:
      "The example switches idle, pending, saved, and failed. Each state is a sentence.",
    accessibility:
      "Put the outcome in text and expose it as a status. Color may reinforce the sentence. It must not be the only signal. This demo does not save anything.",
    projects: [
      {
        name: "GTM Revenue OS",
        application: "Show whether campaign edits are saved.",
      },
      {
        name: "Builder Academy",
        application: "Explain a correct or incorrect answer.",
      },
    ],
    prompt: "Can someone tell what happened without relying on color alone?",
    exercise:
      "Show the failure state and say where the reader would look to try again.",
    source: "https://ui.shadcn.com/docs/components/alert",
    related: ["button", "color"],
    catalogId: "feedback",
  },
  {
    id: "checkbox",
    title: "Checkbox",
    family: "Inputs",
    kind: "component",
    level: "foundational",
    definition:
      "A checkbox lets someone independently turn an option on or off.",
    why: "Some choices are independent. Selecting one must not clear the others.",
    useCases: [
      "Choosing several follow-up tasks",
      "Marking records to review",
      "Optional preferences that can all be off",
    ],
    when: "Selecting multiple independent preferences or records.",
    avoid: "Do not use it for choosing exactly one option. Use radio buttons.",
    alternatives: [
      {
        name: "Radio buttons",
        tradeoff: "Choose exactly one item from a set.",
      },
      {
        name: "Switch",
        tradeoff:
          "Better for an immediate setting that takes effect right away.",
      },
    ],
    variants:
      "The example lets each task be on or off and reports how many are selected.",
    accessibility:
      "Group the options with a fieldset and legend. Each box has a label. The count is a status, so the total is not only visible by looking at the checks.",
    projects: [
      {
        name: "Channel Territory Mapping",
        application: "Select accounts for review.",
      },
      {
        name: "GTM Revenue OS",
        application: "Choose outreach tasks in a campaign.",
      },
    ],
    prompt: "Can someone select more than one option independently?",
    exercise: "Select two tasks and confirm the count says 2 of 3.",
    source: "https://ui.shadcn.com/docs/components/checkbox",
    related: ["select", "feedback"],
  },
  {
    id: "select",
    title: "Select menu",
    family: "Inputs",
    kind: "component",
    level: "foundational",
    definition:
      "A select menu lets someone choose one option from a known list.",
    why: "A short, predictable list can stay in one control. A very long list is faster to search.",
    useCases: [
      "Choosing a campaign stage",
      "Choosing a vendor category",
      "Choosing one status from a handful of values",
    ],
    when: "Picking a short, predictable choice such as account status.",
    avoid: "Do not use an enormous menu when searching is necessary.",
    alternatives: [
      {
        name: "Radio buttons",
        tradeoff: "More discoverable for a very short choice list.",
      },
      { name: "Combobox", tradeoff: "Adds searching to a longer list." },
    ],
    variants:
      "The example offers Research, Outreach, and Evaluation, and repeats the choice in text.",
    accessibility:
      "The menu has a visible label. The selected value is also written beside it, so the choice is not only inside the closed control.",
    projects: [
      {
        name: "Security Market Map",
        application: "Select the vendor category.",
      },
      { name: "GTM Revenue OS", application: "Choose a campaign stage." },
    ],
    prompt: "Would someone benefit from seeing every option before deciding?",
    exercise:
      "Choose a stage with the keyboard and read the status underneath.",
    source: "https://ui.shadcn.com/docs/components/select",
    related: ["checkbox", "search"],
  },
  {
    id: "table",
    title: "Data table",
    family: "Data",
    kind: "component",
    level: "foundational",
    definition:
      "A data table organizes many similar records into columns so people can compare values.",
    why: "Rows that share the same facts are easier to compare in columns than in a stack of paragraphs.",
    useCases: [
      "Comparing fictional accounts",
      "Reviewing tasks with the same fields",
      "Showing a chart's exact values in text",
    ],
    when: "Reviewing accounts, tasks, evidence, or pipeline records side by side.",
    avoid:
      "Do not use a dense table for a single story, or without a way to scroll it on a narrow screen and headers that stay associated with the cells.",
    alternatives: [
      {
        name: "Cards",
        tradeoff: "Better for reading one summary at a time on a phone.",
      },
      {
        name: "Chart",
        tradeoff: "Better for seeing a trend, not exact row-level values.",
      },
    ],
    variants:
      "The example is one static table of two fictional accounts. On a narrow preview it scrolls inside a named region.",
    accessibility:
      "Use a caption, column headers, and row headers. Name the scroll region. Do not make the reader drag to reach a cell.",
    projects: [
      {
        name: "GTM Revenue OS",
        application: "Compare pipeline opportunities.",
      },
      {
        name: "Account Signal Engine",
        application: "Inspect account signals with source dates.",
      },
    ],
    prompt: "Do the columns contain comparable facts with clear units?",
    exercise:
      "Cap the preview at 360px and move through the table with the keyboard without losing the column names.",
    source: "https://ui.shadcn.com/docs/components/data-table",
    related: ["card", "responsive"],
    catalogId: "data",
  },
];

export const componentLessons: readonly ComponentLesson[] = [
  ...foundations,
  ...components,
];

export function lessonTrack(
  lesson: ComponentLesson,
): Exclude<LessonTrack, "All"> {
  return lesson.kind === "concept" ? "Foundations" : "Components";
}

export function lessonsForExplorer(track: LessonTrack, query = "") {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return componentLessons.filter((lesson) => {
    if (track !== "All" && lessonTrack(lesson) !== track) return false;
    if (terms.length === 0) return true;
    const haystack = [
      lesson.title,
      lesson.definition,
      lesson.when,
      lesson.why,
      ...lesson.useCases,
      ...lesson.projects.flatMap((project) => [
        project.name,
        project.application,
      ]),
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
