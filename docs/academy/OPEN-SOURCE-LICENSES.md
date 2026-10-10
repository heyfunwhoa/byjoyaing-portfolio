# Builder Academy: Working With Open-Source Projects and Licenses

**Status:** Planned educational lesson, not an interactive deployed module. **Reviewed:** 2026-10-10.
**Learning goal:** Explain the difference between viewing, cloning, forking, modifying and contributing to an upstream open-source project; recognize license obligations before copying, modifying or distributing code.

## Core vocabulary
- **Repository:** versioned files and development history.
- **Upstream:** the original source project. Example: [trufflesecurity/trufflehog](https://github.com/trufflesecurity/trufflehog).
- **Clone:** local copy of a Git repository, with history and remotes.
- **Fork:** a server-hosted repository derived from upstream, often under your account.
- **Branch:** an isolated line of commits; a branch isn't a fork.
- **origin:** Git remote normally pointing to your clone's default source (often your fork).
- **upstream:** conventional name for the remote you track to pull changes from the original project.
- **Pull request:** proposal to merge reviewed code changes. A contribution may require tests, issue references and a Contributor License Agreement.
- **License:** permissions, conditions and limitations for use, modification and redistribution; public source without a license is *not* automatically open source.

## Walkthrough: TruffleHog without prematurely forking
1. Explore the official [repository](https://github.com/trufflesecurity/trufflehog) and [contribution guide](https://github.com/trufflesecurity/trufflehog/blob/main/CONTRIBUTING.md).
2. Use a particular upstream commit SHA to track metadata in the independent [Detector Coverage Atlas](https://github.com/heyfunwhoa/detector-coverage-atlas). Reading metadata does not imply implementing or owning upstream detectors.
3. If you later intend to modify upstream Go detectors, fork and clone:
   ```sh
   git clone https://github.com/YOUR_USERNAME/trufflehog.git
   cd trufflehog
   git remote add upstream https://github.com/trufflesecurity/trufflehog.git
   git fetch upstream
   git switch -c feature/detector-improvement upstream/main
   ```
4. Read license, CONTRIBUTING and tests before editing. Use synthetic credentials only.
5. Implement the smallest change and run project-specific checks; never submit actual secrets.
6. Sync as needed: `git fetch upstream`, understand merge vs rebase, resolve conflicts, and open a focused PR back to upstream.
7. TruffleHog v3 states **AGPL-3.0**; historical pre-v3 sources were **GPL-2.0**. Its README says a **CLA** is required for accepted contributions. Verify the exact version and its LICENSE/CONTRIBUTING before use. [Official README](https://github.com/trufflesecurity/trufflehog/blob/main/README.md).

## Licensing families (beginner-friendly)
| License | Family | Typical permission | Key obligations or caveats |
| --- | --- | --- | --- |
| MIT | Permissive | Use, modify and distribute, including commercially | Keep copyright and license notice in distributions |
| BSD-2-Clause | Permissive | Similar to MIT | Retain required notices/disclaimers |
| BSD-3-Clause | Permissive | Similar to BSD-2 | Also limits implied endorsement |
| Apache-2.0 | Permissive with express patent terms | Use, modify and distribute | Preserve notices, state modifications, address NOTICE requirements; includes patent license/termination provisions |
| MPL-2.0 | File-level copyleft | Combine with differently licensed files subject to rules | Modified MPL-covered files remain available under MPL when distributed |
| LGPL (2.1/3.0) | Limited copyleft | Often used for libraries in larger applications | Distribution, replacement/linking and modification rules vary by version and configuration |
| GPL-2.0 / GPL-3.0 | Strong copyleft | Use and modify; distribute derivatives under applicable GPL terms | Source and corresponding code obligations on distribution; versions differ and compatibility matters |
| AGPL-3.0 | Network copyleft | Similar to GPLv3 with extra network-access provision | Modified covered software offered for network interaction can trigger an obligation to offer corresponding source; exact scope requires case-specific review |
| CC0 / Unlicense | Public-domain dedication-like | Broad reuse with few restrictions | Warranty/patent/jurisdiction considerations vary |
| BSL / source-available restrictions | **Not necessarily open source** | Read or limited use under terms | Restrictions on use or competition can make source-available different from OSI-approved open source |

Primary references: [OSI approved licenses](https://opensource.org/licenses), [MIT](https://opensource.org/license/mit), [Apache-2.0](https://opensource.org/license/apache-2-0), [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html), [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.en.html), [MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/). Consult actual license text for legal decisions; this lesson is education, not legal advice.

## Critical distinction: Atlas versus a fork
- **Atlas:** independently developed application that reads public upstream detector metadata and links to original code. The Atlas implementation and upstream TruffleHog detector engine are different assets.
- **Fork:** copy of upstream TruffleHog repository developed with its original licensed code. Its license obligations follow that code.
- **Embedding or copying upstream code into Atlas:** distinct decision; requires license and compatibility review. Simply being a separate GitHub repository doesn't avoid licensing requirements.
- Metadata/facts, copied documentation, extracted code, trademarks and bundled binaries raise different intellectual-property questions. Preserve attribution, provenance and source commit pins.

## Interactive labs to implement *after portfolio launch*
1. **Clone vs fork quiz:** decide whether reading source, proposing detector fixes, or testing changes needs a fork.
2. **Remotes simulator:** map `origin` and `upstream`, fetch, branch, rebase/merge and resolve conflicts without destructive operations.
3. **License chooser:** match fictional scenarios to permission/obligation questions; no simplistic universal 'compatible' verdict.
4. **Contribution challenge:** read CONTRIBUTING, draft a detector test using synthetic fixtures, prepare scoped PR and CLA awareness.
5. **Dependency/license detective:** inspect a fictional dependency tree for mixed licenses and distribution/network use triggers.

## Knowledge check
**Question 1.** Does a public GitHub repository without a LICENSE automatically permit commercial copying? **No.**
**Question 2.** Is Apache-2.0 the same as AGPL-3.0? **No;** one is permissive with express patent terms; the other has copyleft and network-use conditions.
**Question 3.** Do you need a TruffleHog fork to parse public detector names at a pinned commit? **Not necessarily.**
**Question 4.** Can an independent Atlas reuse entire upstream Go source files without checking license? **No.**

## Attribution and publishing checklist
- Say 'independent / unofficial' and identify source of upstream metadata.
- Link upstream repository, exact commit (where applicable), relevant license, and your original repo.
- Clarify what's running today versus future work; do not describe the site sample as the separate ingestion app.
- Don't imply endorsement or affiliation with upstream maintainers.
- Before redistribution, network hosting of modified AGPL software or commercial reuse, perform a fact-specific legal/license review.
