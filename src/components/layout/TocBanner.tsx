"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowUturnUp } from "react-icons/hi2";
import { BsChatRightText, BsShare } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { useScroll } from "src/hooks";

type Props = {
  value: Toc[];
  className?: string;
};

export function TocBanner({ value, className }: Props): JSX.Element {
  const { currentTocSlug } = useScroll(value);

  const isTocActive = (slug: string | undefined) => {
    return slug === currentTocSlug;
  };

  const handleCopyLink = () => {
    window.navigator.clipboard.writeText(window.location.href);
    toast.success("링크가 복사되었습니다.");
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  const handleScrollComments = () => {
    document.querySelector("#comments")?.scrollIntoView();
  };

  return (
    <div
      className={`overflow-hidden rounded-3xl shadow-md transition-all ${
        className ?? ""
      }`}
    >
      <div className="flex items-center p-4 pr-2 bg-zinc-100 dark:bg-[#2b2b2b]">
        <strong>목차</strong>
      </div>
      <div className="bg-white p-4 pr-2 dark:bg-zinc-700">
        <ul
          id="toc-content"
          className="flex flex-col items-start justify-start text-xs"
        >
          {value.map(toc => (
            <li key={`#${toc.slug}`} className="py-1">
              <Link
                href={`#${toc.slug}`}
                data-level={toc.level}
                className={`flex items-center data-[level=two]:text-sm data-[level=three]:pl-4 ${
                  isTocActive(toc.slug)
                    ? "bg-gradient-to-r from-gray-500 to-sky-500 bg-clip-text font-extrabold text-transparent dark:from-cyan-300 dark:to-sky-600"
                    : " hover:text-gray-500 hover:drop-shadow-base-bold dark:hover:drop-shadow-base"
                }`}
              >
                {toc.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center  p-2 bg-zinc-100 dark:bg-[#2b2b2b]">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:bg-gray-300"
          aria-label="share"
          onClick={handleCopyLink}
        >
          <BsShare />
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:bg-gray-300"
          aria-label="scroll-up"
          onClick={handleScrollTop}
        >
          <HiArrowUturnUp />
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:bg-gray-300"
          aria-label="scroll-down"
          onClick={handleScrollComments}
        >
          <BsChatRightText />
        </motion.button>
      </div>
    </div>
  );
}
