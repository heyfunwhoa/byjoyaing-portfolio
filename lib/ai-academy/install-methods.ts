// Teaching data for the install-method chooser in the package-registries lesson.
// Commands are quoted from TruffleHog's README and Homebrew's docs (checked 2026-11-26).
// The chooser recommends a starting point for a situation; it does not detect the
// learner's machine, run commands, or record progress.

export type InstallSourceId =
  | "trufflehog-readme"
  | "homebrew-install"
  | "homebrew-faq"
  | "homebrew-post-install"
  | "trufflehog-verify"
  | "trufflehog-action"
  | "trufflehog-precommit"
  | "portfolio-ci"
  | "secret-scan-hook";

export type InstallSource = { id: InstallSourceId; label: string; url: string };

export const installSources: Record<InstallSourceId, InstallSource> = {
  "trufflehog-readme": {
    id: "trufflehog-readme",
    label: "TruffleHog README: Installation",
    url: "https://github.com/trufflesecurity/trufflehog#floppy_disk-installation",
  },
  "homebrew-install": {
    id: "homebrew-install",
    label: "Homebrew docs: Installation",
    url: "https://docs.brew.sh/Installation",
  },
  "homebrew-faq": {
    id: "homebrew-faq",
    label: "Homebrew FAQ: updating packages",
    url: "https://docs.brew.sh/FAQ#how-do-i-update-my-local-packages",
  },
  "homebrew-post-install": {
    id: "homebrew-post-install",
    label: "Homebrew docs: post-installation steps",
    url: "https://docs.brew.sh/Installation#post-installation-steps",
  },
  "trufflehog-verify": {
    id: "trufflehog-verify",
    label: "TruffleHog README: Verifying the artifacts",
    url: "https://github.com/trufflesecurity/trufflehog#closed_lock_with_key-verifying-the-artifacts",
  },
  "trufflehog-action": {
    id: "trufflehog-action",
    label: "TruffleHog README: GitHub Action",
    url: "https://github.com/trufflesecurity/trufflehog#octocat-trufflehog-github-action",
  },
  "trufflehog-precommit": {
    id: "trufflehog-precommit",
    label: "TruffleHog pre-commit hook guide",
    url: "https://github.com/trufflesecurity/trufflehog/blob/main/PreCommit.md",
  },
  "portfolio-ci": {
    id: "portfolio-ci",
    label: "Portfolio CI: .github/workflows/security-scans.yml",
    url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/.github/workflows/security-scans.yml",
  },
  "secret-scan-hook": {
    id: "secret-scan-hook",
    label: "Portfolio pre-commit hook: scripts/secret-scan.sh",
    url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/scripts/secret-scan.sh",
  },
};

export type InstallMethodId = "homebrew" | "script" | "release" | "docker" | "source";

export type InstallMethod = {
  id: InstallMethodId;
  name: string;
  /** Exact commands from the source, one per line; null when the step is manual. */
  command: string | null;
  /** Shown when there is no command to copy. */
  manualStep?: string;
  updates: string;
  hookFinds: { answer: "Yes" | "No"; detail: string };
  trust: string;
  /** What this option is, in everyday words. */
  plain: string;
  /** Plain-language help shown under the panel for first-time Terminal users. */
  beginnerNote?: string;
  /** Each part of the command (or each manual step) in plain words, in order. */
  walkthrough: readonly { code?: string; text: string }[];
  /** What the learner should expect to see while it runs. */
  youllSee: string;
  sources: readonly InstallSourceId[];
};

