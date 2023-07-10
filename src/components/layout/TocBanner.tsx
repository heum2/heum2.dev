"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowUturnUp } from "react-icons/hi2";
import { BsChatRightText, BsShare } from "react-icons/bs";

import { useScroll } from "src/hooks";

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

  return (
    <div
      className={`overflow-hidden rounded-xl border border-neutral-200 transition-all dark:border-neutral-800 ${
        className ?? ""
      }`}
    >
      {value.length !== 0 && (
        <div className="bg-white p-4 pr-2 dark:border-neutral-700 dark:bg-zinc-700">
          <ul
            id="toc-content"
            className="flex flex-col items-start justify-start text-sm"
          >
            {value.map(section => (
              <Fragment key={section.slug}>
                <li>
                  <a
                    href={`#${section.slug}`}
                    className={`group block py-1 ${section.subSections && ""} ${
                      isSectionActive(section)
                        ? "bg-gradient-to-r from-neutral-700 to-yellow-900 bg-clip-text font-extrabold text-transparent dark:from-yellow-400 dark:to-yellow-600"
                        : "text-secondary hover:text-primary hover:drop-shadow-base-bold dark:hover:drop-shadow-base"
                    } `}
                  >
                    {section.text}
                  </a>
                </li>
                {section.subSections.map(subSection => (
                  <li key={subSection.slug} className="ml-4">
                    <Link
                      href={`#${subSection.slug}`}
                      className={`group flex items-start py-1 ${
                        isSubSectionActive(subSection)
                          ? "bg-gradient-to-r from-neutral-700 to-yellow-900 bg-clip-text font-extrabold text-transparent dark:from-yellow-400 dark:to-yellow-600"
                          : "text-secondary hover:text-primary hover:drop-shadow-base-bold dark:hover:drop-shadow-base"
                      }`}
                    >
                      <svg
                        width="3"
                        height="24"
                        viewBox="0 -9 3 24"
                        className="mr-2 overflow-visible text-tertiary group-hover:text-secondary"
                      >
                        <path
                          d="M0 0L3 3L0 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {subSection.text}
                    </Link>
                  </li>
                ))}
              </Fragment>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center  p-2 bg-zinc-100 dark:bg-[#2b2b2b]">
        <motion.button
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:bg-gray-300"
          aria-label="share"
        >
          <BsShare />
        </motion.button>

        <motion.button
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:bg-gray-300"
          aria-label="scroll-up"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <HiArrowUturnUp />
        </motion.button>
        <motion.button
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:bg-gray-300"
          aria-label="scroll-down"
          onClick={() => document.querySelector("#comments")?.scrollIntoView()}
        >
          <BsChatRightText />
        </motion.button>
      </div>
    </div>
  );
}
