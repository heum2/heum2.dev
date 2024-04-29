import { compareDesc } from "date-fns";
import { allPosts } from "contentlayer/generated";
import React from "react";
import { PostCard } from "src/components/cards";

type Props = {
  params: {
    tag: string;
  };
};

function TagPage({ params }: Props): JSX.Element {
  const posts = allPosts
    .slice()
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .filter(item => item.tags.includes(decodeURIComponent(params.tag)));

  return (
    <section>
      <h1 className="text-2xl font-bold">{decodeURIComponent(params.tag)}</h1>
      <div key={params.tag} className="mt-6">
        {posts.map(post => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}

export default TagPage;
