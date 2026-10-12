export type MapAccess = "unknown" | "developing" | "engaged";
export type MapGroup = "business" | "technical" | "approval";
export type MapPerson = {
  id: string;
  role: string;
  group: MapGroup;
  priority: string;
  access: MapAccess;
  evidence: string;
  nextStep: string;
};
export type MapRelationship = {
  id: string;
  from: string;
  to: string;
  label: string;
  status: "hypothesis" | "validated";
  evidence: string;
};
export const mapGroups: { id: MapGroup; label: string }[] = [
  { id: "business", label: "Business decision" },
  { id: "technical", label: "Technical evaluation" },
  { id: "approval", label: "Approval process" },
];
export const accessLabels: Record<MapAccess, string> = {
  unknown: "No validated access",
  developing: "Developing relationship",
  engaged: "Engaged",
};

/** Fail closed on invalid graph structure; no orphan or self relationships. */
export function validateStakeholderMap(
  people: readonly MapPerson[],
  relationships: readonly MapRelationship[],
) {
  const ids = new Set<string>();
  for (const person of people) {
    if (!person.id.trim() || ids.has(person.id))
      return "Stakeholders need unique identifiers.";
    if (!mapGroups.some((group) => group.id === person.group))
      return "Unknown stakeholder group.";
    if (!Object.hasOwn(accessLabels, person.access))
      return "Unknown relationship access state.";
    if (!person.role.trim() || !person.evidence.trim())
      return "Stakeholders need a role and evidence context.";
    ids.add(person.id);
  }
  const edges = new Set<string>();
  for (const relationship of relationships) {
    if (!relationship.id.trim() || edges.has(relationship.id))
      return "Relationships need unique identifiers.";
    if (
      !ids.has(relationship.from) ||
      !ids.has(relationship.to) ||
      relationship.from === relationship.to
    )
      return "Relationship endpoints must reference two different stakeholders.";
    if (!relationship.label.trim() || !relationship.evidence.trim())
      return "Relationships need a label and evidence context.";
    if (
      relationship.status !== "hypothesis" &&
      relationship.status !== "validated"
    )
      return "Unknown relationship evidence status.";
    edges.add(relationship.id);
  }
  return null;
}

export function relationshipsFor(
  relationships: readonly MapRelationship[],
  id: string,
) {
  return relationships.filter((edge) => edge.from === id || edge.to === id);
}
