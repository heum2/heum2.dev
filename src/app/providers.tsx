"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

import { Footer, Header } from "src/components/layout";
import { DarkmodeButton } from "src/components/button";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Header />
      <main className="mx-auto max-w-3xl py-8 px-5">{children}</main>
      <div className="absolute bottom-4 right-4">
        <DarkmodeButton />
      </div>
      <Footer />
    </ThemeProvider>
  );
}
