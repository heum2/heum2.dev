import { config } from "config";
import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineMail,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";

export function ContractCard() {
  return (
    <div>
      <div className="p-1 mb-3 font-bold">💬 Contact</div>
      <ul className="rounded-2xl bg-white dark:bg-zinc-700 p-1 flex flex-col">
        {config.profile.email && (
          <a
            href={`mailto:${config.profile.email}`}
            rel="noreferrer"
            target="_blank"
            className="overflow-hidden p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
          >
            <AiOutlineMail className="text-2xl flex-shrink-0" />
            <div className="text-sm">Email</div>
          </a>
        )}

        {config.profile.github && (
          <a
            href={`https://github.com/${config.profile.github}`}
            rel="noreferrer"
            target="_blank"
            className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
          >
            <AiOutlineGithub className="text-2xl" />
            <div className="text-sm">Github</div>
          </a>
        )}

        {config.profile.instagram && (
          <a
            href={`https://www.instagram.com/${config.profile.instagram}`}
            rel="noreferrer"
            target="_blank"
            className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
          >
            <AiOutlineInstagram className="text-2xl" />
            <div className="text-sm">Instagram</div>
          </a>
        )}

        {config.profile.twitter && (
          <a
            href={`https://www.twitter.com/${config.profile.twitter}`}
            rel="noreferrer"
            target="_blank"
            className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
          >
            <AiOutlineTwitter className="text-2xl" />
            <div className="text-sm">Twitter</div>
          </a>
        )}

        {config.profile.linkedin && (
          <a
            href={`https://www.linkedin.com/in/${config.profile.linkedin}`}
            rel="noreferrer"
            target="_blank"
            className="  overflow-hidden p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
          >
            <AiFillLinkedin className="text-2xl flex-shrink-0" />
            <div className="text-sm">Linked in</div>
          </a>
        )}
      </ul>
    </div>
  );
}
