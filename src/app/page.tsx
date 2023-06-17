import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

import { useTheme } from "next-themes";

// function PostCard(post: Post) {
//   return (
//     <div className="mb-8">
//       <h2 className="mb-1 text-xl">
//         <Link
//           href={post.url}
//           className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
//         >
//           {post.title}
//         </Link>
//       </h2>
//       <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
//         {format(parseISO(post.date), "yy.MM.d")}
//       </time>
//       <p>{post.description}</p>
//       <ul>
//         {post.tags.map(item => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//       {/* <div
//         className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0"
//         dangerouslySetInnerHTML={{ __html: post.body.html }}
//       /> */}
//     </div>
//   );
// }

function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // useEffect only runs on the client, so now we can safely show the UI

  return (
    <div>
      {/* {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))} */}
    </div>
  );
}

export default Home;
