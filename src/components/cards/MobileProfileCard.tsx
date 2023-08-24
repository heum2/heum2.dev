import React from "react";
import Image from "next/image";

import { config } from "config";

export function MobileProfileCard(): JSX.Element {
  return (
    <div className="block lg:hidden">
      <div className="p-1 mb-3 font-bold text-lg">💻 Profile</div>
      <div className="p-3 rounded-2xl bg-white dark:bg-zinc-700 mb-4">
        <div className="flex items-center gap-2  md:gap-6">
          <div className="relative w-28 h-28">
            <Image
              priority
              src={config.profile.image}
              alt="profile"
              fill
              className="object-cover rounded-2xl"
              draggable={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="h-fit">
            <div className="text-xl italic font-bold">
              {config.profile.name}
            </div>
            <div className="text-sm text-gray-500 mb-4 dark:text-gray-400">
              {config.profile.role}
            </div>
            <div className="text-sm">{config.profile.bio}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
