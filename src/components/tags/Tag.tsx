"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {
  children: string;
};

export function Tag({ children }: Props): JSX.Element {
  const router = useRouter();

  const handleClickTag = () => {
    router.push(`/tags/${children}`);
  };

  return (
    <motion.li
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 1.05 }}
      className="text-xs text-gray-500 font-normal rounded-lg bg-gray-200 px-2 py-1 cursor-pointer hover:bg-gray-400"
      onClick={handleClickTag}
    >
      {children}
    </motion.li>
  );
}
