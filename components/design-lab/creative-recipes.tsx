const registry = "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/docs/ai-creative-model-registry-20261106/docs/design/ai-creative-model-registry.md";
const recipes = [
  ["Product demo or tutorial", "Capture a real workflow using fictional data, then edit the explanation.", "OBS or Screen Studio → Clueso/Descript → FFmpeg exports", "DEM-001, DEM-003, EDT-001, DEV-002, DEV-005", "A short demo, captions, transcript and editable source. Check that every UI step matches the product."],
  ["Campaign stills and social visuals", "Compare a designed baseline with generated imagery using the same brief.", "Penpot/Figma storyboard → GPT Image, Recraft or Ideogram → human layout review", "IMG-001, IMG-003, IMG-004, DSG-002, DSG-004", "One campaign still and a channel variant, alt text and source files. Check message clarity and brand consistency."],
  ["Short concept video", "Test an abstract visual metaphor for a security problem; keep product proof in real captures.", "Script and storyboard → Runway or Veo → editor and captions", "VID-001, VID-002, EDT-001", "A short concept clip plus a still fallback. Compare clarity, visual consistency and effort across attempts."],
  ["Animated technical explainer", "Explain a sequence or relationship with editable, repeatable graphics.", "Motion Canvas or Remotion → reviewed narration → export", "DEV-001, DEV-004, AUD-001", "A narrated explainer, transcript and static equivalent. Check the diagram’s technical accuracy and license conditions."],
  ["Interactive campaign or learning asset", "Let a viewer explore the question most relevant to them.", "Existing branching conversation, cards or lesson checks → destination workflow", "Existing component IDs: game-inkjs, summaries, game-react-quiz", "A small interactive walkthrough and equivalent text path. Check whether someone can find the next useful action."],
  ["Diagrams and visual frameworks", "Clarify a workflow or relationship before choosing visual effects.", "Excalidraw or existing Mermaid \u2192 reviewed SVG and text explanation", "DSG-005", "An editable diagram, SVG export and text equivalent. Use for Academy explanations, architecture and buyer journeys."],
  ["Presentation templates", "Turn a verified message into a repeatable slide sequence.", "Marp Markdown \u2192 reviewed slides and PDF", "DOC-001", "Editable slides with source notes, accessible reading order and a clear next action. Use for enablement and executive updates."],
  ["Illustrations and vector graphics", "Create precise editable artwork and reuse it across channels.", "Inkscape \u2192 SVG master \u2192 channel exports", "DSG-006", "A vector master, image exports and alt text. Preserve approved brand context and source rights."],
  ["Reports and print collateral", "Lay out a longer brief or event handout.", "Scribus \u2192 reviewed print PDF and readable digital alternative", "DOC-002", "A source layout, PDF and text version. Use for research briefs, conference materials and one-pagers."],
  ["Data stories and charts", "Explain a supported finding with a chart and its underlying values.", "Existing chart components first; evaluate Vega-Lite for exportable specifications", "DAT-001", "A sourced chart, data table, limitations and editable specification. No invented market share or benchmark claims."],
  ["Interactive learning packages", "Evaluate portable interactive content only when current Academy exercises do not fit.", "Existing Academy controls first; compare H5P for a specific delivery requirement", "LRN-001", "A bounded learning exercise and equivalent text path. Review hosting, accessibility and learner-state boundaries before adoption."],
  ["Audio and narration", "Make a clear voiceover or repurpose an approved recording.", "Audacity \u2192 reviewed audio edit \u2192 transcript and export", "AUD-002", "An editable audio project, clean export and transcript. Confirm recording and music rights."],
] as const;

export function CreativeRecipes() {
  return <section aria-labelledby="creative-recipes-title" className="space-y-4">
    <p className="editorial-eyebrow text-accent">Visual content · evaluation recipes</p>
    <h2 id="creative-recipes-title" className="font-display text-2xl">Make a marketing asset, then test whether it helps</h2>
    <p className="max-w-2xl text-sm leading-6 text-muted">Start with the audience, message, brand context and intended next action. These recipes connect reusable components, creative software and generation models. They are proposed experiments; no generation service is connected here.</p>
    <p className="max-w-2xl text-sm leading-6">An LLM can help write a script. A video model generates scenes. Capture and editing tools produce an accurate product demonstration. Choose the combination for the asset you need.</p>
    <a href={registry} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm underline">Open the creative model and tool registry (draft PR #259, new tab)</a>
    <div className="grid gap-3 md:grid-cols-2">
      {recipes.map(([title, task, workflow, ids, output]) => <details key={title} className="min-w-0 rounded-xl border border-border bg-card p-4">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold">{title}</summary>
        <div className="space-y-3 pb-3 text-sm leading-6">
          <p>{task}</p><p><strong>Try:</strong> {workflow}.</p><p><strong>Leave with:</strong> {output}</p>
          <p className="text-muted"><strong>Reference IDs:</strong> {ids}. Check current versions, terms and costs in the registry before a pilot.</p>
        </div>
      </details>)}
    </div>
    <aside className="rounded-xl border border-border bg-card p-4 text-sm leading-6">
      <h3 className="font-semibold">Use a starter in a real piece</h3>
      <p className="mt-2">The editable security-workflow SVG is a fictional example you can adapt for a document, slide or lesson. Review its labels and supply a text explanation before publication.</p>
      <a className="inline-flex min-h-11 items-center underline" href="https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/feat/kru-150-gameful-workbench/docs/design/templates/README.md" target="_blank" rel="noopener noreferrer">Open the starter and adoption map (new tab)</a>
    </aside>
    <details className="rounded-xl border border-border bg-card p-4">
      <summary className="min-h-11 cursor-pointer py-2 font-semibold">First experiment: fictional security workflow explainer</summary>
      <p className="mt-3 text-sm leading-6">Use a fictional company with a repeated customer-setup problem. Compare a three-panel still with a 30-second animated explanation using the same script. Ask a reviewer to name the problem, intended audience and next action. Record their answer, production time, revision effort and cost per approved asset. No customer proof or product capability is implied.</p>
      <p className="mt-3 text-sm leading-6">Hand off the selected recipe, candidate IDs, editable source, approved claims, captions/alt text and review evidence to a GTM OS content brief. GTM OS owns scheduling, distribution and performance measurement.</p>
    </details>
  </section>;
}
