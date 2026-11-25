/** Employer examples use Kristen's published career account. Publisher links support product context only. */
export const limaCharlieRecord = {
  id: "limacharlie",
  company: "LimaCharlie",
  kind: "Independent research",
  title: "Building a brief a reader can check",
  context:
    "On October 10, 2026, I saved LimaCharlie’s public product overview. It describes open APIs, centralized telemetry, and detection and response.",
  action:
    "I kept the source and capture date with the brief. I separated the capabilities the vendor describes from my interpretation of who might value them.",
  outcome:
    "The published brief lets a reader inspect the source, the evidence behind the interpretation, and the questions the page leaves open.",
  source: {
    label: "LimaCharlie’s product documentation",
    href: "https://docs.limacharlie.io/1-getting-started/what-is-limacharlie/",
  },
  artifact: { label: "Read the saved research brief", href: "/account-signal" },
} as const;

export const accountRecords = [
  {
    id: "rapid7",
    company: "Rapid7",
    kind: "Field work",
    title: "Making threat intelligence usable across a sales team",
    context:
      "Rapid7 acquired IntSights in July 2021. The announcement explains what external threat intelligence added to its security portfolio.",
    action:
      "As a strategic AE, I sold threat intelligence and wrote playbooks the broader portfolio team could use in those conversations.",
    outcome:
      "The portfolio team used the playbooks, and I served as its field resource for threat intelligence.",
    source: {
      label: "Rapid7’s acquisition announcement",
      href: "https://www.rapid7.com/about/press-releases/rapid7-acquires-intsights/",
    },
    artifact: {
      label: "My sales experience",
      href: "/experience#career-details",
    },
  },
  {
    id: "truffle",
    company: "Truffle Security",
    kind: "Field work",
    title: "Turning recurring buyer questions into discovery guides",
    context:
      "Selling secrets detection put me in conversations with security, engineering and executive buyers. The same questions came up during discovery and technical evaluations.",
    action:
      "I turned recurring questions into discovery templates and proof-of-concept resources. I co-wrote setup guides with solution architects, created product training for new hires and brought field feedback to Product and Marketing.",
    outcome:
      "The sales team adopted the discovery and evaluation materials. I helped onboard people across sales, solutions architecture and customer success.",
    source: {
      label: "TruffleHog product overview",
      href: "https://trufflesecurity.com/trufflehog",
    },
    artifact: { label: "My enablement work", href: "/work#people-leadership" },
  },
  limaCharlieRecord,
] as const;
