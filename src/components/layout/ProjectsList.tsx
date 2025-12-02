"use client";

import { compareDesc } from "date-fns";
import { allProjects } from "contentlayer/generated";
import { ProjectCard } from "src/components/cards/ProjectCard";

export function ProjectsList() {
  const sortedProjects = allProjects.sort((a, b) => {
    if (!a.endDate && !b.endDate) return 0;
    if (!a.endDate) return -1;
    if (!b.endDate) return 1;

    // endDate가 있는 프로젝트는 최신순 정렬
    return compareDesc(new Date(a.endDate), new Date(b.endDate));
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      {sortedProjects.map((project, index) => (
        <ProjectCard key={project.slug} index={index} {...project} />
      ))}
    </div>
  );
}
