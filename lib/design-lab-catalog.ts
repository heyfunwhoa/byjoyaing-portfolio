import { toLabProject, sortLabProjects, type LabProject } from "./design-lab.ts";
import { kindBySlug } from "./portfolio-registry.ts";
import { directoryProjects } from "./project-directory.ts";

export function labProjects(): LabProject[] {
  return sortLabProjects(
    directoryProjects.map((project) => {
      const kind = kindBySlug[project.slug];
      if (!kind) {
        throw new Error(`Missing kind for ${project.slug}`);
      }
      return toLabProject({ ...project, kind });
    }),
  );
}
