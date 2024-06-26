import { config } from "config";
import React from "react";
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { AiOutlineGithub } from "@react-icons/all-files/ai/AiOutlineGithub";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import { AiFillLinkedin } from "@react-icons/all-files/ai/AiFillLinkedin";
import { AiOutlineTwitter } from "@react-icons/all-files/ai/AiOutlineTwitter";

export function ContractCard() {
  return (
    <div>
      <div className="p-1 mb-3 font-bold">💬 Contact</div>
      <ul className="rounded-2xl bg-white dark:bg-zinc-700 p-1 flex flex-col">
        {config.profile.email && (
          <li>
            <a
              href={`mailto:${config.profile.email}`}
              rel="noreferrer"
              target="_blank"
              className="overflow-hidden p-3 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
            >
              <AiOutlineMail className="text-2xl flex-shrink-0" />
              <span className="text-sm">Email</span>
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
              <span className="text-sm">Github</span>
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
              <span className="text-sm">Instagram</span>
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
              <span className="text-sm">Twitter</span>
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
              <span className="text-sm">Linked in</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
