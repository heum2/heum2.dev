"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { MdExpandMore } from "react-icons/md";

import { PostCard } from "../cards";
import { useQuery } from "src/hooks";

export function HomePosts(): JSX.Element {
  const [isCategoryMenu, setIsCategoryMenu] = useState(false);
  const router = useRouter();
  const { createQueryString } = useQuery();

  const searchParams = useSearchParams();
  const tag = searchParams.get("tags");
  const category = searchParams.get("category");
  const currentCategory = category || "📁 All";

  const posts = useMemo(() => {
    let result = allPosts
      .slice()
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    if (tag) {
      result = result.filter(item => item.tags.includes(tag));
    }

    if (category === "📁 All") {
      return result;
    } else {
      result = result.filter(item => item.category === category);
    }

    return result;
  }, [tag, category]);

  const { categories } = useMemo(
    () => ({
      categories: [
        "📁 All",
        ...Array.from(new Set(allPosts.map(item => item.category))),
      ],
    }),
    []
  );

  const handleClickCategory = (category: string) => {
    router.push(`/?${createQueryString("category", category)}`);
    setIsCategoryMenu(false);
  };

  const handleClickToggle = () => {
    setIsCategoryMenu(prev => !prev);
  };
  const handleBlur = () => {
    setIsCategoryMenu(false);
  };

  return (
    <div className="col-span-12 lg:col-span-7">
      <div className="flex border-b border-gray-300 mb-4 justify-between items-center">
        <div className="relative" tabIndex={0} onBlur={handleBlur}>
          <div
            className="text-xl font-bold my-2 dark:text-white flex gap-1 items-center cursor-pointer"
            onClick={handleClickToggle}
          >
            {currentCategory} Posts <MdExpandMore />
          </div>
          {isCategoryMenu && (
            <div className="absolute inset-x-0 z-50 flex flex-col p-1 bg-white rounded-lg shadow-md text-black">
              <ul className="flex flex-col">
                {categories.map(item => (
                  <li
                    className="text-lg block rounded-lg hover:bg-gray-200 px-1 py-2 cursor-pointer"
                    key={item}
                    onClick={() => handleClickCategory(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <motion.div
        key={tag || category}
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
