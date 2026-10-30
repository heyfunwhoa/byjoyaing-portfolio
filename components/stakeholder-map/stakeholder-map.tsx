"use client";

import { useId, useMemo } from "react";
import {
  Background,
  Controls,
  Handle,
  Panel,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  mapGroups,
  validateStakeholderMap,
  type MapPerson,
  type MapRelationship,
} from "@/lib/stakeholder-map";
import { StakeholderNode } from "./stakeholder-node";
import { StakeholderDetail } from "./stakeholder-detail";
import styles from "./stakeholder-map-flow.module.css";

type FlowNodeData = {
  person: MapPerson;
  groupLabel: string;
  selected: boolean;
  emphasized: boolean;
  onSelect: (id: string) => void;
};
type StakeholderFlowNode = Node<FlowNodeData, "stakeholder">;
const flowNodeWidth = 224;
const flowNodeHeight = 120;
const flowHandles = [
  {
    id: "top",
    type: "target" as const,
    position: Position.Top,
    x: flowNodeWidth / 2,
    y: 0,
  },
  {
    id: "right",
    type: "source" as const,
    position: Position.Right,
    x: flowNodeWidth,
    y: flowNodeHeight / 2,
  },
  {
    id: "bottom",
    type: "source" as const,
    position: Position.Bottom,
    x: flowNodeWidth / 2,
    y: flowNodeHeight,
  },
  {
    id: "left",
    type: "target" as const,
    position: Position.Left,
    x: 0,
    y: flowNodeHeight / 2,
  },
];

function StakeholderFlowNodeView({
  data,
}: NodeProps<StakeholderFlowNode>) {
  return (
    <div className="nodrag nopan w-56">
      <p className="mb-2 ml-1 text-[11px] font-medium tracking-wide text-muted uppercase">
        {data.groupLabel}
      </p>
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        isConnectable={false}
        className="!border-0 !bg-transparent !opacity-0"
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        isConnectable={false}
        className="!border-0 !bg-transparent !opacity-0"
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        className="!border-0 !bg-transparent !opacity-0"
      />
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        isConnectable={false}
        className="!border-0 !bg-transparent !opacity-0"
      />
      <StakeholderNode
        person={data.person}
        selected={data.selected}
        emphasized={data.emphasized}
        onSelect={data.onSelect}
      />
    </div>
  );
}

const nodeTypes: NodeTypes = { stakeholder: StakeholderFlowNodeView };

export type StakeholderMapProps = {
  people: readonly MapPerson[];
  relationships: readonly MapRelationship[];
  selectedId: string;
  onSelect: (id: string) => void;
  emphasizedId?: string;
  showNextStep?: boolean;
};

