import { aboutPage } from "./about/editorial.ts";

/** Public, deliberately curated interests. Never sourced from the private Joy Index.
 * The sentences live in content/about/page.json. This module only projects them.
 * Keep "creative" where the sentence is about a creative project or music.
 * A travel interest needs its own approved sentence before it is added to that record.
 */
export const beyondWorkIntro = aboutPage.beyondIntro;
export const personalInterests = aboutPage.interests;
export const personalValues = aboutPage.values;
