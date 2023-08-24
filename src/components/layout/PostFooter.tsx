import React from "react";
import Link from "next/link";
import { Post } from "contentlayer/generated";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { config } from "config";

type Props = {
  prevPost: Pick<Post, "title" | "slug"> | null;
  nextPost: Pick<Post, "title" | "slug"> | null;
};

export function PostFooter({ prevPost, nextPost }: Props): JSX.Element {
  return (
    <div>
      <div className="flex w-full items-center justify-center mt-3 sm:mt-0">
        <div className="flex items-center gap-4 sm:gap-6 sm:p-12">
          <div className="w-16 h-16 md:h-24 md:w-24 select-none overflow-hidden rounded-full">
            <div className="relative w-full after:content-[''] after:block after:pb-[100%]">
              <Image
                priority
                className="object-cover"
                src={config.profile.image}
                alt="profile"
                fill
                draggable={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{config.profile.name}</div>
            <div className="text-sm">{config.profile.role}</div>
          </div>
        </div>
      </div>

      <div className="text-secondary  mt-2 flex items-center text-xs font-semibold sm:mx-0 sm:text-base">
        {prevPost && (
          <Link
            href={`/posts/${prevPost.slug}`}
            className="group gap-1 md:gap-3 px-4 py-2 md:pl-0 flex items-center rounded-lg transition-all hover:bg-gray-300"
          >
            <MdKeyboardArrowLeft />
            <span className="break-keep">{prevPost.title}</span>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/posts/${nextPost.slug}`}
            className="group ml-auto gap-1 px-4 py-2 md:pr-0 text-right flex items-center rounded-lg transition-all hover:bg-gray-300"
          >
            <span className="break-keep">{nextPost.title}</span>
            <MdKeyboardArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
}
