import React from "react";
import Image from "next/image";

import { config } from "config";

export function MobileProfileCard(): JSX.Element {
  return (
    <div className="block lg:hidden">
      <div className="p-1 mb-3 font-bold text-lg">💻 Profile</div>
      <div className="p-3 rounded-2xl bg-white dark:bg-zinc-700 mb-4">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative">
            <Image
              priority
              src={config.profile.image}
              alt="profile"
              width={112}
              height={112}
              className="object-cover rounded-2xl"
              draggable={false}
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