export const installMethods: readonly InstallMethod[] = [
  {
    id: "homebrew",
    name: "Homebrew",
    plain: "Homebrew is like an app store you use from Terminal. One command downloads the tool and puts it where Terminal can find it, and brew upgrade updates it later. If you don't have Homebrew yet, you install it once.",
    command: "brew install trufflehog",
    updates: "brew upgrade updates the tools you installed with Homebrew.",
    hookFinds: { answer: "Yes", detail: "once Homebrew is set up in your shell." },
    trust: "Homebrew's package of the tool, built from the tool's own release. The easiest route to keep updated.",
    beginnerNote: "No brew? If Terminal says brew isn't found, install Homebrew first from brew.sh. When it finishes, it prints a few setup lines; run those too, or brew still won't be found. Then come back and run the command below.",
    walkthrough: [
      { code: "brew", text: "Homebrew, the program that does the installing." },
      { code: "install trufflehog", text: "Download TruffleHog and put it in Homebrew's folder, which your shell already searches." },
    ],
    youllSee: "Some progress lines while it downloads, then your prompt comes back. The first install can take a minute.",
    sources: ["trufflehog-readme", "homebrew-install", "homebrew-faq", "homebrew-post-install"],
  },
  {
    id: "script",
    name: "Install script",
    plain: "TruffleHog provides a small script that downloads and installs the tool for you. One command fetches it and runs it straight away. Quick, but you're running code from the internet, so read it first. Handy on computers without Homebrew, like a Linux server.",
    command:
      "curl -sSfL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh | sh -s -- -b /usr/local/bin",
    updates: "Run the script again to get a newer version.",
    hookFinds: { answer: "Yes", detail: "if the folder after -b is on your PATH." },
    trust: "Piping into sh runs code from the internet on your machine. Read the script first. TruffleHog also documents a variant that verifies a signed checksum; it needs cosign.",
    walkthrough: [
      { text: "Optional but wise: open the script's web address in a browser and read it before you run it." },
      { code: "curl -sSfL <address>", text: "curl downloads a file. The letters mean: s = quiet, S = still show errors, f = stop if the download fails, L = follow redirects." },
      { code: "| sh", text: "The pipe | hands the downloaded script straight to sh, which runs it. This is the moment you trust the script." },
      { code: "-s --", text: "Tells sh to run the script it was handed, and that everything after -- is for the script, not for sh." },
      { code: "-b /usr/local/bin", text: "The script's own option: install the program into /usr/local/bin, a folder most Macs already search." },
    ],
    youllSee: "A few download messages, then your prompt comes back. If you see \"Permission denied\", that folder needs admin rights; pick a folder you own that's on your PATH instead.",
    sources: ["trufflehog-readme"],
  },
  {
    id: "release",
    name: "Release download",
    plain: "You do it by hand: download the program from TruffleHog's Releases page on GitHub, unpack it, and move it into a folder Terminal searches. No installer, and updates are by hand too.",
    command: null,
    manualStep: "Download and unpack the file for your system from github.com/trufflesecurity/trufflehog/releases.",
    updates: "Download the newer release by hand.",
    hookFinds: { answer: "Yes", detail: "after you move it into a folder on your PATH." },
    trust: "You get the program straight from the project's releases page. Check you are on the real repository.",
    walkthrough: [
      { text: "Open github.com/trufflesecurity/trufflehog/releases and pick the newest release." },
      { text: "Download the file for your computer. darwin means macOS, arm64 means an Apple chip, and amd64 means an Intel chip." },
      { text: "Double-click the download to unpack it. Inside is the trufflehog program." },
      { text: "Move trufflehog into a folder on your PATH, then run the check in Step 3." },
    ],
    youllSee: "Nothing runs in Terminal until the last step. The check in Step 3 tells you whether the move worked.",
    sources: ["trufflehog-readme"],
  },
  {
    id: "docker",
    name: "Docker",
    plain: "Docker runs programs inside a sealed box called a container. TruffleHog runs in the box, does its scan, and the box is deleted. Nothing stays on your computer, which suits automated checks on a server.",
    command:
      'docker run --rm -it -v "$PWD:/pwd" trufflesecurity/trufflehog:latest github --repo https://github.com/trufflesecurity/test_keys',
    updates: "The :latest tag pulls a newer image when one is published.",
    hookFinds: { answer: "No", detail: "not a hook like this portfolio's, which looks for the trufflehog command on your computer. (TruffleHog's pre-commit guide also shows a hook written to run Docker instead.)" },
    trust: "Docker's copy of TruffleHog's official image. Nothing is installed on your machine, and Docker must already be running.",
    beginnerNote: "This command is TruffleHog's own example. It scans their public test repository to show the tool working. It does not install anything on your computer, which is why this portfolio's hook still can't find it.",
    walkthrough: [
      { code: "docker run", text: "Start a container: a sealed box that runs a program." },
      { code: "--rm", text: "Delete the container when it finishes, so nothing is left behind." },
      { code: "-it", text: "Connect it to your Terminal so you can see the output and stop it with Control-C." },
      { code: "-v \"$PWD:/pwd\"", text: "Share the folder you're in ($PWD) with the container, where it appears as /pwd. This example doesn't use it; you'd need it to scan your own files." },
      { code: "trufflesecurity/trufflehog:latest", text: "Which program to run: TruffleHog's official image, newest version." },
      { code: "github --repo <address>", text: "What TruffleHog should do: scan this public GitHub repository." },
    ],
    youllSee: "The first time, Docker downloads the image. Then TruffleHog prints what it finds in the test repository, and the container disappears.",
    sources: ["trufflehog-readme", "secret-scan-hook"],
  },
  {
    id: "source",
    name: "Build from source",
    plain: "You download TruffleHog's actual code and build the program yourself with Go, the language it's written in. Only worth it if you want to change TruffleHog or test something unreleased.",
    command: "git clone https://github.com/trufflesecurity/trufflehog.git\ncd trufflehog; go install",
    updates: "Pull the latest code and build again.",
    hookFinds: { answer: "Yes", detail: "if Go's install folder is on your PATH." },
    trust: "Needs the Go toolchain. Best when you are changing TruffleHog itself.",
    walkthrough: [
      { text: "You need Go installed first (a recent version; TruffleHog currently asks for Go 1.26)." },
      { code: "git clone <address>", text: "Copy TruffleHog's code onto your computer, into a new folder named trufflehog." },
      { code: "cd trufflehog", text: "Move into that folder." },
      { code: "go install", text: "Build the program and put it in Go's bin folder, usually ~/go/bin. That folder must be on your PATH for the check to work." },
    ],
    youllSee: "Very little output while it builds, which can take a few minutes. Your prompt comes back when it's done.",
    sources: ["trufflehog-readme"],
  },
];

