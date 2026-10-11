export type Track = "Foundations" | "Prompting" | "Responsible AI" | "GTM" | "Builder";
export type Lesson = {
  slug: string; title: string; track: Track; minutes: number; level: "Beginner" | "Intermediate";
  summary: string; analogy: string; takeaways: string[]; exercise: string; check: { question: string; choices: string[]; answer: number; explanation: string };
  sources: { label: string; url: string }[];
};
export const lessons: Lesson[] = [
  {
    slug: "idea-to-verified-release",
    title: "From idea to verified release",
    track: "Builder",
    minutes: 15,
    level: "Beginner",
    summary: "See how priorities, requirements, Linear issues, Cursor, GitHub PRs and CI form one accountable delivery workflow without duplicating project tracking.",
    analogy: "A restaurant order has one ticket, a recipe, a kitchen station and a quality check. You do not need five copies of the same order to know whether dinner is ready.",
    takeaways: [
      "A project groups an outcome; milestones divide it; issues specify testable slices. Priority is importance, while status is where the work stands.",
      "Backlog means not yet committed; Todo means selected; In Progress means implementing; In Review means verifying; Done requires acceptance evidence.",
      "Keep the PRD and source code in the owning repository, tasks in Linear, implementation and CI evidence in GitHub, and reusable standards in Technical Docs.",
      "Link a Linear issue ID in branches and PRs. PR linking does not require GitHub Issues synchronization or duplicate tickets.",
      "Use test results, code review and explicit acceptance criteria before declaring delivery complete. Do not equate a passing build with product correctness.",
      "Adopt the workflow gradually for active initiatives; no separate Linear team or duplicated status page is required for every repository."
    ],
    exercise: "Using a fictional revenue simulator: create one project, then three connected milestones—correct the calculation, compare hiring choices, and verify the release. Write one acceptance criterion for each. Move only the current issue to Todo, sketch the branch/PR link, and explain what evidence would justify Done. Read the companion lesson at docs/builder-academy/idea-to-verified-release.md. When you choose a Cursor mode for that branch, continue with docs/builder-academy/cursor-agent-workflows.md.",
    check: {
      question: "Your implementation PR passes CI but the expected calculation has not been checked. What should happen?",
      choices: ["Mark Done because all green checks prove the feature works", "Keep the issue In Review until its acceptance criteria and user journey are verified", "Copy the issue into GitHub Issues and Notion to increase visibility"],
      answer: 1,
      explanation: "CI proves the checks it actually ran passed; it does not replace review of the expected business behavior."
    },
    sources: [
      { label: "GitHub Docs: About pull requests", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests" },
      { label: "GitHub Docs: About status checks", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks" },
      { label: "Linear Docs: GitHub integration", url: "https://linear.app/docs/github" }
    ]
  },
  {
    slug: "cursor-workflows",
    title: "Cursor modes, rules, and safe handoffs",
    track: "Builder",
    minutes: 30,
    level: "Beginner",
    summary: "Choose Ask, Plan, or Agent for a small software task, write a bounded prompt, and tell a standing rule from a one-time request.",
    analogy: "Ask is a question at the counter. Plan is the written order you approve. Agent is the cook who changes the dish only after that order is clear.",
    takeaways: [
      "Ask reads and explains. Plan proposes a reviewable approach. Agent edits only after the outcome and the checks are stated.",
      "A prompt is one assignment. A project rule is a standing invariant. A skill is a repeated procedure with checks.",
      "Open the one repository you intend to change. Treat other folders as references, and keep private notes out of public lessons and rules.",
      "Finishing a chat is not a merged pull request, a passing check, or a deployment.",
    ],
    exercise: "Finish From idea to verified release first. Then write one prompt for a fictional classroom fix: the goal, the files in scope, the checks to run, and an instruction to stop before merge. Say whether the next step is Ask, Plan, or Agent. Read the longer companion at docs/builder-academy/cursor-agent-workflows.md.",
    check: {
      question: "You have an approved, scoped fix and you want Cursor to change the files and add tests. Which mode fits?",
      choices: [
        "Ask — read the code and leave the files unchanged",
        "Plan — investigate and propose a reviewable implementation plan before building",
        "Agent — edit the approved slice on a feature branch and run the checks",
      ],
      answer: 2,
      explanation: "Ask explains without editing. Plan is for reviewing an approach before implementation. Agent applies a scoped change. A local finish still needs the diff, tests, review, and CI.",
    },
    sources: [
      { label: "Cursor docs: Rules", url: "https://cursor.com/docs/rules" },
      { label: "Cursor docs: Plan Mode", url: "https://prod.cursor.com/docs/agent/plan-mode" },
      { label: "Cursor docs: Agent read access", url: "https://cursor.com/docs/agent/security/run-modes" },
      { label: "Cursor: Agent best practices", url: "https://cursor.com/blog/agent-best-practices" },
    ],
  },
  {slug:"what-is-ai",title:"AI, models and assistants",track:"Foundations",minutes:8,level:"Beginner",summary:"Learn the difference between AI, machine learning, LLMs, and products such as ChatGPT and Claude.",analogy:"The model is an engine; the app is the vehicle with controls, navigation and optional tools.",takeaways:["AI is a broad field, not just chatbots.","Apps may offer different models and tools.","Fluent output is not proof of accuracy."],exercise:"Ask an assistant to explain a topic for a novice, then identify two claims to independently check.",check:{question:"Which describes ChatGPT or Claude as an app?",choices:["The same thing as the underlying model weights","An interface that can combine models, context and tools","A vector database"],answer:1,explanation:"An assistant app may combine a model with files, tools, workflows and UI."},sources:[{label:"Google ML Crash Course",url:"https://developers.google.com/machine-learning/crash-course"}]},
  {slug:"evolution",title:"From rules to AI agents",track:"Foundations",minutes:10,level:"Beginner",summary:"Trace rule-based systems, machine learning, deep learning, transformers and tool-using agents.",analogy:"From following a fixed recipe to recognizing patterns, then assisting with tools and feedback.",takeaways:["These approaches overlap rather than replace one another.","Transformers enabled major language-model advances.","Agents need permission boundaries."],exercise:"Choose a business task and decide whether a rule, model or agent is actually necessary.",check:{question:"Does every useful automation require an AI agent?",choices:["Yes","No, deterministic rules may be simpler and safer","Only if it has a database"],answer:1,explanation:"Prefer the simplest reliable approach."},sources:[{label:"Attention Is All You Need",url:"https://arxiv.org/abs/1706.03762"}]},
  {slug:"prompting",title:"Write prompts that work",track:"Prompting",minutes:12,level:"Beginner",summary:"Practice specifying objective, context, inputs, constraints, output and validation.",analogy:"A good prompt is a good assignment brief—not a magic incantation.",takeaways:["Define a measurable outcome.","Keep source material separate from instructions.","Require uncertainties to be labeled."],exercise:"Rewrite 'Research this account' as a sourced account brief with audience, required fields and checks.",check:{question:"What most improves a vague request?",choices:["Adding lots of role adjectives","Clear task, context, constraints and a verifiable output","Always asking for a longer answer"],answer:1,explanation:"Specific expectations and inputs make results easier to assess."},sources:[{label:"OpenAI prompting guide",url:"https://platform.openai.com/docs/guides/prompt-engineering"}]},
  {slug:"verification",title:"Grounding and source quality",track:"Responsible AI",minutes:10,level:"Beginner",summary:"Learn to distinguish sourced facts, hypotheses, stale claims and hallucinations.",analogy:"Treat AI like a bright research assistant whose footnotes still need checking.",takeaways:["Verify links and dates.","Separate facts from interpretation.","Never invent evidence for missing information."],exercise:"Review a generated vendor comparison, mark each statement Verified, Hypothesis or Unknown.",check:{question:"A generated citation proves a claim is true.",choices:["True","False"],answer:1,explanation:"Citations can be irrelevant, stale or invented; inspect the actual source."},sources:[{label:"NIST AI RMF",url:"https://www.nist.gov/itl/ai-risk-management-framework"}]},
  {slug:"privacy",title:"Privacy, security and human oversight",track:"Responsible AI",minutes:10,level:"Beginner",summary:"Classify data, minimize access, use approved workspaces and retain human review for meaningful actions.",analogy:"Give an AI agent a visitor badge, not the master key.",takeaways:["Do not paste credentials or unapproved confidential data.","Views are not permission systems.","Require authorization for consequential tool actions."],exercise:"Classify sample data as public/internal/restricted and choose a safe AI workflow.",check:{question:"What is the safest default for sensitive company data?",choices:["Paste it into any personal AI account","Verify approved tools, access and data controls first","Remove the file extension"],answer:1,explanation:"Workspace policies and actual data terms determine what is allowed."},sources:[{label:"OWASP LLM risks",url:"https://genai.owasp.org/llm-top-10/"}]},
  {slug:"gtm-research",title:"GTM: account intelligence workflow",track:"GTM",minutes:15,level:"Intermediate",summary:"Convert public company signals into a sourced, human-reviewed account brief.",analogy:"A research pipeline is a newsroom: gather, verify, edit, publish.",takeaways:["Resolve company identity before attaching a signal.","Record date and source for each claim.","Do not confuse a signal with buying intent."],exercise:"Research one public company announcement and draft a 3-part account hypothesis with citations.",check:{question:"A funding announcement necessarily proves intent to purchase your product.",choices:["Yes","No, it is a signal requiring relevance assessment"],answer:1,explanation:"Signals require ICP and product relevance validation."},sources:[{label:"Notion source-backed research hub",url:"https://app.notion.com/p/3f3cdefaec758139a149ef6b77d14f03"}]},
  {slug:"skills",title:"From prompts to reusable skills",track:"Builder",minutes:15,level:"Intermediate",summary:"Turn repeated prompts into testable procedures with inputs, outputs, safeguards and Git versioning.",analogy:"A prompt is one assignment; a skill is a reusable operating procedure.",takeaways:["Make skill triggers precise.","Keep one canonical SKILL.md in Git.","Test normal and edge cases."],exercise:"Outline a source-verification skill with steps and a pass/fail checklist.",check:{question:"Where should canonical version-controlled skill instructions live?",choices:["Duplicated in every Notion page","In GitHub, linked from Notion","Only in an untracked chat"],answer:1,explanation:"Git history makes skill changes auditable, while Notion aids discovery."},sources:[{label:"Skills handbook",url:"https://app.notion.com/p/3f3cdefaec758176be84e740fac358f7"}]},
  {
    slug: "package-registries",
    title: "Package registries, npm and lockfiles",
    track: "Builder",
    minutes: 15,
    level: "Beginner",
    summary: "Learn where reusable code comes from, why a package registry differs from a package manager, and how dependencies and lockfiles support reproducible, safer builds.",
    analogy: "A registry is a parts catalog and warehouse; npm is the purchasing and installation tool; package.json is the shopping list; package-lock.json is the exact itemized receipt.",
    takeaways: [
      "A package registry (such as npmjs.com) hosts versions of libraries; npm, pnpm and Yarn are tools that resolve and install them.",
      "Direct dependencies are chosen by your app; transitive dependencies are pulled in by other packages. npm ci installs from the lockfile in CI.",
      "Version ranges and lockfiles are different: package.json states acceptable versions, while package-lock.json captures the resolved dependency tree and integrity metadata.",
      "A registry is a supply-chain trust boundary. Audit advisories, check package ownership and provenance, review install scripts, and never publish secrets.",
      "Security scans are complementary: npm audit checks known dependency advisories; TruffleHog checks for secrets; Trivy can check vulnerabilities and configuration. Review whether each tool blocks a merge.",
    ],
    exercise: "Open your portfolio's package.json and package-lock.json. Find Next.js, sharp and source-map-js; classify each as direct or transitive, inspect pinned versions, then read the results of npm audit --omit=dev --audit-level=high. Explain why updating package.json alone does not update the locked dependency tree. Do not run npm audit fix --force without reviewing the changes.",
    check: {
      question: "Which statement correctly describes npm registry, npm and package-lock.json?",
      choices: [
        "The registry installs dependencies locally, npm stores exact versions, and the lockfile publishes packages.",
        "The registry hosts packages; npm installs them; the lockfile records resolved versions and integrity data.",
        "GitHub Actions is the package registry and TruffleHog is the package manager.",
      ],
      answer: 1,
      explanation: "Registry = package source, manager = install/resolve tool, lockfile = reproducible resolved dependency graph. Security requires checks beyond a successful install.",
    },
    sources: [
      { label: "npm docs: About the public npm registry", url: "https://docs.npmjs.com/about-the-public-npm-registry/" },
      { label: "npm docs: package-lock.json", url: "https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/" },
      { label: "npm docs: npm ci", url: "https://docs.npmjs.com/cli/v11/commands/npm-ci/" },
      { label: "npm docs: npm audit", url: "https://docs.npmjs.com/cli/v11/commands/npm-audit/" },
    ],
  },
];
export type Workflow = {title:string;category:"GTM"|"Research"|"Coding"|"Productivity";difficulty:"Beginner"|"Intermediate";tool:string;asset:string;summary:string;why:string;prompt:string;next:string};
export const workflows: Workflow[]=[
{title:"Account research",category:"GTM",difficulty:"Beginner",tool:"ChatGPT + Notion",asset:"Account research prompt",summary:"Public signals → sourced account brief → human review.",why:"Start with evidence and relevance before adding automation.",prompt:"Create a public-source account brief for [company]. Include verified signals with dated citations, ICP fit, potential pain hypotheses clearly labeled, and three discovery questions. Do not invent spending plans.",next:"Promote to a skill after repeated successful evaluations."},
{title:"Competitive research",category:"GTM",difficulty:"Intermediate",tool:"ChatGPT or Claude + source retrieval",asset:"Competitive research playbook",summary:"Collect claims, verify distinctions, log changes.",why:"Cross-check provider marketing and traceable evidence.",prompt:"Compare [vendor A] and [vendor B] for [use case]. Cite primary evidence by URL and date; distinguish capabilities, limitations, and hypotheses. Include open questions.",next:"Track changed pages and review cadence."},
{title:"Meeting notes to Notion",category:"Productivity",difficulty:"Beginner",tool:"Claude or ChatGPT + Notion",asset:"Meeting recap prompt",summary:"Notes → decisions, owners, unknowns and next steps.",why:"A low-risk practice workflow with fictional notes.",prompt:"Using the fictional notes below, create a Notion-ready recap: summary, explicit decisions, actions (owner/due only if specified), unknowns and follow-ups. Never invent commitments. NOTES: [notes]",next:"Add a standardized template and source link."},
{title:"Repository review",category:"Coding",difficulty:"Intermediate",tool:"Cursor + GitHub",asset:"Code review skill",summary:"Inspect architecture → propose changes → tests and review.",why:"Repo-aware changes need version control and regression checks.",prompt:"Inspect this repository before editing. Summarize architecture and constraints, propose the smallest safe change, work on a feature branch, add tests, run checks and provide an evidence-based changelog.",next:"Extract stable review procedures into a SKILL.md."},
{title:"Source-backed explainer",category:"Research",difficulty:"Beginner",tool:"ChatGPT or Claude",asset:"Grounded explanation prompt",summary:"Explain jargon with simple analogies and credible sources.",why:"Build comprehension without losing factual traceability.",prompt:"Explain [concept] to a beginner using a practical analogy and two examples. Identify misconceptions and link authoritative sources for material claims.",next:"Compare results on a short evaluation set."}
];
