import React from "react";
import Link from "next/link";

export function Header(): JSX.Element {
  return (
    <header className="mx-auto my-0 max-w-3xl sticky top-0 px-5">
      <nav className="flex justify-between items-center h-14">
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
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/log">Log</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
