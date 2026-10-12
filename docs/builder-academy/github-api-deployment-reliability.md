# Builder Academy — When a deploy fails before the build

**Track:** Builder · **Level:** Beginner · **Time:** 12 minutes  
**Status:** Lesson source for the existing Academy card `github-deployment-reliability`.  
**Evidence checked:** 2026-10-12

## What you'll learn

A merged pull request is not a production release. A failed test and a failed deployment can happen on the same commit and still be different problems. This lesson uses one portfolio incident to show how a GitHub secondary rate limit stops Vercel before the build, and how to tell that apart from a source-validation failure.

## The two failures on 12 October 2026

Merge commit `8c37fc10dfa1e028dabc84b6c958f351103662cb` is the merge of pull request #93 onto `main`.

| Record | What it showed | Class |
| --- | --- | --- |
| GitHub Actions unit tests | Failed in `lib/shadcn-setup.test.ts`: public pages are not supposed to adopt installed shadcn primitives, and `app/work/page.tsx` did. Lint, the production build, the dependency audit, Trivy, and Semgrep succeeded. | Source validation |
| Vercel deployment `dpl_2qxLe6YHSCLZgm2L9snuiy13vGAJ` | `ERROR` with `git_info_fail` about four seconds after creation. Source was Git. Target was production. The deployment owned no aliases. | Git provider / API rate limit |
| Vercel deployment `dpl_6SDZdBmNNbw1GxawQqDFKvcjUv26` | `READY` for commit `7486b46706880137672ab606aa72a6f99664d964`. It owned `www.byjoyaing.com`, `byjoyaing.com`, and the project `.vercel.app` aliases. `https://www.byjoyaing.com/` returned HTTP 200. | Last healthy production |

An earlier production deployment the same day, `dpl_A1aAUxhoCnvfFghy1psgWPSRPS5G` for commit `afe883df6fa1c41907380dc5f77b28dd0d421f46`, failed the same way and also owned no aliases.

The events log that would quote GitHub's response body was not readable in the review session. The platform code `git_info_fail` means Vercel could not retrieve the Git commit before the build. That is the place a GitHub HTTP 403 secondary rate-limit response shows up. Read the deployment log before you quote the provider's exact sentence.

Pull request #94 tracks the carousel test separately. Do not treat that test change as a deployment fix.

## Secondary rate limits

GitHub has a primary quota, often counted per hour for authenticated requests, and a secondary limit that reacts to bursts. The secondary limit can return **403 or 429 while `x-ratelimit-remaining` is still above zero**.

When that happens:

1. Stop. More requests, including repeated Vercel deployments, make the limit worse.
2. If the response has `retry-after`, wait that many seconds.
3. If `x-ratelimit-remaining` is `0`, wait until `x-ratelimit-reset`.
4. Otherwise wait at least one minute, then back off. Cap the number of attempts.
5. Do not retry a 401, a permissions 403 such as "Resource not accessible by integration", or a 404. Those are not rate limits.

Official rules: [REST API best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api) and [rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api). Checked 2026-10-12.

## What does not fix a Git fetch failure

- A cache inside the Next.js app. The failure happens before the app builds.
- A green unit test. That only says the tests that ran passed.
- Redeploying in a loop. Each attempt asks GitHub for the same commit again.
- Disconnecting the Git integration without evidence that the connection itself is wrong.

An ignored build step can skip a later build after Git data is already available. It does not run if Vercel cannot fetch the commit.

## Try it

1. Copy the two evidence rows above into your own notes.
2. Name the SHA that still owned production, and the SHA that was intended but not deployed.
3. Write the next action that you would not take.
4. Classify a fictional follow-up: Semgrep fails, and Vercel never starts. Which classes apply, and which one is absent?

## Check yourself

A production deployment failed with `git_info_fail`, and unit tests failed on the same commit. The right conclusion is that these are different failures. The Git fetch never built, and the previous READY deployment can still own production. Fixing the test does not deploy the commit, and immediate repeated deploys can extend the rate limit.

## References

- [GitHub — Best practices for using the REST API](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api)
- [GitHub — Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [Vercel — ignoreCommand](https://vercel.com/docs/project-configuration/vercel-json#ignorecommand)
- [Portfolio release check](../operations/deploy-verify-recover.md)
