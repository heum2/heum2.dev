import { defineDocumentType, makeSource } from "contentlayer/source-files";
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
  filePathPattern: `**/*.md`,
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
      resolve: post => `/${post._raw.flattenedPath}`,
    },
    readingTime: {
      type: "string",
      resolve: doc => Math.ceil(readingTime(doc.body.raw).minutes),
    },
    toc: {
      type: "json",
      resolve: async doc => {
        const regulrExp = /\n(?<flag>#{2,6})\s+(?<content>.+)/g;
        const slgger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;

            return {
              level: flag?.length === 2 ? "two" : "three",
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

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  markdown: {
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
