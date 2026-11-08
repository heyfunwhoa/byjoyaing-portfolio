import { BookOpen, FlaskConical, CircleHelp } from "lucide-react";

/** In-page navigation, not a completion indicator or a gated stepper. */
export function LessonOutline() {
  return (
    <nav
      aria-label="In this lesson"
      className="my-6 border-y border-border py-3"
    >
      <ol className="flex flex-wrap gap-2">
        {[
          { id: "lesson-read", label: "Read", icon: BookOpen },
          { id: "lesson-practice", label: "Practice", icon: FlaskConical },
          { id: "lesson-check", label: "Check", icon: CircleHelp },
        ].map(({ id, label, icon: Icon }, index) => (
          <li key={id} className="min-w-0 flex-1">
            <a
              href={`#${id}`}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-background px-3 py-2 text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Icon size={16} aria-hidden="true" />
              <span>
                {index + 1}. {label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
