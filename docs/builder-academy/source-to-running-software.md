# From source code to running software

Builder Academy companion · Beginner · Fictional example

**Start with** [From idea to verified release](idea-to-verified-release.md) and [Reading Code and YAML](reading-code-and-yaml.md).  
**Goal.** Given a source file, a build output and a deployment record, explain what each one is and what you would check to know which version is running.

## Follow one change

A fictional security team uses a web app to request an alert handoff review. The form currently loses its error message when the request fails. The product requirement is to show an understandable error and keep the entered information available for a retry. Sketch the success and failure states before editing the code.

- **UI and UX.** The UI is what the user sees and operates. The UX includes how easily they can recover and finish the task. A visible, keyboard-accessible error and a clear retry path support that goal.
- **Frontend.** Browser code renders the form and sends a request. It shows pending, success and error states. See [Frontend Building Blocks](frontend-building-blocks.md).
- **Backend.** Server code receives the request, checks the input and caller’s access, writes a record when appropriate and returns a response. The frontend uses that response to update the screen.
- **Systems design.** Start by mapping the browser, server and data store. Identify where a failure can happen and who owns it. Add a queue only if the work needs to outlast the request or needs controlled retry behavior.

```mermaid
sequenceDiagram
  participant B as Browser
  participant A as App server
  participant D as Data store
  B->>A: Submit review request
  A->>A: Validate input and access
  A->>D: Save accepted request
  D-->>A: Write result
  A-->>B: Success or error
```

## What the build produces

At the computing level, bits represent values and bytes group bits. A file contains bytes interpreted according to its format. Source files are typically text in an encoding such as UTF-8. An operating system manages running processes and resources such as memory and files. The shell is one way to start a program.

| Item | Example | What happens to it |
| --- | --- | --- |
| **Source** | `ReviewForm.tsx` | A person edits it. Build tools transform it for the target runtime. |
| **Browser bundle** | A generated JavaScript file | The browser loads and executes it with its JavaScript runtime. |
| **Native executable** | A fictional Go utility built with `go build` | The operating system can start it on the target OS and CPU architecture. |
| **Build artifact** | A bundle, executable, package or release archive produced by a build | CI can retain or publish it so another step can test or deploy that version. |
| **Container image** | A versioned package with the app, required runtime files and startup configuration | A registry can store it. A container runtime uses the image to start a container. |
| **Running container** | A running instance of the image | The service executes with runtime configuration, resource limits and an isolated process environment. |

A build can produce several artifacts. Compiled code can become a native executable or bytecode depending on the toolchain. A web build can generate browser assets and server output. Use the name of the actual output when asking someone to review or deploy it.

## Where Docker, IaC and CI/CD fit

A **Dockerfile** describes steps used to build an image. An **image** packages what the workload needs to start. A **registry** stores images. A **container** is an instance created from an image. A team can run several containers from one image, and each instance may have a different lifetime or runtime configuration.

A managed platform may take source and build artifacts without asking you to write a Dockerfile. A container image is useful when you need a repeatable package that travels between compatible environments. Start with the hosting approach that fits the application and its operational needs. Multiple services or environments can justify stronger deployment coordination.

**Infrastructure as Code** describes resources such as networks, compute, storage and access configuration. Reviewing a proposed plan helps you see changes before applying them. An image packages the application. Infrastructure provides somewhere to run it.

**CI** checks the change and may produce a build artifact. **CD** moves a selected version toward an environment. A release makes behavior available to its intended users. Compare the deployed revision with the one you reviewed, then exercise the actual user flow. [First Deployment Settings](first-deployment-settings.md)

## Try it on paper

A pull request fixes the form. CI reports success and publishes image digest `demo-new`. The test environment still lists `demo-old`. The digest names are fictional placeholders. Identify the source change, what CI produced, what the environment says is running and one check you would perform next.

### Check 1

Which evidence would tell you the fixed form is available in the test environment?

- **A.** The pull request has a green test check.
- **B.** The deployment record identifies the reviewed version and a walkthrough confirms that the form retains its input on failure.
- **C.** The registry contains the new image.

**Feedback.** A shows the check passed under test conditions. C shows a package exists and can be selected for deployment. B checks the deployed version and the behavior the user needs. In the exercise, verify the mismatch between the two deployment records before attributing any runtime behavior to the fix.

### Check 2

The team needs another instance of the same service. What does it start from?

- **A.** The existing reviewed image, with the appropriate runtime configuration.
- **B.** The Dockerfile as though it were a running service.
- **C.** An IaC plan as though it contained the app code.

**Feedback.** A reuses the package that can start an instance. B describes how to build that package. C describes proposed resource changes. Review capacity and configuration before adding the instance.

## Apply it independently

Pick one public-safe portfolio change. Write down the user outcome, the source changed, the artifact produced, the runtime or host, and the evidence you would inspect after release. If you can explain why each item matters and identify a missing check, you have demonstrated the reasoning for this exercise.

Continue with [First Deployment Settings](first-deployment-settings.md), then the [IaC practice scenario](../academy/SDLC-ENABLEMENT-CROSSWALK.md#sample-pilot-iac-through-the-full-sdlc).

Sources reviewed November 6, 2026. [MDN client and server overview](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview) · [Go build and install](https://go.dev/doc/tutorial/compile-install) · [Docker overview](https://docs.docker.com/get-started/docker-overview/) · [Terraform plan](https://developer.hashicorp.com/terraform/cli/commands/plan)
