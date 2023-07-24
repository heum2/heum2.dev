import { useMemo } from "react";
import { allPosts } from "contentlayer/generated";

import { ASide, HomePosts } from "src/components/layout";
import { ContractCard, ProfileCard } from "src/components/cards";
import { SideTag, TagList } from "src/components/tags";

function Home() {
  const { tags } = useMemo(
    () => ({
      tags: Array.from(new Set(allPosts.flatMap(item => item.tags))),
    }),
    []
  );

  return (
    <div className="block md:grid grid-cols-12 gap-6">
      <ASide className="col-span-2">
        <div>
          <div className="p-1 mb-3 font-bold">🏷️ Tags</div>
          <TagList className="lg:block" data={tags} />
        </div>
      </ASide>

      <HomePosts />

      <ASide className="col-span-3">
        <ProfileCard />
        <ContractCard />
        <div className="flex justify-center cursor-default">
          <p className="text-gray-500 text-sm mt-3">© heum2 2023</p>
        </div>
      </ASide>
    </div>
  );
}

export default Home;
