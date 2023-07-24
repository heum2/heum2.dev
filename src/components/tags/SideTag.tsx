"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "src/hooks";

type Props = {
  children: string;
};

export function SideTag({ children }: Props): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createQueryString } = useQuery();

  const tag = searchParams.get("tags");

  const handleClickTag = () => {
    router.push(
      `/?${createQueryString("tags", children !== tag ? children : "")}`
    );
  };

  return (
    <motion.li
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 1.05 }}
      className={`cursor-pointer text-sm p-1 px-4 my-1 flex-shrink-0 rounded-xl text-gray-500 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 ${
        tag === children &&
        "text-black bg-white dark:bg-zinc-700 hover:bg-white dark:hover:bg-zinc-700"
      }`}
      onClick={handleClickTag}
    >
      {children}
    </motion.li>
  );
}
