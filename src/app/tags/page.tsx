"use client";

import React from "react";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Posts() {
  const pathname = usePathname();
  const tags = Array.from(new Set(allPosts.flatMap(item => item.tags)));

  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
        Tags <span className="ml-2 text-sm">({tags.length})</span>
      </h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map(tag => (
          <Link key={tag} href={`${pathname}/${tag}`}>
            <span className="rounded-lg px-2 py-0.5 transition-colors bg-gray-300 dark:bg-gray-500 hover:text-primary hover:bg-gray-200 font-normal">
              {tag}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Posts;
