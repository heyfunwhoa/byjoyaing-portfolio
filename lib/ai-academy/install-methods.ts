// Teaching data for the install-method chooser in the package-registries lesson.
// Commands are quoted from TruffleHog's README and Homebrew's docs (checked 2026-11-26).
// The chooser recommends a starting point for a situation; it does not detect the
// learner's machine, run commands, or record progress.

export type InstallSourceId =
  | "trufflehog-readme"
  | "homebrew-install"
  | "homebrew-faq"
  | "homebrew-post-install"
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
    command:
      'docker run --rm -it -v "$PWD:/pwd" trufflesecurity/trufflehog:latest github --repo https://github.com/trufflesecurity/test_keys',
    updates: "The :latest tag pulls a newer image when one is published.",
    hookFinds: { answer: "No", detail: "it runs inside a container, so command -v trufflehog finds nothing on your machine." },
    trust: "Docker's copy of TruffleHog's official image. Nothing is installed on your machine, and Docker must already be running.",
    beginnerNote: "This command is TruffleHog's own example. It scans their public test repository to show the tool working. It does not install anything on your computer, which is why a git hook still can't find it.",
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
    why: "A container runs the scan and leaves nothing behind. That is a strength in CI and the reason it will not satisfy a local hook.",
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

export function findInstallMethod(id: InstallMethodId): InstallMethod {
  const method = installMethods.find((item) => item.id === id);
  if (!method) throw new Error(`Unknown install method: ${id}`);
  return method;
}
