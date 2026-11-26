// Teaching data for the install-method chooser in the package-registries lesson.
// Commands are quoted from TruffleHog's README and Homebrew's docs (checked 2026-11-26).
// The chooser recommends a starting point for a situation; it does not detect the
// learner's machine, run commands, or record progress.

export type InstallSourceId = "trufflehog-readme" | "homebrew-install" | "homebrew-faq" | "secret-scan-hook";

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
  sources: readonly InstallSourceId[];
};

export const installMethods: readonly InstallMethod[] = [
  {
    id: "homebrew",
    name: "Homebrew",
    command: "brew install trufflehog",
    updates: "brew upgrade updates the tools you installed with Homebrew.",
    hookFinds: { answer: "Yes", detail: "once Homebrew is set up in your shell." },
    trust: "You trust Homebrew's package for the tool. Lower upkeep than copying files around by hand.",
    sources: ["trufflehog-readme", "homebrew-install", "homebrew-faq"],
  },
  {
    id: "script",
    name: "Install script",
    command:
      "curl -sSfL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh | sh -s -- -b /usr/local/bin",
    updates: "Run the script again to get a newer version.",
    hookFinds: { answer: "Yes", detail: "if the folder after -b is on your PATH." },
    trust: "Piping into sh runs code from the internet on your machine. Read the script first. TruffleHog also documents a variant that verifies a signed checksum; it needs cosign.",
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
    sources: ["trufflehog-readme"],
  },
  {
    id: "docker",
    name: "Docker",
    command:
      'docker run --rm -it -v "$PWD:/pwd" trufflesecurity/trufflehog:latest github --repo https://github.com/trufflesecurity/test_keys',
    updates: "The :latest tag pulls a newer image when one is published.",
    hookFinds: { answer: "No", detail: "it runs inside a container, so command -v trufflehog finds nothing on your machine." },
    trust: "Nothing is installed on your machine. Docker must be running. This README example scans TruffleHog's public test repository.",
    sources: ["trufflehog-readme", "secret-scan-hook"],
  },
  {
    id: "source",
    name: "Build from source",
    command: "git clone https://github.com/trufflesecurity/trufflehog.git\ncd trufflehog; go install",
    updates: "Pull the latest code and build again.",
    hookFinds: { answer: "Yes", detail: "if Go's install folder is on your PATH." },
    trust: "Needs the Go toolchain. Best when you are changing TruffleHog itself.",
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

export function findInstallMethod(id: InstallMethodId): InstallMethod {
  const method = installMethods.find((item) => item.id === id);
  if (!method) throw new Error(`Unknown install method: ${id}`);
  return method;
}
