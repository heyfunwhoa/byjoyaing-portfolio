# Builder Academy — Package registries and software supply chains

**Audience:** beginner developers. **Lesson route:** `/ai-academy` → Builder → Package registries, npm and lockfiles.

## One-minute explanation

Software projects rarely start from zero. Developers install reusable **packages** such as Next.js or React. A **package registry** is a service that hosts packages and their released versions. The **package manager** is the command-line tool that finds and installs them.

| Concept | Simple analogy | Portfolio example |
| --- | --- | --- |
| Package | A reusable part | `next` |
| Registry | Catalog/warehouse | npm public registry |
| Package manager | Shopping and installation service | `npm` |
| `package.json` | Shopping list and acceptable versions | `"next": "16.4.0"` after reviewed upgrade |
| `package-lock.json` | Exact receipt + dependency tree | Exact installed versions, URLs and integrity digests |
| `node_modules/` | Parts installed locally | Local package files; don't commit this folder |
| CI | Independent quality inspection | GitHub Actions `npm ci`, lint, tests, build, audit |

**npm** is both the name of a package ecosystem and its default CLI. Other ecosystems have distinct registries/managers: Python uses PyPI and pip/uv; Java uses Maven Central and Maven/Gradle; Rust uses crates.io and Cargo; container images commonly use registries such as Docker Hub or GHCR. These aren't interchangeable: an OCI image registry is not an npm registry.

## Direct and transitive dependencies

A *direct dependency* appears in your project's `package.json`, such as Next.js. A *transitive dependency* is installed because a direct package needs it. `sharp` and `source-map-js` are examples reported in the portfolio's October 2026 dependency audit; inspect the current dependency graph before describing precisely which package introduced them.

Version syntax matters:
- `"16.4.0"` = exact direct requirement
- `"^6.27.0"` = compatible releases within the same major version under normal semver rules (subject to version zero conventions)
- Lockfile = actual resolved tree; use it with `npm ci` to reproduce installs.

## What happens during an install?

1. Read `package.json` and (if present) the lockfile.
2. Resolve packages and compatible transitive dependencies.
3. Retrieve package metadata and archives from the configured registry or authorized cache.
4. Verify archive integrity against recorded hashes when available.
5. Install dependencies; some packages may execute lifecycle scripts. Treat install scripts as executable code.
6. Run lint, tests, build and security checks before merge.

A lockfile integrity hash helps detect unexpected archive changes; it **does not guarantee the package is safe**.

## Security: the package supply chain

Common risks include typosquatting (a lookalike package name), account takeover, malicious install scripts, compromised maintainers, old vulnerable versions, dependency confusion between private and public registries, and leaked publish tokens.

Controls for a small portfolio repository:
- Prefer reputable, maintained packages and verify the package source.
- Use the committed lockfile and `npm ci` in CI.
- Review dependency updates and regenerated lockfile diffs; avoid blindly running `npm audit fix --force`.
- Run `npm audit --omit=dev --audit-level=high` for known high/critical production advisories, *and fix or explicitly review failures*.
- Use a secret scanner (TruffleHog) because a dependency audit does not find exposed passwords.
- Keep install/publish tokens out of Git; give automation minimum permissions.
- Prefer pinned reviewed action versions; review third-party GitHub Actions as part of the supply chain.
- A scan's existence is not the same as enforcement. For example, Trivy with `exit-code: 0` reports without failing a build.

## Installing command-line tools: Homebrew and other ways

npm installs packages *into a project*. Command-line tools such as TruffleHog are installed *onto your machine*, so your shell, editor and git hooks can run them. TruffleHog's README lists five ways to do that; the right one depends on who has to find the tool afterwards.

| Way | Command or step | Upkeep | Can a git hook find `trufflehog`? |
| --- | --- | --- | --- |
| Homebrew (macOS, Linux) | `brew install trufflehog` | `brew upgrade` updates installed tools | Yes, once Homebrew is set up in your shell |
| Install script | `curl -sSfL …/scripts/install.sh \| sh -s -- -b /usr/local/bin` | Re-run by hand to update | Yes, if the target folder is on your `PATH` |
| Release download | Download and unpack from GitHub Releases | Manual | Yes, after you move it onto your `PATH` |
| Docker | `docker run … trufflesecurity/trufflehog:latest …` | Pull a newer image | **No.** It runs in a container, so `command -v trufflehog` finds nothing |
| Build from source | `git clone …` then `go install` | Rebuild to update | Yes, but needs the Go toolchain; mostly for contributors |

**Supply-chain note:** piping an install script into `sh` runs code from the internet with your permissions. Read the script first. TruffleHog also documents a variant that verifies a signed checksum; it requires `cosign`. A package manager like Homebrew narrows, but does not remove, the need to trust what you install.

**Portfolio case:** `scripts/secret-scan.sh` runs before each commit. If `command -v trufflehog` finds nothing, it prints a warning and lets the commit through *unscanned*. GitHub Actions still scans each PR, but the local check only protects you if the command is installed on your machine.

Mini lab (your own Mac; no secrets needed):
```bash
command -v trufflehog       # prints a path if installed
brew install trufflehog     # if nothing printed
trufflehog --version
```
Then open `scripts/secret-scan.sh` and explain, in one sentence, why a Docker-only install would still show the "not installed" warning.

## Guided lab — portfolio case

**Scenario:** The portfolio dependency audit detected advisories affecting `next`, `sharp` and `source-map-js`. A dedicated security PR updates the direct Next.js dependency and regenerates the lockfile for transitive fixes.

In a throwaway branch (not directly on `main`), inspect:
```bash
npm ls next sharp source-map-js
npm audit --omit=dev --audit-level=high
npm ci
npm run lint
npm test
npm run build
```

**Questions:**
1. Which dependency is direct? Which are transitive?
2. Why can `npm run build` pass while `npm audit` fails?
3. Why must package and lockfiles change together?
4. Would publishing a package require a registry account and scoped credentials? Where should those credentials live?
5. How do you tell a reported vulnerability from an exploitable use of that vulnerable feature?

**Expected reasoning:** A successful build proves some compatibility, not that software lacks known vulnerabilities. `npm audit` depends on published advisories and can produce findings that require exposure/feature assessment. Fixes must be tested; never paste credentials into logs or commit them.

## Learn more

- [npm registry overview](https://docs.npmjs.com/about-the-public-npm-registry/)
- [npm package lockfile](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)
- [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
- [npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/)
- [OpenSSF best practices](https://openssf.org/)
- [TruffleHog README: Installation](https://github.com/trufflesecurity/trufflehog#floppy_disk-installation) (install methods checked against the README on 2026-11-26)
- [Homebrew: Installation](https://docs.brew.sh/Installation) and [Homebrew FAQ: updating packages](https://docs.brew.sh/FAQ#how-do-i-update-my-local-packages) (checked 2026-11-26)
