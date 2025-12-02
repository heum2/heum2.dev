import { config } from "config";
import { ProjectsList } from "src/components/layout/ProjectsList";

export const metadata = {
  title: "Projects | heum2.dev",
  description: "프로젝트 포트폴리오",
  openGraph: {
    title: "Projects | heum2.dev",
    description: "프로젝트 포트폴리오",
    url: `${config.link}/projects`,
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-black dark:text-gray-100">
          Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          지금까지 진행한 프로젝트들을 소개합니다
        </p>
      </div>
      <ProjectsList />
    </div>
  );
}
