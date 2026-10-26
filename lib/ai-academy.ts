import {
  mcpRestEditorial,
  readingCodeEditorial,
} from "./academy/lesson-editorial.ts";
import { verificationEditorial } from "./academy/verification-editorial.ts";
import { enterpriseEvaluationLessons } from "./academy/enterprise-evaluation.ts";

export type Track = "Foundations" | "Prompting" | "Responsible AI" | "GTM" | "Builder";
export type Lesson = {
  slug: string; title: string; track: Track; minutes: number; level: "Beginner" | "Intermediate";
  summary: string; analogy: string; takeaways: string[]; exercise: string; check: { question: string; choices: string[]; answer: number; explanation: string };
  sources: { label: string; url: string }[];
  companion?: { label: string; url: string };
};
export const lessons: Lesson[] = [
{
  "slug": "database-branching-recovery",
  "title": "Databases: branching, backups, and platform decisions",
  "track": "Builder",
  "minutes": 35,
  "level": "Beginner",
  "summary": "Understand relational data, RSS ingestion, safe recovery, and when to choose Neon, Supabase, Railway, Turso, or Cloudflare D1.",
  "analogy": "A database is a filing system with constraints. A database branch is a test copy, while a verified backup is an escape route if a change goes wrong.",
  "takeaways": [
    "Schemas define tables; foreign keys and uniqueness prevent missing references and duplicate records.",
    "A scheduled RSS worker fetches and normalizes content, but source articles are not automatically verified market claims.",
    "Git branches, database branches, snapshots, backups, and point-in-time restore solve different problems.",
    "A restore can change primary identity or compute routing; compare IDs, endpoints, and data before and after.",
    "Neon and Supabase support PostgreSQL; SQLite-oriented Turso and Cloudflare D1 require SQL and application portability review.",
    "Choose by workload, access control, recovery requirements, operations, exit costs, and measured usage, not free-tier price alone."
  ],
  "exercise": "Read the companion database guide, then complete its synthetic branch-recovery and cost labs. No live credentials, database mutations, or provider calls are needed.",
  "check": {
    "question": "A snapshot restore creates a new branch with the same 16 tables. Is it safe to assume your application still connects to the original primary?",
    "choices": ["Yes: identical table counts prove connectivity is unchanged.", "No: verify default/primary flags, stable branch IDs, and compute endpoint routing independently.", "Yes: branch names always determine connection routing."],
    "answer": 1,
    "explanation": "Equivalent table counts establish only a narrow schema fact. Restore finalization can change branch identity and endpoints; explicitly verify both."
  },
  "companion": {"label":"Read the database decision and recovery guide","url":"https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/databases-branching-recovery-and-selection.md"},
  "sources": [
    {"label":"Neon API: restore snapshot","url":"https://api-docs.neon.tech/reference/restoresnapshot"},
    {"label":"Neon API: finalize branch restore","url":"https://api-docs.neon.tech/reference/finalizerestorebranch"},
    {"label":"Supabase plans and backups","url":"https://supabase.com/pricing"},
    {"label":"Cloudflare D1 overview","url":"https://developers.cloudflare.com/d1/"}
  ]
},

  ...enterpriseEvaluationLessons,
{
  slug: "fde-ai-agent-engineering",
  title: "How AI agents become engineers",
  track: "Builder",
  minutes: 20,
  level: "Intermediate",
  summary: "Distinguish human forward-deployed engineers, AI SOC investigators, and AI systems that build and supervise security agents.",
  analogy: "A human field engineer builds with a customer; an AI investigator works a case; an AI engineering supervisor configures workers and checks their output.",
  takeaways: [
    "Human FDEs are customer-embedded technical implementers, not a particular AI model.",
    "An AI investigator performs a scoped task, while an AI FDE may plan, build and supervise multiple agents and workflows.",
    "An agent system combines a model, tools, runtime, state, evaluation and independently enforced authorization.",
    "BYOK means supported customer credentials, not universal compatibility with every foundation model.",
    "Human review and scoped permissions matter before any disruptive security action."
  ],
  exercise: "Use only the fictional three-customer MSSP scenario in the companion. Draw the human operator, AI FDE, investigator worker, security tools and human approval gate. Mark tenant boundaries and separate model costs from platform costs.",
  check: {
    question: "An AI investigator's prompt says it may disable accounts. What is still needed before a disruptive action?",
    choices: ["Nothing; its prompt is enough", "Independent permission enforcement and any required human approval", "A larger LLM"],
    answer: 1,
    explanation: "Prompts do not independently grant authority. Scoped credentials and approval policies must govern actions."
  },
  companion: {
    label: "Read the AI agent engineering companion",
    url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/fde-ai-agent-engineering.md"
  },
  sources: [
    {label: "LimaCharlie Grid documentation (vendor-described example)", url: "https://docs.limacharlie.io/9-ai-sessions/grid/"},
    {label: "LimaCharlie AI Sessions architecture", url: "https://docs.limacharlie.io/9-ai-sessions/architecture/"},
    {label: "NIST AI risk management framework", url: "https://www.nist.gov/itl/ai-risk-management-framework"}
  ]
},
{
  "slug": "cms-fundamentals",
  "title": "CMS fundamentals: architecture, modeling, and selection",
  "track": "Builder",
  "minutes": 35,
  "level": "Beginner",
  "summary": "Learn CMS terms and overlapping architectures, model content, trace publishing and rollback, and compare Git, Keystatic, TinaCMS, Sanity, Payload, and WordPress.",
  "analogy": "A CMS is the editorial desk: writers organize and revise material, while the website is the place readers experience it. The publishing process connects the two.",
  "takeaways": [
    "A CMS helps people create, organize, edit, and publish content. It is not automatically a database, a digital asset manager, a learning system, or a product API.",
    "Traditional, headless, decoupled, hybrid, Git-backed, and API-first describe overlapping dimensions. One product can match more than one of them.",
    "A schema defines content types, fields, and references. Keep a stable identifier when titles or URL slugs change.",
    "Draft, preview, review, publish, and verify are separate steps. A static build or cache can keep showing the previous version after publish.",
    "Editor login and reader authorization are different controls. A private page does not protect a public dataset, repository, or asset URL.",
    "Git-only, Keystatic, TinaCMS, Sanity, Payload, and WordPress fit different editing and operating needs. Recheck plan limits before you rely on a price.",
    "On this portfolio, local Keystatic edits the public verification, reading-code-and-yaml, and mcp-vs-rest-api lessons, plus the About page, Home cover, and Work narrative sentences. Lesson checks, learner progress, and page interaction stay in application code. Hosted editing is not configured."
  ],
  "exercise": "Use the practice lab on this card for three decisions: architecture, schema, and publishing rollback. Then read docs/builder-academy/cms-fundamentals.md and complete its written self-review. The lab checks choices against the lesson guidance. It does not save progress, grade the written answers, or prove a production CMS is configured safely.",
  "check": {
    "question": "A team already reviews lesson files in Git and wants an editing interface for one site. Which is the most proportionate first experiment?",
    "choices": [
      "Migrate all research, user accounts and lessons into a CMS immediately",
      "Pilot Keystatic on a few public lessons while preserving review and build checks",
      "Put confidential lessons in a public dataset and hide their page links"
    ],
    "answer": 1,
    "explanation": "A small repository-based editing pilot addresses the stated need. On this portfolio, local Keystatic already edits the public verification, reading-code-and-yaml, and mcp-vs-rest-api lessons, plus the About page, Home cover, and Work narrative sentences; hosted editing is not configured. Sanity may fit independent publishing or cross-app reuse, but neither an editor nor a hidden URL establishes reader authorization."
  },
  "companion": {
    "label": "Read the six-chapter CMS fundamentals guide",
    "url": "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/cms-fundamentals.md"
  },
  "sources": [
    {
      "label": "Keystatic: introduction",
      "url": "https://keystatic.com/docs/introduction"
    },
    {
      "label": "Sanity: content modeling",
      "url": "https://www.sanity.io/content-modeling"
    },
    {
      "label": "Sanity: current plans",
      "url": "https://www.sanity.io/pricing"
    },
    {
      "label": "Payload: what it includes",
      "url": "https://payloadcms.com/docs/getting-started/what-is-payload"
    },
    {
      "label": "TinaCMS: Git-backed editing",
      "url": "https://tina.io/docs"
    },
    {
      "label": "WordPress: features",
      "url": "https://wordpress.org/about/features/"
    }
  ]
},
{
  slug: "reading-code-and-yaml",
  ...readingCodeEditorial,
  check: {
    question:
      "A YAML file parses, but verified is at the root instead of inside account. What does that tell you?",
    choices: [
      "Parsing proves the application will behave correctly.",
      "Syntax is valid, but the structure can still violate application expectations.",
      "YAML executes each line like a shell script.",
    ],
    answer: 1,
    explanation:
      "A parser checks syntax. Nesting determines structure; the consuming application and its schema determine whether that structure is meaningful and valid.",
  },
  companion: {
    label: "Read the full lesson, glossary and answer key",
    url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/reading-code-and-yaml.md",
  },
},
{
  "slug": "llms-models-inference-gateways",
  "title": "LLMs, models, inference, and AI gateways",
  "track": "Foundations",
  "minutes": 20,
  "level": "Beginner",
  "summary": "Understand the model behind an AI app, follow one inference request, and explain where gateways, costs and privacy controls fit.",
  "analogy": "Think of the app as a service desk, the model as its prediction engine, and an optional gateway as the dispatcher. The dispatcher chooses a route; it does not verify the answer.",
  "takeaways": [
    "A model is a learned computational system; an LLM is a language-focused model. The application supplies the surrounding interface, data and workflow.",
    "Training changes learned parameters. Inference runs the model on inputs. Supplying context or retrieving documents does not itself retrain the model.",
    "Tokens are model input/output units; the context window is bounded. Streaming, speed and fluent language do not prove accuracy.",
    "A gateway can centralize routing and operational controls; an SDK is a code library, and a provider serves inference. A gateway is optional.",
    "Provider fallback and model fallback differ. Both must preserve approved data handling and required capabilities.",
    "Evaluate evidence quality, latency, total cost and human rework. Keep tool authorization in the application and review untrusted retrieved content."
  ],
  "exercise": "Open the companion guide. Using the fictional Northstar Demo source, trace app → optional gateway → provider/model → validation → human review. Keep unsupported revenue unknown. Calculate the illustrative token cost and explain what should happen when an unapproved fallback is offered. No account, API key or paid call is needed.",
  "check": {
    "question": "Your primary provider fails and a gateway offers a different model from an unapproved provider. What should happen?",
    "choices": [
      "Use it immediately because a gateway guarantees equivalent privacy and quality",
      "Use only a policy-approved, compatible and evaluated fallback, or return a controlled failure",
      "Retrain the primary model by repeating the same prompt"
    ],
    "answer": 1,
    "explanation": "Routing availability does not establish data-handling approval, capability compatibility or answer quality. Inference and training are different operations."
  },
  "companion": {
    "label": "Read the LLMs, inference, and gateways guide",
    "url": "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/llms-models-inference-gateways.md"
  },
  "sources": [
    {
      "label": "Hugging Face: Transformer models",
      "url": "https://huggingface.co/learn/llm-course/chapter1/4"
    },
    {
      "label": "Vercel AI Gateway",
      "url": "https://vercel.com/docs/ai-gateway"
    },
    {
      "label": "Cloudflare AI Gateway",
      "url": "https://developers.cloudflare.com/ai-gateway/"
    },
    {
      "label": "OWASP: Prompt injection",
      "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"
    }
  ]
},
  {
    slug: "frontend-building-blocks",
    title: "Frontend building blocks: from framework to experience",
    track: "Builder",
    minutes: 35,
    level: "Beginner",
    summary: "Understand frontend layers and compare Next.js, SvelteKit, Astro, SolidStart and Nuxt by use case, tradeoffs, ecosystem and adoption evidence.",
    analogy: "Building a house requires a floor plan, reusable rooms, finishes, working controls and useful information. Accessibility and UX influence the entire design, not just the final coat of paint.",
    takeaways: [
      "Frontend = Structure + Components + Styling + Behavior + Data + Accessibility + User Experience.",
      "Semantic HTML gives content structure; React creates reusable components and state; Next.js organizes routing, rendering and server capabilities.",
      "Tailwind generates CSS for styling and responsive layouts; shadcn/ui provides customizable component code. Neither replaces React or Next.js.",
      "Components can handle layout, display, navigation, interaction, forms, data displays, visualizations or feedback; a single component can span several categories.",
      "Data comes from props, local objects or APIs; React state changes what's displayed. A component looking correct does not guarantee accurate data.",
      "Accessible keyboard navigation, focus states, readable content and reduced-motion support are frontend requirements, not optional polish.",
      "UX asks whether visitors can reach their goals; GitHub and Vercel manage code and deployment rather than defining frontend structure or style.",
      "Choose an application framework by whether the product is content-led or interactive, the team’s existing skills, needed server features and maintenance cost.",
      "Next.js has the most reported use among listed options with a separate response in the 2026 Stack Overflow survey; SolidStart is not ranked separately. Adoption is evidence about ecosystem size, not proof of best fit."
    ],
    exercise: "Read docs/builder-academy/frontend-building-blocks.md. Use a synthetic project card to label structure (HTML), component (React), styling (Tailwind), behavior (click/focus), data (props), accessibility (semantic link and keyboard focus) and UX. Then choose frameworks for a content-led event site and an authenticated research workspace; explain the tradeoffs and why survey popularity alone cannot decide. Do not edit production content during this reading exercise.",
    check: {
      question: "A project carousel looks polished but visitors cannot navigate it with a keyboard. What is missing?",
      choices: [
        "Nothing; styling is the entire frontend",
        "Accessibility and user experience must be improved alongside the other frontend layers",
        "Install a different application framework to fix the colors"
      ],
      answer: 1,
      explanation: "Frontend work includes semantics, keyboard/focus behavior and a usable journey. React, Tailwind and a carousel library alone do not guarantee accessibility or task success."
    },
    companion: { label: "Read the complete frontend building-blocks guide", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/frontend-building-blocks.md" },
    sources: [
      { label: "MDN: Learn web development", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development" },
      { label: "React: Your first component", url: "https://react.dev/learn/your-first-component" },
      { label: "Next.js: App Router", url: "https://nextjs.org/docs/app" },
      { label: "SvelteKit: introduction", url: "https://svelte.dev/docs/kit" },
      { label: "Astro: Why Astro?", url: "https://docs.astro.build/en/concepts/why-astro/" },
      { label: "SolidStart: overview", url: "https://docs.solidjs.com/solid-start/v2" },
      { label: "Nuxt: concepts", url: "https://learn.nuxt.com/en/concepts" },
      { label: "Stack Overflow Developer Survey 2026: web framework data", url: "https://survey.stackoverflow.co/2026/technology/data/web-framework" },
      { label: "Tailwind CSS: Styling with utility classes", url: "https://tailwindcss.com/docs/styling-with-utility-classes" },
      { label: "W3C WAI accessibility fundamentals", url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/" }
    ]
  },
  {
    slug: "evaluate-ai-models",
    title: "Evaluate AI models with evidence",
    track: "Builder",
    minutes: 18,
    level: "Beginner",
    summary: "Compare AI models on the same synthetic tasks using measurable quality, evidence, privacy and cost criteria; no automated routing required.",
    analogy: "Choosing a model is like choosing a tool for a job: run the same practical test, inspect the result, and decide based on fit rather than the brand.",
    takeaways: [
      "Evaluation measures performance against a rubric; selection is a human decision; automatic routing is a separate, deferred engineering project.",
      "Fix the prompt, dataset, tools, output contract and scoring criteria before comparing candidates.",
      "Record exact model/version, correctness, schema adherence, sourced claims, abstention, latency, costs and human rework.",
      "A fabricated citation or a critical privacy failure cannot be excused by an attractive overall score.",
      "Use synthetic or approved public inputs, keep untrusted source instructions separate, and require human review before adoption."
    ],
    exercise: "Read docs/builder-academy/evaluate-ai-models.md. Using only synthetic Account Signal Engine fixtures, compare two candidate models on schema validity, grounded industry classification, missing-source abstention and prompt-injection resistance. Fill in a scorecard from real test outputs, then write one human-reviewed recommendation. Do not build model routing or connect production APIs.",
    check: {
      question: "A model returns valid JSON but fabricates a source URL. What should your evaluation conclude?",
      choices: ["Pass because the JSON schema is valid", "Fail the evidence requirement and record the fabricated citation", "Automatically route the next request to a different provider"],
      answer: 1,
      explanation: "Schema compliance and source integrity are separate requirements. An invented citation fails evaluation, and automated routing is not part of this lesson."
    },
    companion: {label: "Read the model evaluation lab", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/evaluate-ai-models.md"},
    sources: [
      {label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework"},
      {label: "OWASP LLM Top 10", url: "https://genai.owasp.org/llm-top-10/"}
    ]
  },
  {
    slug: "storybook-visual-regression",
    title: "Build and test your Design Lab",
    track: "Builder",
    minutes: 18,
    level: "Beginner",
    summary: "Learn when to use Storybook, Playwright, and visual snapshots without replacing the existing Design Lab.",
    analogy: "Storybook is the workshop where you inspect each part; Playwright is the quality inspector checking the working product.",
    takeaways: [
      "Storybook isolates components and documents variants; Design Lab curates the branded experience.",
      "Playwright checks browser behavior and can compare screenshots against approved baselines.",
      "Start with deterministic fixtures, fixed viewports, loaded fonts and reduced motion before relying on pixel diffs.",
      "A visual snapshot alone does not prove accessibility or correct interaction.",
      "Open-source licenses can cost $0 while cloud CI, artifacts and hosted reviews still incur usage costs."
    ],
    exercise: "Choose one avatar and one project card. Define default, mobile, keyboard-focused and reduced-motion states. Propose one browser interaction assertion and a screenshot baseline; explain how to review a legitimate layout change.",
    check: {
      question: "A screenshot test passes. Which conclusion is warranted?",
      choices: ["The page is fully accessible", "The compared image did not exceed the configured visual difference threshold", "The Storybook components are deployed publicly"],
      answer: 1,
      explanation: "Visual comparisons detect pixel changes under configured conditions, not complete accessibility or deployed behavior."
    },
    companion: {label: "Read the complete Design Lab testing guide", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/storybook-visual-regression.md"},
    sources: [{label:"Storybook Next.js framework",url:"https://storybook.js.org/docs/get-started/frameworks/nextjs-vite"},{label:"Playwright screenshot assertions",url:"https://playwright.dev/docs/test-snapshots"}]
  },
  {
    slug: "integration-registry-finops",
    title: "Control integrations and cloud spend",
    track: "Builder",
    minutes: 16,
    level: "Beginner",
    summary: "Use the existing Technical Docs registry to plan integrations, estimate cost, set spending guardrails and verify controls.",
    analogy: "The software catalog is your equipment inventory; the FinOps policy is the budget and shutoff procedure.",
    takeaways: [
      "Reuse the canonical software catalog, architecture registry and integration contracts rather than maintaining duplicate inventories.",
      "Proposed, configured, verified and paused are different integration states.",
      "A free tool can still generate hosting, CI, storage or API costs.",
      "Reviewing spend at 50% and 80% is useful, but alerts alone are not hard caps.",
      "At 100% of an approved budget, a tested kill switch should stop nonessential metered jobs; protect essential security and incident functions."
    ],
    exercise: "Draft a fictional visual-testing project budget. List software licenses, CI runner minutes, screenshot storage, a forecast, alerts at 50% and 80%, and the control that stops nonessential work at 100%. Leave unverified dollar amounts unknown.",
    check: {
      question: "What is true of a billing alert at 100% of a monthly budget?",
      choices: ["It always prevents further charges", "It may notify you without blocking additional charges", "It proves every service has a hard limit"],
      answer: 1,
      explanation: "Alerts and hard spending controls are not equivalent. Validate the vendor limit and an application-level stop mechanism."
    },
    companion: {label: "Read the complete FinOps lesson", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/finops-and-integration-registry.md"},
    sources: [{label:"Canonical FinOps policy",url:"https://github.com/heyfunwhoa/technical-docs-platform/blob/main/software-catalog/finops-policy.md"},{label:"Integration registry",url:"https://github.com/heyfunwhoa/technical-docs-platform/blob/main/software-catalog/integrations.json"}]
  },
  {slug:"evidence-based-product-request",title:"Write an evidence-based product request",track:"GTM",minutes:20,level:"Beginner",summary:"Turn Sales, CS, Support or leadership feedback into a user problem, source-backed evidence and a cautious business-impact hypothesis.",analogy:"Like a doctor's referral: describe the symptoms and evidence before prescribing a solution.",takeaways:["Start with the affected persona, workflow, problem and current workaround—not the desired feature.","Preserve the original source, date, frequency and confidence; distinguish facts from hypotheses.","Estimate customer value, commercial value and strategic relevance separately.","Opportunity size is exposed pipeline, not the value attributable to a feature. Probability-adjusted estimates require evidence and assumptions.","A request may enter discovery, need more evidence, receive a workaround, be deferred or be declined.","Use fictional scenarios here; real company and customer data must remain in approved systems."],exercise:"Complete the fictional product-request lab. Include evidence, measurable outcome and an incremental value estimate. Then explain what you would still need to validate.",check:{question:"A seller says a $200k deal needs a feature. What value can you claim?",choices:["The feature is worth $200k in ARR","Record $200k as exposure; estimate incremental win probability and label assumptions","Promise Product will build it"],answer:1,explanation:"Exposed pipeline is not attributable revenue. Estimate incremental impact with transparent uncertainty and no double counting."},sources:[{label:"Atlassian Product Discovery",url:"https://www.atlassian.com/agile/product-management/discovery"},{label:"Linear Customer Requests",url:"https://linear.app/docs/customer-requests"}]},
  {
    slug: "idea-to-verified-release",
    title: "From idea to verified release",
    track: "Builder",
    minutes: 45,
    level: "Beginner",
    summary: "See how priorities, requirements, Linear issues, Cursor, GitHub PRs and CI form one accountable delivery workflow without duplicating project tracking.",
    analogy: "A restaurant order has one ticket, a recipe, a kitchen station and a quality check. You do not need five copies of the same order to know whether dinner is ready.",
    takeaways: [
      "Follow three core stops: save/check/publish, define a small change, then justify a release decision. The 45-minute core is a suggested study budget; optional extensions are separate.",
      "Commit records a version, merge accepts a change and deployment publishes a version. Verify the intended revision and actual user journey before calling a release complete.",
      "Define the problem, user, owner, requirement, non-goal and dependency before assigning implementation. Keep the PRD in the owning repository and delivery work in Linear.",
      "Checks apply to a particular commit and prove only the behaviors they test. Code review and acceptance evidence still matter; new changes need relevant checks again.",
      "Use one fictional lesson-edit example throughout the core. Detailed PRD/team material is reference reading; revenue planning is an alternative exercise.",
      "First-deployment settings, security review and agent coordination are optional companions. Add services when implemented behavior needs them, with appropriate access and cost controls.",
      "Reading, attempting an exercise and demonstrating its criteria are different. Paper exercises do not submit data to another app or automatically award progress."
    ],
    exercise: "Open the companion guide and follow its three core stops using one fictional lesson edit. Explain save/check/publish; write a problem, owner, requirement, non-goal and dependency; then complete the worked exercise's five-line handoff and recovery decision. Write fictional answers in a practice note you control and compare with the guide's answer key. Stop after the core; choose first-deployment settings, security review or agent coordination only when useful. Never enter confidential information. The guide's paper exercises have no submission or storage mechanism of their own.",
    companion: { label: "Open the three-stop learning path and optional companions", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/idea-to-verified-release.md#choose-a-short-learning-path" },
    check: {
      question: "Your implementation PR passes CI but the expected calculation has not been checked. What should happen?",
      choices: ["Mark Done because all green checks prove the feature works", "Keep the issue In Review until its acceptance criteria and user journey are verified", "Copy the issue into GitHub Issues and Notion to increase visibility"],
      answer: 1,
      explanation: "CI proves the checks it actually ran passed; it does not replace review of the expected business behavior."
    },
    sources: [
      { label: "GitHub Docs: About pull requests", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests" },
      { label: "GitHub Docs: About status checks", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks" },
      { label: "Linear Docs: GitHub integration", url: "https://linear.app/docs/github" },
      { label: "GitHub Docs: Secure use of Actions", url: "https://docs.github.com/en/actions/reference/security/secure-use" },
      { label: "GitHub Docs: Dependency review", url: "https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review" }
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
  {
    slug: "better-auth-gtm-workspace",
    title: "Build a private GTM workspace with Better Auth",
    track: "Builder",
    minutes: 25,
    level: "Intermediate",
    summary: "Learn how a verified session differs from per-account authorization while planning a private research desk with Next.js and Neon.",
    analogy: "Better Auth checks your badge at the building entrance; your app still decides which individual room that badge can unlock.",
    takeaways: [
      "Authentication proves which user has a valid session; authorization independently checks that user's permission to read or change an exact account.",
      "A representative name, query string or account ID supplied by a browser is never a trusted permission boundary.",
      "Start with a private, allowlisted operator and reject anonymous server actions before storage, job dispatch or provider calls.",
      "Keep cron, webhook and agent service identities separate from human session cookies.",
      "Test a synthetic two-user scenario: changing account IDs or rep names must fail with zero unauthorized side effects.",
      "Record evidence per step: planned, tested, merged, deployed and production-verified are different states.",
    ],
    exercise: "Read docs/builder-academy/authentication-vs-authorization.md, then work through the synthetic Better Auth GTM case study at docs/builder-academy/better-auth-gtm-workspace.md. Draw the login-session-policy-data flow. Write a test where Alex tries to open Jordan's account: assert the server denies, no data changes and no research job starts. Record one observation using the evidence-journal template. Do not use real user data or credentials.",
    check: {
      question: "An AE signs in successfully but changes an account URL ID to view another AE's research. Which control must stop it?",
      choices: [
        "Better Auth login success means the user may view all accounts",
        "A server-side account-permission check against the authenticated user's approved assignments",
        "Hiding the account in the navigation menu",
      ],
      answer: 1,
      explanation: "A valid session establishes identity only. The application's data-access policy must check the specific requested account before returning data or performing work.",
    },
    sources: [
      { label: "Better Auth: Next.js integration", url: "https://better-auth.com/docs/integrations/next" },
      { label: "Better Auth: Drizzle adapter", url: "https://better-auth.com/docs/adapters/drizzle" },
      { label: "OWASP Authorization Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" },
      { label: "Next.js authentication guidance", url: "https://nextjs.org/docs/app/guides/authentication" },
    ],
  },
  {
    slug: "measure-product-use-safely",
    title: "Measure product use without collecting private activity",
    track: "Builder",
    minutes: 20,
    level: "Beginner",
    summary: "Understand PostHog versus Vercel Analytics, choose useful outcome events, and verify privacy before enabling measurement.",
    analogy: "A login badge identifies who entered; a permission rule controls rooms; product analytics counts useful, approved work; an audit log records changes to the locks.",
    takeaways: [
      "Better Auth sessions, account authorization, product events, observability and security audit logs solve different problems.",
      "Define numerator, denominator, timeframe and exclusions before installing an analytics SDK.",
      "Capture a completed workflow after authorized durable success, not just an optimistic click or queued job.",
      "Use fixed, low-cardinality properties, not raw customer details, URLs, form contents, model prompts or session tokens.",
      "Disable recording/autocapture for sensitive applications until a separate privacy assessment approves it.",
      "Instrument only products with a user decision to make and record tests, deployment evidence and uncertainty.",
    ],
    exercise: "Follow the fictional lesson in docs/builder-academy/measure-product-usage-safely.md. Draft a three-event plan for a seller workflow; define a seven-day funnel. Explain what happens if account access is denied or analytics is offline. Write a synthetic no-PII, no-duplicate-event test and one after-launch learning journal entry.",
    check: {
      question: "An AE signs in and clicks Create Draft, but account permission is denied. Should the app record outreach_draft_created?",
      choices: [
        "Yes, the button click proves adoption",
        "No, the application must authorize and persist the draft first",
        "Yes, authentication automatically authorizes all accounts",
      ],
      answer: 1,
      explanation: "Only a permitted and persisted business outcome counts. A login is not account authorization; denied actions should not emit a success event.",
    },
    sources: [
      { label: "PostHog Next.js guide", url: "https://posthog.com/docs/libraries/next-js" },
      { label: "Vercel Analytics privacy", url: "https://vercel.com/docs/analytics/privacy-policy" },
      { label: "OWASP logging guidance", url: "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html" },
    ],
  },
  {
    slug: "mcp-vs-rest-api",
    ...mcpRestEditorial,
    check: {
      question:
        "A Sumble-like provider offers an MCP tool that reveals contact details. What does MCP access prove?",
      choices: [
        "That the contact list can be bulk copied into a personal warehouse",
        "Only that a compatible client may invoke a tool subject to permissions, licensing and processing restrictions",
        "That there is no need for a REST API, security review or provider agreement",
      ],
      answer: 1,
      explanation:
        "MCP makes capabilities discoverable to an assistant. It does not waive tenant authorization, source licensing, credit budgets or data protection responsibilities.",
    },
    companion: {
      label: "Open the full lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/mcp-vs-rest-api.md",
    },
  },
  {
    slug: "enterprise-contracts-sales-cycle",
    title: "NDA vs MNDA, DPA, MSA: enterprise deal reviews",
    track: "GTM",
    minutes: 30,
    level: "Beginner",
    summary: "Recognize the legal, privacy, security and commercial documents in a B2B sales cycle, and learn the distinct decisions an AE and Head of Sales coordinate.",
    analogy: "The order form says what you bought, ToS sets usage rules, an MSA governs the relationship, an MNDA protects exchanged secrets, and a DPA governs certain processing of personal data.",
    takeaways: [
      "An NDA can be unilateral or mutual; an MNDA explicitly protects confidential disclosures in both directions. Neither permits unrelated processing, exporting or indefinite retention of data.",
      "Terms of Service and API/data licenses define allowed use; an advertised API or paid plan does not guarantee storage, redistribution or CRM-sync rights.",
      "MSA addresses commercial relationship terms, order form specifies purchase, and SOW may define implementation services.",
      "A DPA covers controller-processor personal-data obligations when applicable; SCCs may govern some international transfers; a DPIA is an impact assessment, not a contract.",
      "Security due diligence examines evidence and controls; start reviews before the final signature week and track decision owners.",
      "An AE coordinates deal issues without offering unapproved legal promises; a Head of Sales sets deal-desk processes, escalation rights and reviews cycle friction with Legal, Security and Privacy."
    ],
    exercise: "Read docs/builder-academy/enterprise-contracts-sales-cycle.md. Compare a unilateral NDA with an MNDA when both sides share confidential information. For a synthetic pilot, distinguish an unsigned MNDA, DPA, security questionnaire, MSA redline and purchase order blocker. Build an owner/decision/status tracker, then propose an AE next action and a Head of Sales process improvement. Do not use real customer agreements.",
    check: {
      question: "A buyer signs an MNDA. Does that by itself permit uploading employee data to any enrichment API and storing it forever?",
      choices: [
        "Yes, a confidentiality agreement also grants processing and data licensing rights",
        "No, data-use rights, privacy roles, DPA where applicable, security and retention obligations must be reviewed separately",
        "Yes, but only if the vendor is on a paid plan"
      ],
      answer: 1,
      explanation: "Confidentiality is not a substitute for privacy and data-processing terms, vendor licensing, access controls or a qualified legal review."
    },
    companion: { label: "Open the full lesson and practice guide", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/enterprise-contracts-sales-cycle.md" },
    sources: [
      { label: "European Commission: controller and processor roles", url: "https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en" },
      { label: "ICO: controller-processor contract terms", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/" },
      { label: "NIST: nondisclosure agreement", url: "https://csrc.nist.gov/glossary/term/non_disclosure_agreement" }
    ]
  },
  {
    slug: "security-assessments-buyer-size",
    title: "Security assessments from startups to enterprises",
    track: "GTM",
    minutes: 35,
    level: "Intermediate",
    summary: "Understand vendor-security reviews across startup, mid-market and enterprise buyers, and evaluate SOC 2 reports, penetration tests, subprocessors, security questionnaires and buyer risk.",
    analogy: "A vendor security review is a building inspection before moving in: you check not just the building's size but what is stored inside, who has the keys, and which contractors can enter.",
    takeaways: [
      "Security assessments are risk-based: sensitivity, access, criticality, regulations and integrations matter more than company headcount alone.",
      "A SOC 2 Type I examines control design at a point in time; Type II examines design and operating effectiveness over a period, within a defined system scope and with possible exceptions.",
      "A penetration test is an authorized point-in-time assessment, not a warranty. Review testing scope, date, material findings, remediation, retests, and permitted sharing tier.",
      "ISO 27001, CAIQ, SIG, security policies, trust centers and pen-test summaries are different types of evidence and do not substitute for one another.",
      "A subprocessor processes personal data on behalf of another processor. Review its role, categories of data, location/access, downstream providers, agreements, change notices and retention obligations.",
      "AE responsibilities include early discovery, approved evidence, owners and next steps; Head of Sales responsibilities include repeatable security packets, deal-desk escalation, realistic forecasting and exception controls.",
      "A signed NDA or MNDA may govern confidential sharing, but it does not establish DPA, BAA, data-license or vendor-risk approvals."
    ],
    exercise: "Read docs/builder-academy/security-assessments-by-buyer-size.md. Compare a fictional startup synthetic-data pilot, a mid-market repository integration and a regulated enterprise handling patient records. For each, identify risk tier, a suitable SOC 2 or pen-test evidence request, subprocessor/data-flow questions, the AE next action and a Head of Sales process improvement. Never use real reports or employer data.",
    check: {
      question: "A 12-person startup plans to send regulated patient records to a vendor, while a large enterprise tests with synthetic data. Which principle should guide the security review?",
      choices: [
        "Large enterprises always require more diligence solely because of employee count.",
        "Actual data risk, access scope, law and buyer policy determine the assessment depth; small companies can face stringent requirements too.",
        "An executed MNDA eliminates the need for reviewing pen-test reports, subprocessors or data processing."
      ],
      answer: 1,
      explanation: "Buyer headcount predicts neither actual technical exposure nor legal obligations. Examine data, access, criticality, audit scope, subprocessors and authorized processing requirements."
    },
    companion: { label: "Open the full lesson and practice guide", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/security-assessments-by-buyer-size.md" },
    sources: [
      { label: "NIST CSF 2.0 guidance", url: "https://www.nist.gov/cyberframework/quick-start-guides" },
      { label: "AICPA SOC 2 guide", url: "https://www.aicpa.com/cpe-learning/publication/soc-2-reporting-on-an-examination-of-controls-at-a-service-organization-relevant-to-security-availability-processing-integrity-confidentiality-or-privacy" },
      { label: "OWASP pen-test report structure", url: "https://wstg.owasp.org/v4.2/5-Reporting/" },
      { label: "ICO: Subprocessor contractual obligations", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/controllers-and-processors/controllers-and-processors/what-does-it-mean-if-you-are-a-processor/" }
    ]
  },
  {slug:"what-is-ai",title:"AI, models and assistants",track:"Foundations",minutes:8,level:"Beginner",summary:"Learn the difference between AI, machine learning, LLMs, and products such as ChatGPT and Claude.",analogy:"The model is an engine; the app is the vehicle with controls, navigation and optional tools.",takeaways:["AI is a broad field, not just chatbots.","Apps may offer different models and tools.","Fluent output is not proof of accuracy."],exercise:"Ask an assistant to explain a topic for a novice, then identify two claims to independently check.",check:{question:"Which describes ChatGPT or Claude as an app?",choices:["The same thing as the underlying model weights","An interface that can combine models, context and tools","A vector database"],answer:1,explanation:"An assistant app may combine a model with files, tools, workflows and UI."},sources:[{label:"Google ML Crash Course",url:"https://developers.google.com/machine-learning/crash-course"}]},
  {slug:"evolution",title:"From rules to AI agents",track:"Foundations",minutes:10,level:"Beginner",summary:"Trace rule-based systems, machine learning, deep learning, transformers and tool-using agents.",analogy:"From following a fixed recipe to recognizing patterns, then assisting with tools and feedback.",takeaways:["These approaches overlap rather than replace one another.","Transformers enabled major language-model advances.","Agents need permission boundaries."],exercise:"Choose a business task and decide whether a rule, model or agent is actually necessary.",check:{question:"Does every useful automation require an AI agent?",choices:["Yes","No, deterministic rules may be simpler and safer","Only if it has a database"],answer:1,explanation:"Prefer the simplest reliable approach."},sources:[{label:"Attention Is All You Need",url:"https://arxiv.org/abs/1706.03762"}]},
  {slug:"prompting",title:"Write prompts that work",track:"Prompting",minutes:12,level:"Beginner",summary:"Practice specifying objective, context, inputs, constraints, output and validation.",analogy:"A good prompt is a good assignment brief—not a magic incantation.",takeaways:["Define a measurable outcome.","Keep source material separate from instructions.","Require uncertainties to be labeled."],exercise:"Rewrite 'Research this account' as a sourced account brief with audience, required fields and checks.",check:{question:"What most improves a vague request?",choices:["Adding lots of role adjectives","Clear task, context, constraints and a verifiable output","Always asking for a longer answer"],answer:1,explanation:"Specific expectations and inputs make results easier to assess."},sources:[{label:"OpenAI prompting guide",url:"https://platform.openai.com/docs/guides/prompt-engineering"}]},
  { slug: "verification", ...verificationEditorial, check: { question: "A generated citation proves a claim is true.", choices: ["True", "False"], answer: 1, explanation: "Citations can be irrelevant, stale or invented; inspect the actual source." } },
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

  {
    slug: "security-hardening-release-gates",
    title: "Security hardening: standards to release gates",
    track: "Builder",
    minutes: 25,
    level: "Intermediate",
    summary: "Translate NIST SSDF and OWASP guidance into app-specific risk tiers, denied-path tests, code review and a verified deployment decision.",
    analogy: "A building code is the requirement; the door lock is the implementation; a tested key is evidence; and a site inspection verifies the actual building.",
    takeaways: [
      "Reuse the shared security baseline instead of copying a different app's authentication code or declaring certification.",
      "Choose risk tier from actual data, API, job, AI and release boundaries, not from how polished the site looks.",
      "A working login session does not authorize access to a specific account; negative tests must cover forbidden direct requests with zero side effects.",
      "Map the threat to a control, exact-commit CI evidence, an owner and a rollback/release gate.",
      "Documented, implemented, tested, merged and deployment-verified are separate claims."
    ],
    exercise: "Complete the fictional threat-model and release-review lab in docs/builder-academy/security-hardening-release-gates.md. Produce two denied-path tests, one PR review decision and an explicit no-go condition. Never use production data.",
    check: {
      question: "A login PR is green, but a signed-in seller can open another seller's research by changing a URL. Is the application ready for a private real-data pilot?",
      choices: [
        "Yes. Successful login and CI certify access control.",
        "No. Server-side object authorization and negative tests must pass, followed by deployment verification.",
        "Yes. Hide the other account from navigation."
      ],
      answer: 1,
      explanation: "Authentication, authorization and deployed access protections are distinct controls; a CI run only proves the tests it executed."
    },
    companion: { label: "Open the complete risk-based security lab", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/security-hardening-release-gates.md" },
    sources: [
      { label: "NIST SSDF v1.1 final", url: "https://csrc.nist.gov/pubs/sp/800/218/final" },
      { label: "OWASP ASVS 5.0.0", url: "https://github.com/OWASP/ASVS/releases/tag/v5.0.0" },
      { label: "OWASP Authorization Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" }
    ]
  },
  {
    slug: "secure-account-import-research",
    title: "Secure CSV, AI research, and account export",
    track: "Builder",
    minutes: 25,
    level: "Intermediate",
    summary: "Protect the full account-data journey: staged imports, normalization, identity review, external website research, tool permissions and Excel/CRM boundaries.",
    analogy: "An intake clerk checks each label and owner before inventory enters the warehouse. Research is a supplier note; approval is a separate decision.",
    takeaways: [
      "Raw, normalized, sourced and approved values are different objects; standardization does not prove accuracy.",
      "A CSV owner name, website domain or account ID cannot grant a user permission.",
      "Import previews should be read-only, preserving row dispositions and exceptions without provider spending or database mutations.",
      "Scraped content is untrusted data and must not become instructions to an AI tool or another user's private account scope.",
      "Approved Excel exports need fresh server authorization, source lineage, safe cell encoding and explicit CRM write approval."
    ],
    exercise: "Follow docs/builder-academy/secure-account-import-research.md with eight fictional rows. Identify unsafe inputs, propose a normalization preview, write two denied-path tests and explain what you would not deploy yet.",
    check: {
      question: "A CSV has a clean domain but a conflicting owner and uncertain revenue estimate. What should happen?",
      choices: [
        "Auto-overwrite the existing company and owner because the domain parsed.",
        "Keep a read-only normalized candidate and require identity, field and server-authorized commit review.",
        "Run paid enrichment and auto-sync the result to the CRM without review."
      ],
      answer: 1,
      explanation: "A validated domain is not an entitlement or a verified legal entity; ownership and uncertain claims require explicit review."
    },
    companion: { label: "Open the complete secure-data lab", url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/secure-account-import-research.md" },
    sources: [
      { label: "OWASP CSV Injection", url: "https://owasp.org/www-community/attacks/CSV_Injection" },
      { label: "OWASP SSRF Prevention", url: "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html" },
      { label: "OWASP GenAI LLM Top 10 2026", url: "https://genai.owasp.org/llm-top-10/" }
    ]
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
