"use client";

import { motion } from "framer-motion";
import { Project } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps extends Project {
  index?: number;
}

export function ProjectCard({ index = 0, ...project }: ProjectCardProps) {
  const isFirstProject = index === 0;

  return (
    <Link href={`/projects${project.slug}`} prefetch={isFirstProject}>
      <motion.article
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-700 hover:shadow-lg transition-shadow cursor-pointer"
      >
        {project.thumbnailUrl && (
          <div className="relative w-full pb-[62.5%] bg-gray-200 dark:bg-zinc-700">
            <Image
              src={`/images/${project.thumbnailUrl}`}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              draggable={false}
              quality={100}
              priority={isFirstProject}
              className="object-cover block w-full h-full"
            />
          </div>
        )}

        <div className="p-4">
          <div className="flex items-start mb-2">
            <h2 className="text-lg md:text-xl font-medium break-keep text-black dark:text-gray-100">
              {project.title}
            </h2>
            <span className="bg-sky-200 ml-auto opacity-90 px-2 py-1 text-sm rounded-lg whitespace-nowrap dark:bg-sky-400">
              {project.duration}
            </span>
          </div>

          <div className="mb-3">
            <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
              {project.description}
            </p>
          </div>

          <ul className="flex gap-2 flex-wrap">
            {project.techStack.map(tech => (
              <li
                key={tech}
                className="text-xs text-gray-600 dark:text-gray-300 font-normal rounded-lg bg-gray-200 dark:bg-gray-600 px-2 py-1"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </Link>
  );
}
