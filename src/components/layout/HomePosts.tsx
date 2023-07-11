"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { PostCard } from "../cards";

export function HomePosts(): JSX.Element {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tags");

  const posts = useMemo(() => {
    let result = allPosts
      .slice()
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    if (tag) {
      result = result.filter(item => item.tags.includes(tag));
    }
    return result;
  }, [tag]);

  return (
    <div className="col-span-12 lg:col-span-7">
      <div className="flex border-b border-gray-300 mb-4 justify-between items-center">
        <div className="relative">
          <div className="text-xl font-bold my-2 dark:text-white flex gap-1 items-center">
            🗂️ {tag ? tag : "All Posts"} ({posts.length})
          </div>
        </div>
      </div>
      <motion.div
        key={tag}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {posts.map(post => (
          <PostCard key={post.slug} {...post} />
        ))}
      </motion.div>
    </div>
  );
}
