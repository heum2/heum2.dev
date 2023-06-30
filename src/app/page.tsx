import { useMemo } from "react";
import { compareDesc } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { RiArrowDownSFill } from "react-icons/ri";

import { ASide, Footer } from "src/components/layout";
import { ContractCard, ProfileCard, PostCard } from "src/components/cards";
import { Tag } from "src/components/tags";

function Home() {
  const { posts, tags } = useMemo(
    () => ({
      posts: allPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
      ),
      tags: Array.from(new Set(allPosts.flatMap(item => item.tags))),
    }),
    []
  );

  return (
    <div className="block md:grid grid-cols-12 gap-6">
      <ASide className="col-span-2">
        <div>
          <div className="p-1 mb-3 font-bold">🏷️ Tags</div>
          <ul className="gap-1 flex mobile-x-scroll lg:block mb-6">
            {tags.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </ul>
        </div>
      </ASide>

      <div className="col-span-12 lg:col-span-7">
        <div className="flex border-b border-gray-300 mb-4 justify-between items-center">
          <div className="relative">
            <div className="text-xl font-bold my-2 dark:text-white flex gap-1 items-center cursor-pointer">
              🗂️ All Posts
              <RiArrowDownSFill width="1em" height="1em" />
            </div>
          </div>
          <div className="flex text-sm gap-2">
            <a className="cursor-pointer text-black font-bold dark:text-white">
              Desc
            </a>
            <a className="cursor-pointer text-gray-500 dark:text-gray-400">
              Asc
            </a>
          </div>
        </div>
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>

      <ASide className="col-span-3">
        <ProfileCard />
        <ContractCard />
        <Footer />
      </ASide>
    </div>
  );
}

export default Home;
