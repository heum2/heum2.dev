import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Script from "next/script";

import MDXContent from "src/components/mdx";
import { ImageGallery, FeatureList, ProjectLinks, ProjectThumbnail } from "src/components/projects";
import { config } from "config";

export const generateStaticParams = async () =>
  allProjects.map(project => ({
    slugs: project.slug.split('/').filter(Boolean)
  }));

export const generateMetadata = ({ params }: { params: { slugs: string[] } }) => {
  const slug = `/${params.slugs.join('/')}`;
  const project = allProjects.find(p => p.slug === slug);

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다",
      description: "요청하신 프로젝트를 찾을 수 없습니다.",
    };
  }

  const ogImageUrl = `${config.link}/images/${project.thumbnailUrl}`;

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${config.link}/projects${project.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${config.link}/projects${project.slug}`,
    },
  };
};

type Props = {
  params: {
    slugs: string[];
  };
};

export default function ProjectDetailPage({ params }: Props) {
  const slug = `/${params.slugs.join('/')}`;
  const project = allProjects.find(p => p.slug === slug);

  if (!project) {
    return notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    dateCreated: project.startDate,
    author: {
      "@type": "Person",
      name: config.profile.name,
      url: config.link,
    },
  };

  return (
    <>
      <Script
        id="project-ld+json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto bg-white dark:bg-zinc-700 rounded-3xl py-12 px-4 md:px-8 shadow-md">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold mb-2 text-black dark:text-gray-100">
            {project.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {project.description}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>
              {format(parseISO(project.startDate), 'yyyy.MM')} - {format(parseISO(project.endDate), 'yyyy.MM')}
            </span>
            <span>({project.duration})</span>
          </div>
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {project.techStack.map(tech => (
              <span
                key={tech}
                className="bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-lg text-sm text-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {project.thumbnailUrl && (
          <ProjectThumbnail
            src={`/images/${project.thumbnailUrl}`}
            alt={project.title}
          />
        )}

        <div className="prose dark:prose-invert max-w-none [&>*]:mb-3 [&>*:last-child]:mb-0 break-keep break-words">
          <MDXContent code={project.body.code} />
        </div>

        <FeatureList features={project.features} />
        <ImageGallery images={project.images} />
        <ProjectLinks projectUrl={project.projectUrl} githubUrl={project.githubUrl} />
      </article>
    </>
  );
}
