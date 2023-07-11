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

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    series: { type: "string", required: false },
    thumbnailUrl: { type: "string" },
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
