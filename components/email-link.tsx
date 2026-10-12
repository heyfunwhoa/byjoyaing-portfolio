import { Mail } from "@/components/icons/mail";
import { PUBLIC_CONTACT_MAILTO } from "@/lib/portfolio/public-contact";

/** Accessible, reusable icon link. Hiding visible text does not hide the mailto address from bots. */
export function EmailLink({ placement = "contact" }: { placement?: "contact" | "footer" }) {
  return (
    <a
      href={PUBLIC_CONTACT_MAILTO}
      aria-label="Email Kristen Joy Aing (opens your email app)"
      title="Email me"
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-foreground transition-[border-color,background-color,transform,color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-card hover:text-accent ${placement === "contact" ? "size-12 bg-card" : ""}`}
    >
      <Mail size={20} className="size-5" />
    </a>
  );
}
