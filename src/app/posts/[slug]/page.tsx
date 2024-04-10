import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export const generateMetadata = ({ params }: Props) => {
  const post = allPosts.find(post => post._raw.flattenedPath === params.slug);
  return { title: post?.title, description: post?.description };
};

function Post() {
  return notFound();
}

export default Post;
