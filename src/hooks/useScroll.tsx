"use client";

import { useEffect, useState } from "react";

export const useScroll = (tableOfContents: Toc[]) => {
  const [currentTocSlug, setCurrentTocSlug] = useState<string | undefined>();
  useEffect(() => {
    if (tableOfContents.length === 0) return;
    let headings: { id: string; top: number }[];

    function onResize() {
      headings = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".prose h2:not(#table-of-contents),h3:not(#table-of-contents)"
        )
      ).map(element => ({ id: element.id, top: element.offsetTop }));
    }
    function onScroll() {
      if (!headings) return;

      let current: typeof currentTocSlug = undefined;
      for (let i = 0; i < headings.length; i++) {
        if (window.scrollY >= headings[i].top) {
          current = headings[i].id;
        }
      }
      setCurrentTocSlug(current);
    }
    onResize();
    onScroll();
    window.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", onResize, {
      capture: true,
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onResize, { capture: true });
    };
  }, [tableOfContents]);
  return { tableOfContents, currentTocSlug };
};
