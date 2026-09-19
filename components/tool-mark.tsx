import type { ReactNode } from "react";

type ToolId =
  | "salesforce"
  | "linkedin"
  | "slack"
  | "workspace"
  | "sheets"
  | "cursor"
  | "next"
  | "github"
  | "vercel"
  | "aws"
  | "attio"
  | "postgres"
  | "ingest"
  | "resend"
  | "aisdk"
  | "schema";

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className="text-accent"
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <g
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="1.25"
      >
        {children}
      </g>
    </svg>
  );
}

const paths: Record<ToolId, ReactNode> = {
  salesforce: (
    <path d="M3.5 11.5c0-1.6 1.2-2.8 2.7-2.8.2-1.6 1.6-2.7 3.2-2.5 1-.9 2.6-.7 3.3.5 1.4.1 2.5 1.3 2.5 2.7 0 1.7-1.4 3.1-3.2 3.1H6.4c-1.6 0-2.9-1.4-2.9-3Z" />
  ),
  linkedin: (
    <>
      <rect height="12" width="12" x="3" y="3" />
      <path d="M6.5 8v4.5M11 12.5V9.2c0-.7-.6-1.2-1.3-1.2" />
      <path d="M6.5 6.2v.01" />
    </>
  ),
  slack: (
    <>
      <rect height="3.2" width="3.2" x="7.4" y="3.2" />
      <rect height="3.2" width="3.2" x="11.6" y="7.4" />
      <rect height="3.2" width="3.2" x="7.4" y="11.6" />
      <rect height="3.2" width="3.2" x="3.2" y="7.4" />
    </>
  ),
  workspace: (
    <>
      <rect height="12" width="12" x="3" y="3" />
      <path d="M9 3v12M3 9h12" />
    </>
  ),
  sheets: (
    <>
      <rect height="12" width="12" x="3" y="3" />
      <path d="M3 7h12M3 11h12M7 3v12" />
    </>
  ),
  cursor: (
    <>
      <rect height="12" width="12" x="3" y="3" />
      <path d="M6.8 5.8 12 9 6.8 12.2V5.8Z" />
    </>
  ),
  next: (
    <>
      <rect height="12" width="12" x="3" y="3" />
      <path d="M5.8 12.2 12.2 5.8" />
      <path d="M12.2 5.8v6.4" />
    </>
  ),
  github: (
    <>
      <circle cx="9" cy="5.2" r="1.4" />
      <circle cx="5.4" cy="12.4" r="1.4" />
      <circle cx="12.6" cy="12.4" r="1.4" />
      <path d="M9 6.6v2.6M9 9.2 6.4 11.4M9 9.2l2.6 2.2" />
    </>
  ),
  vercel: <path d="M9 4.2 14.4 13.8H3.6L9 4.2Z" />,
  aws: (
    <>
      <path d="M5.2 13.2 9 4.8l3.8 8.4" />
      <path d="M6.6 10.2h4.8" />
    </>
  ),
  attio: (
    <>
      <rect height="7" width="9" x="3" y="3.2" />
      <rect height="7" width="9" x="6" y="7.8" />
    </>
  ),
  postgres: (
    <>
      <ellipse cx="9" cy="5.2" rx="4.4" ry="1.5" />
      <path d="M4.6 5.2v7c0 .9 2 1.6 4.4 1.6s4.4-.7 4.4-1.6v-7" />
    </>
  ),
  ingest: (
    <>
      <path d="M9 3.5v7.2" />
      <path d="M6 8.2 9 11.2 12 8.2" />
      <path d="M4.2 14h9.6" />
    </>
  ),
  resend: (
    <>
      <rect height="9" width="12" x="3" y="4.5" />
      <path d="M3 4.5 9 10l6-5.5" />
    </>
  ),
  aisdk: (
    <>
      <path d="M6.2 4.2c-1.4 0-2.2.8-2.2 2.2v5.2c0 1.4.8 2.2 2.2 2.2" />
      <path d="M11.8 4.2c1.4 0 2.2.8 2.2 2.2v5.2c0 1.4-.8 2.2-2.2 2.2" />
      <path d="M7.4 9h3.2" />
    </>
  ),
  schema: (
    <>
      <rect height="12" width="12" x="3" y="3" />
      <path d="M6 7h6M6 9.5h4M6 12h5" />
    </>
  ),
};

export function ToolMark({ id }: { id: string }) {
  return <Glyph>{paths[id as ToolId] ?? <rect height="12" width="12" x="3" y="3" />}</Glyph>;
}
