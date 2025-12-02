import Link from "next/link";
import { AiOutlineGlobal } from "@react-icons/all-files/ai/AiOutlineGlobal";
import { AiOutlineGithub } from "@react-icons/all-files/ai/AiOutlineGithub";

interface ProjectLinksProps {
  projectUrl?: string;
  githubUrl?: string;
}

export function ProjectLinks({ projectUrl, githubUrl }: ProjectLinksProps) {
  if (!projectUrl && !githubUrl) return null;

  return (
    <div className="mt-8 flex gap-4 flex-wrap">
      {projectUrl && (
        <Link
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <AiOutlineGlobal size={20} />
          프로젝트 보기
        </Link>
      )}
      {githubUrl && (
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
        >
          <AiOutlineGithub size={20} />
          GitHub
        </Link>
      )}
    </div>
  );
}
