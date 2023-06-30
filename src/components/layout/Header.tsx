import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header(): JSX.Element {
  const pathname = usePathname();

  return (
    <header className="shadow-sm transition sticky bg-white dark:bg-zinc-700 mb-2 md:mb-6 border-b-[1px] z-[40] border-gray-100 dark:border-gray-800 top-0">
      <nav className="flex justify-between items-center h-14 px-5 mx-auto my-0 max-w-6xl">
        <h1 className="text-lg font-black">
          <Link href="/">heum.dev</Link>
        </h1>

        <button className="border p-2 rounded md:hidden">
          <div className="space-y-1">
            <span className="block w-5 h-1 bg-gray-500 dark:bg-gray-400"></span>
            <span className="block w-5 h-1 bg-gray-500 dark:bg-gray-400"></span>
            <span className="block w-5 h-1 bg-gray-500 dark:bg-gray-400"></span>
          </div>
        </button>

        <ul className="hidden md:flex gap-4">
          <li
            className={`rounded-lg bg-transparent hover:bg-gray-300 px-3 py-1 ${
              pathname.includes("about") && "font-bold"
            }`}
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className={`rounded-lg bg-transparent hover:bg-gray-300 px-3 py-1 ${
              pathname.includes("posts") && "font-bold"
            }`}
          >
            <Link href="/posts">Posts</Link>
          </li>
          <li
            className={`rounded-lg bg-transparent hover:bg-gray-300 px-3 py-1 ${
              pathname.includes("log") && "font-bold"
            }`}
          >
            <Link href="/log">Log</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
