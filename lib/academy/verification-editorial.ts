import record from "../../content/academy/lessons/verification.json" with { type: "json" };
import { readLessonEditorial } from "./lesson-editorial.ts";

/** Verification keeps its original entry point. Validation is the shared lesson reader. */
export function readVerificationEditorial(input: unknown) {
  return readLessonEditorial("verification", input);
}

export const verificationEditorial = readVerificationEditorial(record);
