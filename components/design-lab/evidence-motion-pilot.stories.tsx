import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import styles from "./evidence-motion-pilot.module.css";

/**
 * Synthetic, local-only Storybook experiment. Uses native disclosure and
 * CSS for a meaningful state transition. No external motion package or API.
 */
function EvidenceMotionPilot() {
  return (
    <section className={styles.surface} aria-labelledby="evidence-motion-title">
      <p className={styles.eyebrow}>Design Lab / selective motion</p>
      <h2 id="evidence-motion-title" className={styles.heading}>
        Review evidence before choosing an action
      </h2>
      <p className={styles.explanation}>
        Fictional example. The summary stays visible without animation and the
        disclosure never changes review or approval status.
      </p>
      <div className={styles.card}>
        <div className={styles.summary}>
          <span className={styles.label}>Fictional account · Research review</span>
          <strong className={styles.state}>Needs source verification</strong>
        </div>
        <p className={styles.description}>
          A published hiring announcement is a possible research signal, not
          proof of buying intent.
        </p>
        <details className={styles.disclosure}>
          <summary className={styles.trigger}>
            <span>Inspect evidence and limitations</span>
            <span aria-hidden="true" className={styles.chevron}>⌄</span>
          </summary>
          <div className={styles.details}>
            <h3 className={styles.subheading}>What is actually known?</h3>
            <p>The fictional organization posted a security engineering role.</p>
            <h3 className={styles.subheading}>What remains unknown?</h3>
            <p>Budget, project ownership, vendor evaluation, and timeline.</p>
            <p className={styles.note}>
              Reviewer action: verify an original dated source before making a
              GTM recommendation. This preview does not save changes.
            </p>
          </div>
        </details>
      </div>
      <p className={styles.footnote}>
        Native keyboard interaction · visible focus · reduced-motion fallback ·
        no new dependency
      </p>
    </section>
  );
}

const meta = {
  title: "Design Lab/Selective Motion/Evidence Disclosure",
  component: EvidenceMotionPilot,
  parameters: { layout: "padded" },
} satisfies Meta<typeof EvidenceMotionPilot>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