export type InstallSituationId = "hook" | "ci" | "server" | "contribute";

export type InstallSituation = {
  id: InstallSituationId;
  label: string;
  question: string;
  method: InstallMethodId;
  why: string;
};

export const installSituations: readonly InstallSituation[] = [
  {
    id: "hook",
    label: "My git hook (Mac)",
    question: "A pre-commit hook on your Mac needs the trufflehog command.",
    method: "homebrew",
    why: "The hook checks command -v trufflehog. Homebrew puts the command where your shell looks and keeps it current with one command.",
  },
  {
    id: "ci",
    label: "A CI job",
    question: "A pipeline should scan without installing anything permanently.",
    method: "docker",
    why: "A container runs the scan and leaves nothing behind. That is a strength in CI and the reason it will not satisfy a local hook. On GitHub, TruffleHog's own GitHub Action is simpler still; see Other options to note.",
  },
  {
    id: "server",
    label: "A machine without Homebrew",
    question: "A Linux box or shared server needs the command, and Homebrew is not available.",
    method: "script",
    why: "One command installs the binary into a folder you choose. Read the script, or use the checksum-verified variant.",
  },
  {
    id: "contribute",
    label: "Changing the tool",
    question: "You want to modify TruffleHog or test an unreleased change.",
    method: "source",
    why: "Building from source is the only route that runs your own changes.",
  },
];

export const verifyCommands = ["command -v trufflehog", "trufflehog --version"] as const;

/** What a working result looks like, in plain words. */
export const verifyExpected =
  "The first line prints where the program lives, such as /opt/homebrew/bin/trufflehog on a Mac with an Apple chip. The second prints a version number.";

/** Next steps when the check prints nothing, in the order to try them. */
export const verifyIfNothing: readonly { text: string; link?: { source: InstallSourceId; text: string } }[] = [
  { text: "Close Terminal, open a new window and run the check again. A new window reloads the list of folders your shell searches." },
  {
    text: "If brew itself isn't found, Homebrew's setup step was skipped. Follow the one line Homebrew asks you to add.",
    link: { source: "homebrew-post-install", text: "Homebrew's post-installation steps" },
  },
  { text: "If you used Docker, nothing printing is expected: the tool runs in a container, not on your computer." },
];

