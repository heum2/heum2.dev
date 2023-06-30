"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { Header } from "src/components/layout";
import { DarkmodeButton } from "src/components/button";
import { useGtag } from "src/hooks";

export function Providers({ children }: { children: React.ReactNode }) {
  useGtag();
  const pathname = usePathname();

  return (
    <ThemeProvider attribute="class">
      <Header />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="mx-auto max-w-6xl px-4"
      >
        {children}
      </motion.main>
      <DarkmodeButton />
    </ThemeProvider>
  );
}
