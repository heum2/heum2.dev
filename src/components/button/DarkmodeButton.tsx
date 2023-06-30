"use client";

import React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

export function DarkmodeButton(): JSX.Element {
  const { theme, setTheme } = useTheme();

  const handleToggleDarkmode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed bottom-4 right-4">
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggleDarkmode}
        className="bg-current p-2 rounded-full text-gray-500 dark:text-gray-400"
      >
        {theme === "light" ? (
          <BsMoonFill className="w-5 h-5" fill="rgb(254, 240, 138)" />
        ) : (
          <BsSunFill className="w-5 h-5" fill="rgb(253, 224, 71)" />
        )}
      </motion.button>
    </div>
  );
}
