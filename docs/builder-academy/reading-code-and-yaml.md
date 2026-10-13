# Reading code, files, JSON and YAML

**Builder Academy · Beginner · 25 minutes plus optional glossary**  
**Lesson ID:** `reading-code-and-yaml` · **Prerequisites:** none  
**Reviewed:** 2026-10-12 · **Status:** authored lesson; production publication requires merge and deployment verification.

## Your goal

Open an unfamiliar file and explain its purpose, one input, one output, and what would interpret it. Read examples before running anything. You do not need to memorize a language to begin reviewing code.

Start with sections 1–4. Then try the practice and check your answers. The glossary is a reference, not a vocabulary test. These are fictional teaching examples; none connects to a service.

## 1. First identify the file

A file is named content saved on a computer. A folder groups files; a path tells you where one lives. In `lib/academy/lesson-guidance.ts`, `lib` and `academy` are folders and `.ts` is the extension. An extension is a clue, not proof of safe contents. A repository combines project files with version history.

| File | What it usually contains | What to look for |
| --- | --- | --- |
| `.md` | Markdown documentation | Headings, links, instructions and fenced examples |
| `.html` | Page structure | Tags such as `<h1>` and `<button>` |
| `.css` | Visual rules | Selector, property and value |
| `.js` / `.ts` | JavaScript / TypeScript source | Inputs, functions, conditions and returned values |
| `.jsx` / `.tsx` | JavaScript / TypeScript with JSX | Components mixing program logic and UI markup |
| `.py` | Python source | Imports, `def`, indentation and returned values |
| `.sql` | Database statements | Tables, filters; distinguish reads from writes |
| `.json` | Structured data or configuration | Objects, arrays, keys and typed values |
| `.yaml` / `.yml` | YAML data, often configuration | Indentation, mappings and lists |
| `.sh` | Shell script | Commands and their effects on files or services |
| `.env` | Environment-variable assignments | Setting names; never share credential values |
| `package.json` | Node project metadata and scripts | Dependencies and the command behind each script |
| `package-lock.json` | Resolved npm dependency information | Exact resolutions; use the package manager to update it |

HTML describes structure, CSS presentation, and JavaScript behavior. React is a UI library, Next.js a framework, and Node.js a runtime. They are not alternative names for one language. Continue in [Programming Foundations](/ai-academy/programming) for the existing technology explorer.

## 2. Read code as input → decision → output

```ts
function labelAccount(name: string, verified: boolean): string {
  if (!verified) {
    return "Needs review";
  }
  return name + " — verified";
}

const label = labelAccount("Example Co", false);
```

Read this aloud:

1. `function` defines a reusable operation named `labelAccount`.
2. `name` and `verified` are parameters: named inputs. `string` means text; `boolean` means true or false. The final `: string` describes the returned type.
3. `if` selects a branch. `!verified` means “not verified.”
4. `return` sends a result back and stops that function call.
5. The last line calls the function with two arguments. `const label` stores the result in a binding that cannot be reassigned.

The result is `"Needs review"`. With `true`, it is `"Example Co — verified"`. This function formats a label; it does not independently verify a company. TypeScript type checking does not validate external data at runtime.

Equivalent Python:

```python
def label_account(name: str, verified: bool) -> str:
    if not verified:
        return "Needs review"
    return name + " — verified"
```

Python uses indentation for blocks. Type hints describe expected types but do not enforce them automatically at runtime. Defining either function does not call it.

Other small examples:

```html
<button>Review account</button>
```

This defines a button, but supplies no application click handler.

```css
button { font-weight: bold; }
```

The selector targets buttons; the declaration makes text bold.

```sql
SELECT name FROM accounts WHERE verified = true;
```

This asks a database for names in rows whose `verified` value is true. It does not verify those records. `UPDATE` and `DELETE` change data; do not run unfamiliar statements against a real database.

## 3. Read JSON and YAML as structured information

JSON represents data using objects and arrays. Object property names use double quotes; standard JSON has no comments or trailing commas.[1]

```json
{
  "account": { "name": "Example Co", "verified": false },
  "tags": ["demo", "review"],
  "limit": 5
}
```

`account` contains an object. `tags` contains an array of two strings. `limit` is a number. `false` is a boolean; `"false"` would be text. A missing property, an explicit `null` (no value), and an empty string are different states. What each is allowed to mean depends on the consuming application's schema and validation.

YAML means “YAML Ain’t Markup Language.” It serializes data into text; `.yml` and `.yaml` are common extensions. Its basic structures are mappings, sequences and scalars.[2]

```yaml
account:
  name: "Example Co"
  verified: false
tags:
  - "demo"
  - "review"
limit: 5
```

This represents the same data as the JSON above. Colons separate keys and values; indentation nests the account fields; dashes introduce list items. Use spaces for indentation, not tabs, and align sibling fields. Two spaces is a convention, not a universal requirement. Quote text that could be interpreted as another type. `#` starts a comment outside quoted text in the appropriate separated position.[2]

