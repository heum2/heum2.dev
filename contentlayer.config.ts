import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import remarkBreaks from "remark-breaks";
import rehypeExternalLinks from "rehype-external-links";
import GithubSlugger from "github-slugger";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.{md,mdx}`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    series: { type: "string" },
    thumbnailUrl: { type: "string" },
    category: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: post => `/${post._raw.flattenedPath.replace('posts/', '')}`,
    },
    readingTime: {
      type: "string",
      resolve: doc => Math.ceil(readingTime(doc.body.raw).minutes),
    },
    toc: {
      type: "json",
      resolve: async doc => {
        const regulrExp = /\n(#{2,6})\s+(.+)/g;
        const slgger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(
          match => {
            const flag = match[1];
            const content = match[2];

            return {
              level: flag.length === 2 ? "two" : "three",
              text: content,
              slug: content ? slgger.slug(content) : undefined,
            };
          }
        );

        return headings;
      },
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    thumbnailUrl: { type: "string", required: true },
    startDate: { type: "date", required: true },
    endDate: { type: "date", required: true },
    techStack: { type: "list", of: { type: "string" }, required: true },
    projectUrl: { type: "string" },
    githubUrl: { type: "string" },
    images: { type: "list", of: { type: "string" } },
    features: { type: "list", of: { type: "string" } },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: project => `/${project._raw.flattenedPath.replace('projects/', '')}`,
    },
    duration: {
      type: "string",
      resolve: project => {
        const start = new Date(project.startDate);
        const end = new Date(project.endDate);
        const months = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
        return `${months}개월`;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: ".",
  documentTypes: [Post, Project],
  mdx: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
            ariaLabel: "anchor",
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener noreferrer"],
        },
      ],
      rehypeAccessibleEmojis,
    ],
  },
});
