import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { AiOutlineCalendar } from "@react-icons/all-files/ai/AiOutlineCalendar";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { notFound } from "next/navigation";
import Script from "next/script";
import Image from "next/image";

import Giscus from "src/components/comments";
import { Tag } from "src/components/tags";
import { MobileTocBanner, PostFooter, TocBanner } from "src/components/layout";
import MDXContent from "src/components/mdx";

import { config } from "config";

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
    return {
      title: "포스트를 찾을 수 없습니다",
      description: "요청하신 포스트를 찾을 수 없습니다.",
    };
  }

  // 절대 URL로 OG 이미지 경로 설정 및 URL 인코딩
  const ogImagePath = post.thumbnailUrl
    ? `/images/${post.thumbnailUrl}`
    : `/images/profile.jpg`;

  // URL 인코딩 적용 (공백이나 특수문자가 있을 경우 대비)
  const encodedImagePath = encodeURI(ogImagePath);
  const ogImageUrl = `${config.link}${encodedImagePath}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${config.link}/posts${post.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${config.link}/posts${post.slug}`,
    },
  };
};

type Props = {
  params: {
    slugs: string[];
  };
};

const PostLayout = ({ params }: Props) => {
  const slug = `/${[...params.slugs].join("/")}`;
  const post = allPosts.find(post => post.slug === slug);
  const postIndex = allPosts.findIndex(post => post.slug === slug);

  if (!post || postIndex === -1) {
    return notFound();
  }

  const navigatePosts = () => {
    const sortedPosts = allPosts.sort((a, b) =>
      compareDesc(new Date(a.date), new Date(b.date))
    );
    const currentIndex = sortedPosts.findIndex(post => post.slug === slug);

    return {
      prevPost:
        currentIndex < sortedPosts.length - 1
          ? sortedPosts[currentIndex + 1]
          : undefined,
      nextPost: currentIndex > 0 ? sortedPosts[currentIndex - 1] : undefined,
    };
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: config.profile.name,
      url: config.link,
    },
    publisher: {
      "@type": "Organization",
      name: config.blog.title,
      logo: {
        "@type": "ImageObject",
        url: `${config.link}/images/profile.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${config.link}/posts${post.slug}`,
    },
    keywords: post.tags.join(", "),
    image: post.thumbnailUrl
      ? `${config.link}${encodeURI(`/images/${post.thumbnailUrl}`)}`
      : `${config.link}/images/profile.jpg`,
  };

  return (
    <>
      <Script
        id="post-ld+json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative xl:flex gap-4">
        <div className="m-auto max-w-4xl w-full">
          <article className="bg-white dark:bg-zinc-700 rounded-3xl py-12 px-4 md:px-8 shadow-md">
            <div className="mb-8 text-center">
              <h1 className="break-keep text-3xl font-extrabold tracking-tight mx-auto mb-2 max-w-6xl text-center">
                {post.title}
              </h1>
              {post.series && (
                <h2 className="text-sm font-medium underline underline-offset-4 sm:text-base">
                  {post.series}
                </h2>
              )}
              <div className="flex items-center justify-center gap-2 mt-4 mb-2 text-xs text-gray-600 dark:text-gray-100">
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

            {post.thumbnailUrl && (
              <div className="mb-8 flex justify-center">
                <div className="relative w-full max-w-3xl h-auto rounded-lg overflow-hidden pt-[56.25%] supports-[aspect-ratio]:aspect-video">
                  <Image
                    src={`/images/${post.thumbnailUrl}`}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={`/images/${post.thumbnailUrl}`}
                  />
                </div>
              </div>
            )}

            <div className="block xl:hidden">
              <MobileTocBanner value={post.toc} />
            </div>

            <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 break-keep break-words prose dark:prose-invert max-w-6xl mx-auto">
              <MDXContent code={post.body.code} />
            </div>
            <div className="mt-10 space-y-8 lg:mt-14">
              <div className="overflow-x-auto common-no-scroll-bar">
                <ul className="flex gap-2 mb-4 whitespace-nowrap">
                  {post.tags.map(item => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </ul>
              </div>
              <hr />
            </div>

            <PostFooter
              prevPost={navigatePosts().prevPost}
              nextPost={navigatePosts().nextPost}
            />

            <Giscus />
          </article>
        </div>

        <div className="ml-auto">
          <div className="sticky top-[81px] hidden xl:block min-w-[240px] max-w-[260px] self-start">
            <TocBanner value={post.toc} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLayout;
