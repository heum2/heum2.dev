import { config } from "config";
import React from "react";
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { AiOutlineGithub } from "@react-icons/all-files/ai/AiOutlineGithub";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import { AiFillLinkedin } from "@react-icons/all-files/ai/AiFillLinkedin";
import { AiOutlineTwitter } from "@react-icons/all-files/ai/AiOutlineTwitter";

export function Footer(): JSX.Element {
  return (
    <footer className="my-8 flex flex-col justify-center items-center">
      <ul className="flex">
        {config.profile.email && (
          <li>
            <a
              href={`mailto:${config.profile.email}`}
              rel="noreferrer"
              target="_blank"
              className="overflow-hidden p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
            >
              <AiOutlineMail className="text-2xl flex-shrink-0" />
            </a>
          </li>
        )}

        {config.profile.github && (
          <li>
            <a
              href={`https://github.com/${config.profile.github}`}
              rel="noreferrer"
              target="_blank"
              className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
            >
              <AiOutlineGithub className="text-2xl" />
            </a>
          </li>
        )}

        {config.profile.instagram && (
          <li>
            <a
              href={`https://www.instagram.com/${config.profile.instagram}`}
              rel="noreferrer"
              target="_blank"
              className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
            >
              <AiOutlineInstagram className="text-2xl" />
            </a>
          </li>
        )}

        {config.profile.twitter && (
          <li>
            <a
              href={`https://www.twitter.com/${config.profile.twitter}`}
              rel="noreferrer"
              target="_blank"
              className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
            >
              <AiOutlineTwitter className="text-2xl" />
            </a>
          </li>
        )}

        {config.profile.linkedin && (
          <li>
            <a
              href={`https://www.linkedin.com/in/${config.profile.linkedin}`}
              rel="noreferrer"
              target="_blank"
              className="overflow-hidden p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
            >
              <AiFillLinkedin className="text-2xl flex-shrink-0" />
            </a>
          </li>
        )}
      </ul>
      <p className="text-gray-700 text-sm mt-2">© heum2 2023</p>
    </footer>
  );
}
