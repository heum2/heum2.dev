import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import Link from "next/link";

import Utterances from "src/components/comments";
import { Tag } from "src/components/tags";
import { PostFooter, TocBanner } from "src/components/layout";

import { parseToc } from "src/libs";
import { notFound } from "next/navigation";

export const generateStaticParams = async () =>
  allPosts.map(post => ({ slug: post.slug }));

export const generateMetadata = ({
  params,
}: {
  params: { slugs: string[] };
}) => {
  const { slugs } = params;

  const slug = `/${[...slugs].join("/")}`;
  const post = allPosts.find(post => post.slug === slug);

  if (!post) {
    notFound();
  }

  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slugs: string[] } }) => {
  const { slugs } = params;
  const slug = `/${[...slugs].join("/")}`;
  const post = allPosts.find(post => post.slug === slug);
  const postIndex = allPosts.findIndex(post => post.slug === slug);

  if (!post || postIndex === -1) {
    notFound();
  }

  const tableOfContents = parseToc(post.body.raw);

  const postFooterProps = {
    prevPost: allPosts.at(postIndex + 1) ?? null,
    nextPost: allPosts.at(postIndex - 1) ?? null,
  };

  return (
    <div className="relative lg:flex gap-4">
      <article className="m-auto max-w-4xl w-full bg-white dark:bg-zinc-700 rounded-3xl py-12 px-4 md:px-8 shadow-md ">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl mx-auto mb-2 max-w-6xl text-center">
            {post.title}
          </h1>
          {post.series && (
            <Link
              href={`/series/${post.series}`}
              className="text-sm font-medium underline underline-offset-4 sm:text-base"
            >
              <h2>{post.series}</h2>
            </Link>
          )}
          <div className="flex items-center justify-center gap-2 mt-1 mb-2 text-xs text-gray-600 dark:text-gray-100">
            <time className="flex items-center" dateTime={post.date}>
              <AiOutlineCalendar className="mr-1" />
              {format(parseISO(post.date), "yy.MM.d")}
            </time>
            <time className="flex items-center" dateTime={post.readingTime}>
              <AiOutlineClockCircle className="mr-1" />
              {post.readingTime}분
            </time>
          </div>
          <hr className="border-1 w-full transition-all mt-4" />
        </div>

        <div
          className="[&>*]:mb-3 [&>*:last-child]:mb-0 break-keep break-words prose dark:prose-invert max-w-6xl mx-auto"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
        <div className="mt-10 space-y-8 lg:mt-14">
          <ul className="flex gap-2 mb-4">
            {post.tags.map(item => (
              <Tag key={item}>{item}</Tag>
            ))}
          </ul>
          <hr />
        </div>

        <PostFooter
          prevPost={postFooterProps.prevPost}
          nextPost={postFooterProps.nextPost}
        />

        <Utterances />
      </article>
      <div className="ml-auto">
        <div className="sticky top-[81px] hidden lg:block min-w-[240px] max-w-[260px] self-start">
          <TocBanner value={tableOfContents} />
        </div>
      </div>
    </div>
  );
};

export default PostLayout;
