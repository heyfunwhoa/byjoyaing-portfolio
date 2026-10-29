import { aboutPage } from "./about/editorial.ts";

/** Public, deliberately curated interests. Never sourced from the private Joy Index.
 * The sentences live in content/about/page.json. This module only projects them.
 * Keep "creative" where the sentence is about a creative project or music.
 * Travel is included at Kristen's request; do not invent destinations or experiences.
 */
export const beyondWorkIntro = aboutPage.beyondIntro;
export const personalInterests = aboutPage.interests;
export const personalValues = aboutPage.values;
