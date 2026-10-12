import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  accessLabels,
  relationshipsFor,
  type MapPerson,
  type MapRelationship,
} from "@/lib/stakeholder-map";

export function StakeholderDetail({
  person,
  people,
  relationships,
  showNextStep = false,
}: {
  person: MapPerson;
  people: readonly MapPerson[];
  relationships: readonly MapRelationship[];
  showNextStep?: boolean;
}) {
  const connections = relationshipsFor(relationships, person.id);
  return (
    <Card aria-live="polite" aria-atomic="true" className="h-fit min-w-0">
      <CardHeader>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          Selected stakeholder
        </p>
        <h3 className="mt-1 text-xl font-semibold">{person.role}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-medium">Priority</dt>
            <dd className="mt-1 leading-6 text-muted">{person.priority}</dd>
          </div>
          <div>
            <dt className="font-medium">Access</dt>
            <dd className="mt-1 text-muted">{accessLabels[person.access]}</dd>
          </div>
          <div>
            <dt className="font-medium">Evidence</dt>
            <dd className="mt-1 text-xs leading-5 text-muted">
              {person.evidence}
            </dd>
          </div>
        </dl>
        {showNextStep ? (
          <div className="border-t border-border pt-3">
            <h4 className="text-sm font-semibold">Next conversation</h4>
            <p className="mt-1 text-sm leading-6 text-muted">
              {person.nextStep}.
            </p>
          </div>
        ) : null}
        <div className="border-t border-border pt-3">
          <h4 className="text-sm font-semibold">Relationship paths</h4>
          {connections.length ? (
            <ul className="mt-2 space-y-3">
              {connections.map((edge) => {
                const other = people.find(
                  (item) =>
                    item.id === (edge.from === person.id ? edge.to : edge.from),
                );
                return (
                  <li key={edge.id} className="text-xs leading-5">
                    <p className="font-medium">
                      {edge.label} · {other?.role}
                    </p>
                    <p className="text-muted">
                      {edge.status === "validated"
                        ? "Validated relationship"
                        : "Hypothesis"}{" "}
                      — {edge.evidence}
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-2 text-xs text-muted">
              No relationship paths recorded. This does not establish that none
              exist.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