/** Read-only, controlled relationship map. Data ownership stays with its caller. */
export function StakeholderMap({
  people,
  relationships,
  selectedId,
  onSelect,
  emphasizedId,
  showNextStep,
}: StakeholderMapProps) {
  const legendId = useId();
  const error = validateStakeholderMap(people, relationships);
  const person = people.find((item) => item.id === selectedId) ?? people[0];

  const nodes = useMemo<StakeholderFlowNode[]>(() => {
    const rowsByGroup = new Map<string, number>();
    return people.map((item) => {
      const groupIndex = mapGroups.findIndex((group) => group.id === item.group);
      const row = rowsByGroup.get(item.group) ?? 0;
      rowsByGroup.set(item.group, row + 1);
      const group = mapGroups[groupIndex];
      return {
        id: item.id,
        type: "stakeholder",
        position: { x: Math.max(0, groupIndex) * 270, y: row * 180 },
        initialWidth: flowNodeWidth,
        initialHeight: flowNodeHeight,
        handles: flowHandles,
        data: {
          person: item,
          groupLabel: group?.label ?? "Stakeholder",
          selected: person?.id === item.id,
          emphasized: emphasizedId === item.id,
          onSelect,
        },
        draggable: false,
        connectable: false,
        selectable: false,
        focusable: false,
      };
    });
  }, [people, person?.id, emphasizedId, onSelect]);

  const edges = useMemo<Edge[]>(() => {
    const groupPositions = new Map(
      mapGroups.map((group, index) => [group.id, index]),
    );
    const peopleById = new Map(people.map((item) => [item.id, item]));

    return relationships.map((relationship) => {
      const from = peopleById.get(relationship.from)!;
      const to = peopleById.get(relationship.to)!;
      const fromGroup = groupPositions.get(from.group) ?? 0;
      const toGroup = groupPositions.get(to.group) ?? 0;
      const sameGroup = from.group === to.group;
      const sourceHandle = sameGroup
        ? "bottom"
        : fromGroup < toGroup
          ? "right"
          : "left";
      const targetHandle = sameGroup
        ? "top"
        : fromGroup < toGroup
          ? "left"
          : "right";
      const selected =
        relationship.from === person?.id || relationship.to === person?.id;

      return {
        id: relationship.id,
        source: relationship.from,
        target: relationship.to,
        sourceHandle,
        targetHandle,
        type: "smoothstep",
        selectable: false,
        focusable: false,
        style: {
          stroke: selected ? "var(--accent)" : "var(--border)",
          strokeWidth: selected ? 2 : 1.5,
          strokeDasharray:
            relationship.status === "hypothesis" ? "6 4" : undefined,
        },
      };
    });
  }, [people, relationships, person?.id]);

  if (error)
    return (
      <p role="status" className="rounded-xl border border-border p-5 text-sm">
        This map cannot be displayed. {error}
      </p>
    );
  if (!person)
    return (
      <p role="status" className="rounded-xl border border-border p-5 text-sm">
        No stakeholders are mapped yet.
      </p>
    );

  return (
    <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(16rem,1fr)]">
      <div className="min-w-0">
        <div
          className="grid min-w-0 gap-5 lg:hidden"
          role="group"
          aria-label="Stakeholder map grouped by role"
          aria-describedby={legendId}
        >
          {mapGroups.map((group) => (
            <section
              key={group.id}
              className="relative min-w-0"
              aria-label={group.label}
            >
              <h3 className="mb-4 text-xs font-medium tracking-wide text-muted uppercase">
                {group.label}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {people
                  .filter((item) => item.group === group.id)
                  .map((item) => (
                    <StakeholderNode
                      key={item.id}
                      person={item}
                      selected={person.id === item.id}
                      emphasized={emphasizedId === item.id}
                      onSelect={onSelect}
                    />
                  ))}
              </div>
            </section>
          ))}
        </div>
        <div
          className={`hidden h-[35rem] min-w-0 overflow-hidden rounded-xl border border-border bg-surface-mist lg:block ${styles.canvas}`}
          role="group"
          aria-label="Interactive stakeholder relationship graph"
          aria-describedby={legendId}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.16 }}
            minZoom={0.45}
            maxZoom={1.6}
            zoomOnScroll={false}
            panOnScroll={false}
            preventScrolling={false}
            zoomOnDoubleClick={false}
            zoomOnPinch
            panOnDrag
            nodesDraggable={false}
            nodesConnectable={false}
            nodesFocusable={false}
            edgesFocusable={false}
            elementsSelectable={false}
            selectNodesOnDrag={false}
            ariaLabelConfig={{
              "controls.ariaLabel": "Stakeholder map controls",
              "controls.zoomIn.ariaLabel": "Zoom in on stakeholder map",
              "controls.zoomOut.ariaLabel": "Zoom out on stakeholder map",
              "controls.fitView.ariaLabel": "Fit stakeholder map to view",
            }}
          >
            <Background gap={18} size={1} color="var(--border)" />
            <Panel position="bottom-left">
              <div
                className={styles.legend}
                role="group"
                aria-label="Relationship map legend"
              >
                <span className={styles.legendItem}>
                  <span
                    className={`${styles.legendLine} ${styles.hypothesis}`}
                    aria-hidden="true"
                  />
                  Hypothesis
                </span>
                <span className={styles.legendItem}>
                  <span
                    className={`${styles.legendLine} ${styles.validated}`}
                    aria-hidden="true"
                  />
                  Validated
                </span>
              </div>
            </Panel>
            <Controls
              showInteractive={false}
              position="bottom-right"
              aria-label="Stakeholder map controls"
            />
          </ReactFlow>
        </div>
        <p id={legendId} className="mt-4 text-xs leading-5 text-muted">
          Dashed = hypothesis; solid = validated relationship. These are
          relationship paths, not reporting lines. Select a stakeholder button
          to review its evidence. On larger screens, drag the empty background
          to pan, pinch or use the + / − controls to zoom, and use Fit view to
          see the whole map again. Scrolling moves the page. The map is read-only.
        </p>
      </div>
      <StakeholderDetail
        person={person}
        people={people}
        relationships={relationships}
        showNextStep={showNextStep}
      />
    </div>
  );
}
