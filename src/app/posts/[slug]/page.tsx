import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import Link from "next/link";

import Utterances from "src/components/comments";
import { Tag } from "src/components/tags";

export const generateStaticParams = async () =>
  allPosts.map(post => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(post => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(post => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <article className="m-auto max-w-4xl bg-white dark:bg-zinc-700 rounded-3xl py-12 px-6 shadow-md ">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl mx-auto mb-2 max-w-6xl text-center">
          {post.title}
        </h1>
        {post.series && (
          <Link
            href={`/series/${post.series}`}
            className="text-sm font-medium underline underline-offset-4 sm:text-base"
          >
            {post.series}
          </Link>
        )}
        <div className="flex items-center justify-center gap-2 mt-1 mb-2 text-xs text-gray-600 dark:text-gray-100">
          <time className="flex items-center" dateTime={post.date}>
            <AiOutlineCalendar className="mr-1" />
            {format(parseISO(post.date), "yy.MM.d")}
          </time>
          <time
            className="flex items-center"
            dateTime={post.readingTime.minutes}
          >
            <AiOutlineClockCircle className="mr-1" />
            {Math.ceil(post.readingTime.minutes)}분
          </time>
        </div>
        <hr className="border-1 w-full transition-all mt-4" />
      </div>
      <div
        className="[&>*]:mb-3 [&>*:last-child]:mb-0 break-keep prose dark:prose-invert max-w-6xl mx-auto"
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
      <Utterances />
    </article>
  );
};

export default PostLayout;
