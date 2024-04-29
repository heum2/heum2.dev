"use client";

import React from "react";
import Link from "next/link";

type Props = {
  value: Toc[];
  className?: string;
};

export function MobileTocBanner({ value, className }: Props): JSX.Element {
  if (value.length < 1) {
    return <></>;
  }

  return (
    <details
      open
      className={`max-h-[300px] overflow-y-scroll rounded-md mb-5 shadow-md transition-all ${
        className ?? ""
      }`}
    >
      <summary className="sticky top-0 flex items-center p-4 pr-2 bg-zinc-100 dark:bg-black">
        <h4 className="font-bold flex items-center gap-2">
          <strong>목차</strong>
        </h4>
      </summary>
      <div className="bg-white p-4 pr-2 dark:bg-[#2b2b2b]">
        <ul
          id="toc-content"
          className="flex flex-col items-start justify-start text-sm"
        >
          {value.map(toc => (
            <li key={`#${toc.slug}`} className="py-1">
              <Link
                href={`#${toc.slug}`}
                data-level={toc.level}
                className="flex items-center data-[level=two]:text-sm data-[level=three]:pl-4 hover:text-gray-500 hover:drop-shadow-base-bold dark:hover:drop-shadow-base"
              >
                {toc.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
