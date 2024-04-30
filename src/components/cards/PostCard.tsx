"use client";

import { motion } from "framer-motion";
import { Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { AiOutlineCalendar } from "@react-icons/all-files/ai/AiOutlineCalendar";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import Image from "next/image";
import Link from "next/link";

export function PostCard(post: Post) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <motion.article
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden mb-6 md:mb-8 rounded-2xl bg-white dark:bg-zinc-700 hover:shadow-lg transition-shadow cursor-pointer"
      >
        {post.thumbnailUrl && (
          <div className="relative w-full pb-[66%] lg:pb-[50%] bg-gray-200 dark:bg-zinc-700">
            <Image
              className="object-contain"
              src={`/images/${post.thumbnailUrl}`}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              draggable={false}
            />
          </div>
        )}

        <div className="p-4">
          <div className="flex items-start mb-2">
            <h2 className="text-lg md:text-xl font-medium break-keep text-black dark:text-gray-100">
              {post.title}
            </h2>
            <span className="bg-sky-200 ml-auto opacity-90 px-2 py-1 text-sm rounded-lg w-fit dark:bg-sky-400 whitespace-nowrap">
              {post.category}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2 text-xs text-gray-600 dark:text-gray-100">
            <time className="flex items-center" dateTime={post.date}>
              <AiOutlineCalendar className="mr-1" />
              {format(parseISO(post.date), "yy.MM.d")}
            </time>
            <time className="flex items-center" dateTime={post.readingTime}>
              <AiOutlineClockCircle className="mr-1" />
              {post.readingTime}분
            </time>
          </div>

          <div className="mb-4">
            <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
              {post.description}
            </p>
          </div>

          <ul className="flex gap-2 flex-wrap">
            {post.tags.map(item => (
              <li
                key={item}
                className="text-xs text-gray-600 font-normal rounded-lg bg-gray-200 px-2 py-1"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </Link>
  );
}
