// Generates a disposable Next.js app outside the portfolio checkout.
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "../..");
const output = resolve(
  process.argv[2] ?? "/workspace/scratch/frontend-comparison",
);
if (output === repo || output.startsWith(repo + "/"))
  throw new Error("Use a directory outside the portfolio checkout");
mkdirSync(output + "/app/native", { recursive: true });
mkdirSync(output + "/app/fumadocs", { recursive: true });
for (const file of ["package.json", "package-lock.json"])
  copyFileSync(here + "/" + file, output + "/" + file);
copyFileSync(
  repo + "/components/ai-academy/frontend-lesson.tsx",
  output + "/app/lesson.tsx",
);
writeFileSync(
  output + "/app/globals.css",
  readFileSync(repo + "/app/globals.css", "utf8").replace(
    '@import "shadcn/tailwind.css";',
    "",
  ),
);
writeFileSync(
  output + "/postcss.config.mjs",
  'export default {plugins:{"@tailwindcss/postcss":{}}};',
);
writeFileSync(
  output + "/next.config.mjs",
  "export default {turbopack:{root:process.cwd()}};",
);
writeFileSync(
  output + "/app/layout.tsx",
  'import "./globals.css"; export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}',
);
writeFileSync(
  output + "/app/native/page.tsx",
  `"use client";
import {FrontendLesson} from '../lesson';
export default function Page(){return <main className="mx-auto max-w-3xl p-5"><h1 className="text-3xl">Frontend pilot comparison</h1><FrontendLesson onSelectLesson={()=>{}}/></main>}`,
);
writeFileSync(
  output + "/app/fumadocs/page.tsx",
  `"use client";
import {RootProvider} from 'fumadocs-ui/provider/next';
import {DocsLayout} from 'fumadocs-ui/layouts/docs';
import {DocsPage,DocsBody,DocsTitle} from 'fumadocs-ui/page';
import {Steps,Step} from 'fumadocs-ui/components/steps';
import {FrontendLesson} from '../lesson';
import 'fumadocs-ui/style.css';
import './tokens.css';
function Section({id,children}:{id:string;children:React.ReactNode}){return <section id={id} className="mt-7 min-w-0 scroll-mt-6"><Step>{children}</Step></section>}
export default function Page(){return <RootProvider theme={{enabled:false}} search={{enabled:false}}><DocsLayout tree={{name:'Academy',children:[{type:'page',name:'Frontend',url:'/fumadocs'}]}} nav={{title:'Academy comparison'}} themeSwitch={{enabled:false}} searchToggle={{enabled:false}}><DocsPage toc={[]} tableOfContent={{enabled:false}}><DocsTitle>Frontend pilot comparison</DocsTitle><DocsBody><Steps><FrontendLesson Section={Section} onSelectLesson={()=>{}}/></Steps></DocsBody></DocsPage></DocsLayout></RootProvider>}`,
);
console.log(output);

writeFileSync(
  output + "/app/fumadocs/tokens.css",
  `:root {
 --color-fd-background:var(--background); --color-fd-foreground:var(--foreground);
 --color-fd-card:var(--card); --color-fd-card-foreground:var(--foreground);
 --color-fd-primary:var(--accent); --color-fd-primary-foreground:var(--accent-foreground);
 --color-fd-border:var(--border); --color-fd-muted:var(--background);
 --color-fd-muted-foreground:var(--muted); --color-fd-ring:var(--accent);
 --color-fd-popover:var(--card); --color-fd-popover-foreground:var(--foreground);
 --color-fd-accent:var(--background); --color-fd-accent-foreground:var(--foreground);
 --color-fd-secondary:var(--card); --color-fd-secondary-foreground:var(--foreground);
}`,
);
