import type { Pool } from "pg";
import {
  validLesson,
  type LearningChange,
  type LearningState,
} from "./policy.ts";

export function learningStore(pool: Pick<Pool, "query">) {
  return {
    async read(userId: string): Promise<LearningState> {
      const [rows, cursor] = await Promise.all([
        pool.query(
          'SELECT slug, saved, reviewed, updated_at AS "updatedAt" FROM academy_learning WHERE user_id = $1 ORDER BY updated_at DESC, slug',
          [userId],
        ),
        pool.query(
          "SELECT last_lesson FROM academy_learner WHERE user_id = $1",
          [userId],
        ),
      ]);
      const last = cursor.rows[0]?.last_lesson;
      return {
        records: rows.rows
          .filter((row) => validLesson(row.slug))
          .map((row) => ({
            ...row,
            updatedAt: new Date(row.updatedAt).toISOString(),
          })),
        lastLesson: validLesson(last) ? last : null,
      };
    },
    async change(userId: string, change: LearningChange) {
      if (change.action === "resume") {
        await pool.query(
          "INSERT INTO academy_learner (user_id, last_lesson) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET last_lesson = EXCLUDED.last_lesson",
          [userId, change.slug],
        );
      } else {
        // Identifier is selected from this closed constant set, never request text.
        const column = change.action === "save" ? "saved" : "reviewed";
        await pool.query(
          `INSERT INTO academy_learning (user_id, slug, ${column}) VALUES ($1, $2, $3) ON CONFLICT (user_id, slug) DO UPDATE SET ${column} = EXCLUDED.${column}, updated_at = now()`,
          [userId, change.slug, change.value],
        );
      }
    },
    async clear(userId: string) {
      // One statement makes reset atomic across bookmark/review and cursor tables.
      await pool.query(
        "WITH cleared AS (DELETE FROM academy_learning WHERE user_id = $1) DELETE FROM academy_learner WHERE user_id = $1",
        [userId],
      );
    },
  };
}
