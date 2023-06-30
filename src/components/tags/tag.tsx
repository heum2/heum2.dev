"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  children: string;
};

export function Tag({ children }: Props): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tag = searchParams.get("tag");

  const handleClickTag = () => {
    let search = "";

    if (children !== tag) {
      search = children;
    }
    router.push(`/?tag=${search}`);
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
