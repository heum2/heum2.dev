"use client";

import { motion } from "framer-motion";
import { Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function PostCard(post: Post) {
  const router = useRouter();

  const handleMovePage = () => {
    router.push(post.url);
  };

  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden mb-6 md:mb-8 rounded-2xl bg-white dark:bg-zinc-700 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleMovePage}
    >
      {post.thumbnailUrl && (
        <div className="relative w-full pb-[66%] lg:pb-[50%] bg-gray-200 dark:bg-zinc-700">
          <Image
            className="object-cover"
            src={post.thumbnailUrl}
            alt={post.title}
            fill
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
          {post.title}
        </h2>
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-600 dark:text-gray-100">
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

        <div className="mb-4">
          <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
            {post.description}
          </p>
        </div>

        <ul className="flex gap-2">
          {post.tags.map(item => (
            <li
              className="text-xs text-gray-500 font-normal rounded-full bg-gray-200 px-2 py-1 cursor-pointer"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
