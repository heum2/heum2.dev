import React from "react";
import Link from "next/link";
import { Post } from "contentlayer/generated";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  prevPost: Pick<Post, "title" | "slug"> | null;
  nextPost: Pick<Post, "title" | "slug"> | null;
};

export function PostFooter({ prevPost, nextPost }: Props): JSX.Element {
  return (
    <div className="text-secondary -mx-4 mt-2 flex items-center text-xs font-semibold sm:mx-0 sm:text-base">
      {prevPost && (
        <Link
          href={`/posts/${prevPost.slug}`}
          className="group gap-3 px-4 py-2 pl-0 flex items-center"
        >
          <MdKeyboardArrowLeft />
          <span>{prevPost.title}</span>
        </Link>
      )}
      {nextPost && (
        <Link
          href={`/posts/${nextPost.slug}`}
          className="group ml-auto gap-3 px-4 py-2 pr-0 text-right flex items-center"
        >
          <span>{nextPost.title}</span>
          <MdKeyboardArrowRight />
        </Link>
      )}
    </div>
  );
}
