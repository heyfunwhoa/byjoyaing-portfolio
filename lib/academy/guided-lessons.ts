export type GuidedLesson = {
  slug: "how-code-works" | "programming-concepts";
  duration: number;
  analogy: string;
  objectives: string[];
  sections: { heading: string; explanation: string; exampleLabel?: string; code?: string; takeaway: string }[];
  activity: { question: string; choices: string[]; correct: number; explanation: string };
  checks: { question: string; choices: string[]; correct: number; explanation: string }[];
  references: { label: string; href: string }[];
};

export const guidedLessons: GuidedLesson[] = [
  {
    slug: "how-code-works",
    duration: 12,
    analogy: "Source code is a recipe. A runtime is the kitchen that follows the instructions; the output is the finished dish. Different languages have different rules for writing the recipe.",
    objectives: ["Identify source files and file extensions.", "Distinguish source code, runtime, and output.", "Describe why a build can fail before an application runs."],
    sections: [
      {heading:"Source files are instructions", explanation:"Developers write text into files like app/page.tsx, script.py or query.sql. A file extension is a clue about the content, not proof of what a file does. Folders organize files, and an entry point tells an environment where execution begins.", exampleLabel:"hello.js", code:'const audience = "Builder";\nconsole.log("Hello, " + audience);', takeaway:"A .js file contains JavaScript source code; console.log prints an output when run."},
      {heading:"Something needs to run the instructions", explanation:"Browser JavaScript executes in a browser; JavaScript build tools and servers often use Node.js. Python normally runs with a Python interpreter. SQL is executed by a database engine. These are different execution environments.", exampleLabel:"terminal (illustration)",code:"node hello.js\n# Output: Hello, Builder",takeaway:"A text file does not become a running program merely by existing."},
      {heading:"Builds catch problems before release", explanation:"Some projects transform source files into application bundles. TypeScript's static checker can detect inconsistent types without running the app, and a build can also fail on missing dependencies or invalid imports. Some languages compile to executable code; others are interpreted or use a mixture of techniques.", takeaway:"Linting, testing, type checking and building catch different classes of problems."},
    ],
    activity:{question:"You find app/page.tsx in a Next.js project. Which interpretation is safest?",choices:["It is probably a TypeScript/JSX source file handled by the app's tooling","It must be a database table","Its contents automatically run as a standalone program"],correct:0,explanation:"The .tsx extension indicates TypeScript with JSX syntax. The project framework and build/runtime determine how it is used."},
    checks:[
      {question:"Which runs JavaScript outside the browser?",choices:["CSS","Node.js","HTML"],correct:1,explanation:"Node.js is a JavaScript runtime; HTML is markup and CSS defines styles."},
      {question:"If lint passes, must a production build pass?",choices:["Yes","No"],correct:1,explanation:"Builds can encounter TypeScript, dependency, or other errors that linting did not catch."},
    ],
    references:[{label:"MDN: JavaScript overview",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction"},{label:"Node.js introduction",href:"https://nodejs.org/en/learn/getting-started/introduction-to-nodejs"},{label:"TypeScript for JavaScript programmers",href:"https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html"}],
  },
  {
    slug:"programming-concepts",
    duration:15,
    analogy:"Think of a small order-taking system: variables hold details, arrays keep a list of orders, conditions make decisions, loops process every order, and functions package repeated work.",
    objectives:["Recognize values, variables and basic types.","Trace a function with an input and output.","Explain conditionals, arrays and loops in plain language."],
    sections:[
      {heading:"Values, variables and data types",explanation:"Values are pieces of information, such as text, numbers and true/false values. Variables give values names. In JavaScript, const prevents reassigning that variable binding, though objects held by it may still be mutable.",exampleLabel:"values.js",code:'const company = "LimaCharlie";\nconst employees = 20;\nconst isPublic = false;',takeaway:"Types describe what kind of data a value represents."},
      {heading:"Functions group repeatable logic",explanation:"A function takes inputs called parameters, performs work, and can return a result. You can call the function using different arguments. Reading code often starts by locating each function's inputs and output.",exampleLabel:"greeting.js",code:'function greet(name) {\n  return "Hello, " + name;\n}\n\nconsole.log(greet("Builder"));',takeaway:"The function returns the text Hello, Builder for the input Builder."},
      {heading:"Conditions, collections and loops",explanation:"An if statement selects a path based on a condition. Arrays collect ordered items. A loop repeats the same logic for multiple values. Together they support practical tasks such as filtering account lists or processing source records.",exampleLabel:"accounts.js",code:'const scores = [45, 80, 92];\nfor (const score of scores) {\n  if (score >= 80) {\n    console.log("Review account");\n  }\n}',takeaway:"The code prints Review account twice—once for 80 and once for 92."},
    ],
    activity:{question:"A function returns price * quantity. What is its result when price = 12 and quantity = 3?",choices:["15","36","123"],correct:1,explanation:"Multiplication uses the values as numbers: 12 × 3 = 36."},
    checks:[
      {question:"Which structure holds an ordered list of values in JavaScript?",choices:["Array","Function","CSS selector"],correct:0,explanation:"Arrays hold ordered collections. Functions package logic and CSS selectors match elements."},
      {question:"How many times does if (score >= 80) run its branch for [45, 80, 92]?",choices:["One","Two","Three"],correct:1,explanation:"80 and 92 satisfy the condition, while 45 does not."},
    ],
    references:[{label:"MDN: JavaScript guide",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"},{label:"MDN: Functions",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"},{label:"MDN: Control flow",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling"}],
  },
];

export function getGuidedLesson(slug:string){return guidedLessons.find(l=>l.slug===slug)}
export function scoreGuidedLesson(slug:string, answers:Record<number,number>){
  const lesson=getGuidedLesson(slug);
  if(!lesson) return {score:0,total:0,answered:0};
  const all=[lesson.activity,...lesson.checks];
  return {score:all.filter((q,i)=>answers[i]===q.correct).length,total:all.length,answered:all.filter((_,i)=>answers[i]!==undefined).length};
}
