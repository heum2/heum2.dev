import React from "react";
import Link from "next/link";
import { Post } from "contentlayer/generated";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import Image from "next/image";
import { config } from "config";
import { cn } from "src/utils/style";

type Props = {
  prevPost: Pick<Post, "title" | "slug"> | undefined;
  nextPost: Pick<Post, "title" | "slug"> | undefined;
};

export function PostFooter({ prevPost, nextPost }: Props): JSX.Element {
  return (
    <div>
      <div className="flex w-full items-center justify-center mt-3 sm:mt-0">
        <div className="flex items-center gap-4 sm:gap-6 sm:p-12">
          <div className="w-16 h-16 md:h-24 md:w-24 select-none overflow-hidden rounded-full">
            <div className="relative">
              <Image
                priority
                className="object-cover"
                src={config.profile.image}
                alt="profile"
                width={96}
                height={96}
                draggable={false}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{config.profile.name}</div>
            <div className="text-sm">{config.profile.role}</div>
          </div>
        </div>
      </div>

      <div className="text-secondary mt-4 flex flex-col sm:flex-row items-center gap-4 text-sm font-semibold sm:text-base">
        {prevPost && (
          <Link
            href={`/posts${prevPost.slug}`}
            className="group w-full sm:w-1/2 gap-2 px-4 py-3 flex items-center rounded-lg transition-all hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <MdKeyboardArrowLeft className="text-xl flex-shrink-0" />
            <span className="break-keep line-clamp-1">{prevPost.title}</span>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/posts${nextPost.slug}`}
            className={cn(
              "group w-full sm:w-1/2 gap-2 px-4 py-3 flex items-center justify-end rounded-lg transition-all hover:bg-gray-300 dark:hover:bg-gray-600",
              !prevPost && "ml-auto"
            )}
          >
            <span className="break-keep line-clamp-1">{nextPost.title}</span>
            <MdKeyboardArrowRight className="text-xl flex-shrink-0" />
          </Link>
        )}
      </div>
    </div>
  );
}
