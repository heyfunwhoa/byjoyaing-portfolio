import { kindBySlug } from "./portfolio-kind.ts";

export type TrailItem = {
  href?: string;
  label: string;
};

const workCollection = { href: "/work", label: "Work" } as const;
const sideQuestCollection = { href: "/side-quests", label: "Side Quests" } as const;
const fieldNotesCollection = { href: "/field-notes", label: "Field Notes" } as const;

/** Kind, not the /work/ prefix, picks the collection crumb. */
export function workCaseTrail(slug: string, title: string): TrailItem[] {
  const kind = kindBySlug[slug];
  const collection = kind === "work" ? workCollection : kind === "side-quest" ? sideQuestCollection : undefined;
  return [{ href: "/", label: "Home" }, ...(collection ? [collection] : []), { label: title }];
}

export function fieldNoteTrail(title: string): TrailItem[] {
  return [{ href: "/", label: "Home" }, fieldNotesCollection, { label: title }];
}
