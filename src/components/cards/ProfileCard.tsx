import React from "react";
import Image from "next/image";

import { config } from "config";

export function ProfileCard(): JSX.Element {
  return (
    <div>
      <div className="p-1 mb-3 font-bold">💻 Profile</div>
      <div className="rounded-2xl bg-white dark:bg-zinc-700 w-full md:p-4 lg:p-4 mb-9">
        <div className="relative w-full after:content-[''] after:block after:pb-[100%]">
          <Image
            className="object-cover rounded-2xl"
            src={config.profile.image}
            fill
            alt="profile"
          />
        </div>
        <div className="bg-white p-2 flex flex-col items-center dark:bg-zinc-700 dark:text-white">
          <div className=" text-xl italic font-bold">{config.profile.name}</div>
          <div className="text-sm mb-4 text-gray-500 dark:text-gray-400">
            {config.profile.role}
          </div>
          <div className="text-sm mb-2">{config.profile.bio}</div>
        </div>
      </div>
    </div>
  );
}
