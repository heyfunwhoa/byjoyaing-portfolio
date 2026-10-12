import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import {
  exampleMapPeople,
  exampleMapRelationships,
} from "@/lib/stakeholder-map-demo";
import { StakeholderMap, type StakeholderMapProps } from "./stakeholder-map";

function Example({
  people = exampleMapPeople,
  relationships = exampleMapRelationships,
  initialId = "champion",
  emphasizedId,
  showNextStep,
}: Partial<Omit<StakeholderMapProps, "selectedId" | "onSelect">> & {
  initialId?: string;
}) {
  const [selectedId, setSelectedId] = useState(initialId);
  return (
    <div className="max-w-5xl p-5">
      <p className="mb-6 text-sm text-muted">
        Fictional component fixture. No actual buyer relationships or evidence.
      </p>
      <StakeholderMap
        people={people}
        relationships={relationships}
        selectedId={selectedId}
        onSelect={setSelectedId}
        emphasizedId={emphasizedId}
        showNextStep={showNextStep}
      />
    </div>
  );
}
const meta = {
  title: "Patterns/Stakeholder Map",
  component: Example,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Example>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {};
export const AccessGap: Story = {
  args: { initialId: "buyer", emphasizedId: "buyer", showNextStep: true },
};
export const UnknownAccess: Story = { args: { initialId: "engineering" } };
export const Empty: Story = { args: { people: [], relationships: [] } };
export const InvalidRelationship: Story = {
  args: {
    relationships: [{ ...exampleMapRelationships[0], to: "missing-person" }],
  },
};
export const LongLabels: Story = {
  args: {
    people: exampleMapPeople.map((person, i) =>
      i === 0
        ? {
            ...person,
            role: "Security operations and application security champion",
            priority:
              "An unusually long stakeholder priority that must wrap without truncation or horizontal overflow",
          }
        : person,
    ),
  },
};