export type GlossaryTerm = { term: string; meaning: string };

/** Plain definitions for words the lab uses. */
export const installGlossary: readonly GlossaryTerm[] = [
  { term: "Terminal and shell", meaning: "Terminal is the Mac app where you type commands. The shell is the program inside it that runs them; recent Macs use one called zsh." },
  { term: "Command", meaning: "A program you run by typing its name, such as trufflehog or brew." },
  { term: "PATH", meaning: "The list of folders your shell searches when you type a command. If a program isn't in one of them, the shell says it can't find it." },
  { term: "Package manager", meaning: "A tool that downloads programs, puts them where your shell can find them, and updates them. Homebrew is one for Mac and Linux." },
  { term: "Git hook", meaning: "A small script Git runs by itself at a set moment, such as right before each commit." },
  { term: "CI", meaning: "Continuous integration: checks that run on a server, here GitHub Actions, every time code is pushed." },
  { term: "Container (Docker)", meaning: "A sealed box that runs a program without installing it on your computer." },
  { term: "Checksum and cosign", meaning: "A checksum is a fingerprint of a download. cosign checks that the fingerprint was signed by the project, so you know the file wasn't swapped." },
];

// Kristen's Detector Atlas keeps an evidence-tagged version of this guide. Its
// commands are copied from TruffleHog's README at the commit Atlas tracks, so
// it is the copy to trust if TruffleHog changes how it installs.
export const atlasInstallGuide = {
  url: "https://detector-coverage-atlas.vercel.app/how-it-works#install",
  label: "Detector Atlas install guide",
  text: "Want every step linked to TruffleHog's own code? The Detector Atlas keeps an evidence-tagged version, with commands copied from TruffleHog's README.",
} as const;

export function findInstallMethod(id: InstallMethodId): InstallMethod {
  const method = installMethods.find((item) => item.id === id);
  if (!method) throw new Error(`Unknown install method: ${id}`);
  return method;
}

export type OtherOption = { title: string; text: string; command?: string; sources: readonly InstallSourceId[] };

/** Documented variations worth knowing, beyond the five main methods. */
export const otherOptions: readonly OtherOption[] = [
  {
    title: "Check the download is genuine",
    text: "Add -v to the install script and it verifies TruffleHog's signed checksum before installing. You need cosign installed first. For a release download, the README walks through the same check by hand.",
    command: "curl -sSfL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh | sh -s -- -v -b /usr/local/bin",
    sources: ["trufflehog-verify"],
  },
  {
    title: "Install a specific version",
    text: "Put a release tag at the end of the install script command to get that exact version instead of the newest. Useful when a team wants everyone on the same version.",
    command: "curl -sSfL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh | sh -s -- -b /usr/local/bin v3.56.0",
    sources: ["trufflehog-readme"],
  },
  {
    title: "GitHub Actions: use TruffleHog's own action",
    text: "On GitHub, a workflow can use TruffleHog's official action instead of installing anything. This portfolio's CI does this, pinned to a specific commit so it doesn't change unexpectedly.",
    command: "uses: trufflesecurity/trufflehog@main",
    sources: ["trufflehog-action", "portfolio-ci"],
  },
  {
    title: "GitLab CI",
    text: "TruffleHog's GitLab example runs the install script inside the job, then runs the scan.",
    sources: ["trufflehog-readme"],
  },
  {
    title: "Docker on an Apple-chip Mac or on Windows",
    text: "The README lists slightly different Docker commands for Apple-chip Macs (add --platform linux/arm64) and for Windows Command Prompt and PowerShell.",
    sources: ["trufflehog-readme"],
  },
  {
    title: "Ready-made pre-commit hooks",
    text: "TruffleHog's pre-commit guide shows three ways to scan before every commit: Git's built-in hooksPath, the pre-commit framework, and Husky for JavaScript projects. It includes a version that runs through Docker.",
    sources: ["trufflehog-precommit"],
  },
];