YAML syntax does not tell you which settings an application accepts. A parser reads the structure; a schema or application validator checks permitted fields and values. Successful parsing does not establish correct behavior.

## 4. Configuration can direct execution

A configuration file supplies settings to a tool. YAML itself does not execute shell commands. GitHub Actions interprets a workflow's fields and can run commands specified by `run`.[3]

Read this simplified workflow; do not install it to complete the lesson:

```yaml
name: Reading practice
on: workflow_dispatch
permissions: {}
jobs:
  explain:
    runs-on: ubuntu-latest
    steps:
      - name: Print a teaching message
        run: echo "Hello, Builder"
```

GitHub Actions supplies the meaning: `on` selects a manual trigger, `jobs` groups work, `runs-on` selects a runner, and `steps` lists operations. This workflow requests no repository token permissions. The shell command prints a message. Running workflows can consume runner time; no run is necessary for this reading exercise.

For any configuration, ask: **Which tool reads it? What triggers it? What commands, permissions, network calls or spending can result?** A valid file is not automatically an authorized or safe workflow. Keep real secrets out of examples, screenshots and commits.

## Practice: inspect, predict, explain

Use only the snippets above and the fictional fragment below. Write a five-line reading note:

1. Classify the TypeScript, JSON and workflow files by purpose.
2. Predict `labelAccount("Example Co", false)` and explain the branch.
3. Identify the type of `tags`, `limit` and `verified` in JSON.
4. Repair this YAML so both properties belong to `account`:

```yaml
account:
  name: "Example Co"
verified: false
```

5. Explain why `run: echo "Hello, Builder"` has an effect only when the consuming workflow tool runs it.

### Answer key and feedback

1. TypeScript is executable program source (typically transformed to JavaScript); JSON is structured information; the workflow is configuration interpreted by GitHub Actions.
2. `"Needs review"`, because `!false` is true and that return exits the function. If you predicted the company name, trace which return is reached first.
3. Array of strings, number, boolean. Quoting the number or boolean changes the type to text.
4. Indent `verified` two spaces to align with `name`. The original is valid YAML but puts `verified` at the root. Valid syntax can still describe the wrong structure.
5. YAML stores a string; GitHub Actions gives `run` its command meaning and invokes a shell.

**Progress:** reading the guide is Reviewed; writing your note is Practiced; the catalog's question checks one distinction only. The written exercise is self-reviewed and not automatically graded or saved. None of these is a certification of programming ability.

## Optional pocket glossary

| Term | Plain-language definition |
| --- | --- |
| Source code / syntax | Program text / the grammar used to write it |
| Value / type | A piece of information / its category, such as text or number |
| Variable / constant | A named binding; `let` can be reassigned, `const` cannot, though an object it refers to can still change |
| Function / parameter / argument | Reusable operation / named input / actual value passed in |
| Object / array | Named properties / ordered collection |
| Condition / loop | Choice based on an expression / repeated work |
| Import / export / module | Bring definitions in / make them available / a unit of reusable code |
| Comment | Explanation normally ignored by a language's execution rules; syntax varies by language |
| JSX / component / props / state | UI syntax extension / reusable UI unit / inputs to that unit / information React tracks between renders |
| Runtime / build | Environment executing code / preparation or transformation for use |
| Compiler / interpreter | Tool transforming code / tool executing program instructions; implementations may combine approaches |
| Library / framework | Reusable functionality / structure and conventions for building an application |
| Dependency / package manager | Code your project relies on / tool installing and resolving packages |
| Terminal / shell / command | Text interface / command interpreter / instruction given to it |
| Environment variable | Named process setting; it may contain a secret but is not inherently secret |
| Parser / schema / validation | Reads syntax / defines expected shape / checks a value against requirements |
| API / HTTP / request / response | Interface between systems / web communication protocol / message sent / reply returned |
| Async / promise / await | Work that can finish later / representation of eventual completion / pause in an async function until settlement |
| Error / log / test | Reported failure / recorded event or message / check of expected behavior |
| Git / commit / branch / diff / PR | Version-control tool / recorded snapshot / line of development / changes / proposal for review |
| CI / deployment | Automated integration checks / making a version available in an environment |

## Next steps and sources

Continue with [Programming Foundations](/ai-academy/programming), then [Git Workflow Essentials](/ai-academy/version-control). Read [package registries and lockfiles](../../lib/ai-academy.ts) through the Academy catalog. HTTP, runtime validation and debugging need their own deeper lessons; this introduction does not complete them.

1. [MDN: Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) — JSON syntax and data structures; checked 2026-10-12.
2. [YAML 1.2.2 specification](https://yaml.org/spec/1.2.2/) — mappings, sequences, scalars and indentation; checked 2026-10-12. Parser versions and schemas can affect implicit typing.
3. [GitHub Actions workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) — workflow fields and execution; checked 2026-10-12. Recheck if teaching specific runner behavior.
4. [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), [Python tutorial](https://docs.python.org/3/tutorial/controlflow.html), [React learning guide](https://react.dev/learn), and [PostgreSQL SELECT](https://www.postgresql.org/docs/current/sql-select.html) — further language references.
