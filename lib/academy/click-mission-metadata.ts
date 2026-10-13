import { lessons } from "../ai-academy.ts";
import {
  availabilityLabels,
  academyResources,
  getLessonGuidance,
} from "./lesson-guidance.ts";
import { clickMission } from "./click-mission.ts";

/** Projection of the shared Academy registry, never a second metadata catalog. */
export function getClickMissionMetadata() {
  const lesson = lessons.find((item) => item.slug === clickMission.lessonId);
  const guidance = getLessonGuidance(clickMission.lessonId);
  const resource = academyResources.find(
    (item) => item.id === clickMission.activityId,
  );
  if (!lesson || !guidance || !resource)
    throw new Error("Follow one click requires registered Academy metadata");
  return {
    lessonTitle: lesson.title,
    missionTitle: resource.title,
    availabilityLabel: availabilityLabels[resource.availability],
    prerequisites: guidance.prerequisites.map((id) => {
      const prerequisite = lessons.find((item) => item.slug === id);
      if (!prerequisite) throw new Error(`Unknown Academy prerequisite: ${id}`);
      return prerequisite.title;
    }),
  };
}
