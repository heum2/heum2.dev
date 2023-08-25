import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { notFound } from "next/navigation";

import Utterances from "src/components/comments";
import { Tag } from "src/components/tags";
import { MobileTocBanner, PostFooter, TocBanner } from "src/components/layout";

import { parseToc } from "src/libs";

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

  return { title: post.title, description: post.description };
};

const PostLayout = ({ params }: { params: { slugs: string[] } }) => {
  const { slugs } = params;
  const slug = `/${[...slugs].join("/")}`;
  const post = allPosts.find(post => post.slug === slug);
  const postIndex = allPosts.findIndex(post => post.slug === slug);

  if (!post || postIndex === -1) {
    notFound();
  }

  const navigatePosts = () => {
    const posts = allPosts.sort((a, b) =>
      compareDesc(new Date(a.date), new Date(b.date))
    );

    return {
      prevPost: posts[postIndex + 1],
      nextPost: posts[postIndex - 1],
    };
  };

  return (
    <div className="relative xl:flex gap-4">
      <div className="m-auto max-w-4xl w-full">
        <article className="bg-white dark:bg-zinc-700 rounded-3xl py-12 px-4 md:px-8 shadow-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl mx-auto mb-2 max-w-6xl text-center">
              {post.title}
            </h1>
            {post.series && (
              <h2 className="text-sm font-medium underline underline-offset-4 sm:text-base">
                {post.series}
              </h2>
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

          <div className="block xl:hidden">
            <MobileTocBanner value={parseToc(post.body.raw)} />
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
            prevPost={navigatePosts().prevPost}
            nextPost={navigatePosts().nextPost}
          />

          <Utterances />
        </article>
      </div>

      <div className="ml-auto">
        <div className="sticky top-[81px] hidden xl:block min-w-[240px] max-w-[260px] self-start">
          <TocBanner value={parseToc(post.body.raw)} />
        </div>
      </div>
    </div>
  );
};

export default PostLayout;
