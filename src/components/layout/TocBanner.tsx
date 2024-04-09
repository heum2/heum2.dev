"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowUturnUp } from "react-icons/hi2";
import { BsChatRightText, BsShare } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { useScroll } from "src/hooks";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  value: Section[];
  className?: string;
};

export function TocBanner({ value, className }: Props): JSX.Element {
  const { currentSectionSlug } = useScroll(value);

  const isSubSectionActive = (subSection: SubSection) => {
    return subSection.slug === currentSectionSlug;
  };

  const isSectionActive = (section: Section) => {
    return (
      section.slug === currentSectionSlug ||
      section.subSections.some(v => v.slug === currentSectionSlug)
    );
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

  if (value.length < 1) {
    return <></>;
  }

  return (
    <div
      className={`overflow-hidden rounded-3xl shadow-md transition-all ${
        className ?? ""
      }`}
    >
      <div className="flex items-center p-4 pr-2 bg-zinc-100 dark:bg-[#2b2b2b]">
        <h4 className="font-bold flex items-center gap-2">
          <AiOutlineUnorderedList />
          목차
        </h4>
      </div>
      <div className="bg-white p-4 pr-2 dark:bg-zinc-700">
        <ul
          id="toc-content"
          className="flex flex-col items-start justify-start text-xs"
        >
          {value.map(section => (
            <Fragment key={section.slug}>
              <li className="text-sm">
                <a
                  href={`#${section.slug}`}
                  className={`group block py-1 ${section.subSections && ""} ${
                    isSectionActive(section)
                      ? "bg-gradient-to-r from-gray-500 to-sky-500 bg-clip-text font-extrabold text-transparent dark:from-cyan-300 dark:to-sky-600"
                      : "text-red hover:text-gray-500 hover:drop-shadow-base-bold dark:hover:drop-shadow-base"
                  } `}
                >
                  {section.text}
                </a>
              </li>
              {section.subSections.map(subSection => (
                <li key={subSection.slug} className="ml-4">
                  <Link
                    href={`#${subSection.slug}`}
                    className={`group flex items-center py-1 ${
                      isSubSectionActive(subSection)
                        ? "bg-gradient-to-r from-gray-500 to-sky-500 bg-clip-text font-extrabold text-transparent dark:from-cyan-300 dark:to-sky-600"
                        : "text-red hover:text-gray-500 hover:drop-shadow-base-bold dark:hover:drop-shadow-base"
                    }`}
                  >
                    <MdKeyboardArrowRight className="mr-1 overflow-visible text-black" />
                    {subSection.text}
                  </Link>
                </li>
              ))}
            </Fragment>
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
