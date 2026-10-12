import Image from "next/image";
import { socialProfiles } from "@/lib/portfolio/external-links";

const logos = {
  linkedin: "/logos/social/linkedin.svg",
  github: "/logos/technology/github.svg",
} as const;

type Placement = "header" | "contact" | "footer";

/** Icon-only links retain spoken labels and visible keyboard focus. */
export function SocialLinks({ placement = "contact" }: { placement?: Placement }) {
  return (
    <ul
      aria-label="Social profiles"
      className={`flex items-center gap-2 ${placement === "header" ? "justify-start" : ""}`}
    >
      {socialProfiles.map((profile) => {
        return (
          <li key={profile.id}>
            <a
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${profile.label} profile (opens in a new tab)`}
              title={profile.label}
              className={`group/social inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-foreground transition-[border-color,background-color,transform,color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-card hover:text-accent ${placement === "contact" ? "size-12 bg-card" : ""}`}
            >
              <Image src={logos[profile.id]} alt="" width={20} height={20} unoptimized className="size-5 object-contain" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
