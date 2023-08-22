"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useCycle } from "framer-motion";

import { useScrollDirection } from "src/hooks";
import { config } from "config";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

export function Header(): JSX.Element {
  const [open, cycleOpen] = useCycle(false, true);

  const pathname = usePathname();
  const scrollDirection = useScrollDirection();

  const handleToggleMenu = () => {
    cycleOpen();
  };

  useEffect(() => {
    cycleOpen(0);
  }, [cycleOpen, pathname]);

  return (
    <header
      className={`shadow-sm transition sticky bg-white dark:bg-zinc-700 mb-2 md:mb-6 border-b-[1px] z-[40] border-gray-100 dark:border-gray-800 top-0 
        ${
          scrollDirection === "down"
            ? "-translate-y-[70px] sm:-translate-y-16"
            : "translate-y-0"
        }
      `}
    >
      <nav className="flex justify-between items-center h-14 px-5 mx-auto my-0 max-w-6xl">
        <h1 className="text-lg font-black hover:text-sky-500 dark:hover:text-cyan-300 transition-colors">
          <Link href="/">heum2.dev</Link>
        </h1>

        <div className="md:hidden">
          <button className="border p-2 rounded" onClick={handleToggleMenu}>
            <div className="space-y-1">
              <span className="block w-5 h-1 bg-gray-500 dark:bg-gray-400"></span>
              <span className="block w-5 h-1 bg-gray-500 dark:bg-gray-400"></span>
              <span className="block w-5 h-1 bg-gray-500 dark:bg-gray-400"></span>
            </div>
          </button>
          <AnimatePresence>
            {open && (
              <motion.aside
                className="absolute inset-x-0 z-50 flex flex-col px-5 bg-white dark:bg-zinc-700"
                initial={{ height: 0 }}
                animate={{
                  height: "100vh",
                }}
                exit={{
                  height: 0,
                  transition: { delay: 0.7, duration: 0.3 },
                }}
              >
                <motion.ul
                  className="flex flex-col mt-10"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={sideVariants}
                >
                  <motion.li
                    whileHover={{ scale: 1.02 }}
                    variants={itemVariants}
                  >
                    <Link
                      className="text-lg block hover:text-sky-500 dark:hover:text-cyan-300  py-2"
                      href={config.profile.about}
                      target="_blank"
                    >
                      About
                    </Link>
                  </motion.li>
                </motion.ul>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>

        <ul className="hidden md:flex items-center gap-4">
          <li>
            <Link
              className="rounded-lg bg-transparent hover:bg-gray-300 px-3 py-1"
              href={config.profile.about}
              target="_blank"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
