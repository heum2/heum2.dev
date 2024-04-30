import { useMemo } from "react";
import { allPosts } from "contentlayer/generated";

import { ASide, HomePosts } from "src/components/layout";
import { ContractCard, ProfileCard } from "src/components/cards";
import { TagList } from "src/components/tags";
import Link from "next/link";

function Home() {
  const { tags } = useMemo(
    () => ({
      tags: Array.from(new Set(allPosts.flatMap(item => item.tags))).sort(),
    }),
    []
  );

  return (
    <div className="block md:grid grid-cols-12 gap-6">
      <ASide className="col-span-2">
        <div>
          <Link href="/tags">
            <div className="p-1 mb-3 font-bold">🏷️ Tags</div>
          </Link>
          <TagList className="lg:flex-col" data={tags} />
        </div>
      </ASide>

      <HomePosts />

      <ASide className="col-span-3">
        <ProfileCard />
        <ContractCard />
        <div className="flex justify-center cursor-default">
          <p className="text-gray-700 text-sm mt-3">© heum2 2023</p>
        </div>
      </ASide>
    </div>
  );
}

export default Home;
