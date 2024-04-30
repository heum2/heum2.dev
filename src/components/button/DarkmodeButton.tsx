"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { BsSun } from "@react-icons/all-files/bs/BsSun";
import { BsMoon } from "@react-icons/all-files/bs/BsMoon";

export function DarkmodeButton(): JSX.Element {
  const [loaded, setLoaded] = useState(false);

  const { theme, setTheme } = useTheme();

  const handleToggleDarkmode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  if (!loaded) {
    return <></>;
  }

  return (
    <div className="fixed bottom-4 right-4">
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggleDarkmode}
        aria-label="toggle-darkmode"
        className="bg-current p-2 rounded-full text-gray-500 dark:text-gray-400"
      >
        {theme === "light" ? (
          <BsMoon className="w-5 h-5" fill="rgb(254, 240, 138)" />
        ) : (
          <BsSun className="w-5 h-5" fill="rgb(253, 224, 71)" />
        )}
      </motion.button>
    </div>
  );
}
