import { Feed } from "feed";
import { writeFileSync } from "fs";

import { config } from "../config";
import PostJson from "../.contentlayer/generated/Post/_index.json";

const master = {
  name: config.profile.name,
  email: config.profile.email,
  link: config.link,
};

const feed = new Feed({
  title: config.blog.title,
  description: config.blog.description,
  id: config.link,
  link: config.link,
  language: "ko",
  image: `${config.link}/images/profile.jpg`,
  favicon: `${config.link}/favicon.ico`,
  copyright: `All rights reserved since ${config.since}, ${master.name}`,
  generator: "generate-rss",
  feedLinks: {
    json: `${config.link}/json`,
    atom: `${config.link}/atom`,
  },
  author: master,
});

PostJson.forEach(post => {
  feed.addItem({
    title: post.title,
    id: post.slug,
    link: `${config.link}/posts${post.slug}`,
    description: post.description,
    content: post.body.raw,
    author: [master],
    contributor: [master],
    date: new Date(post.date),
    image: post.thumbnailUrl
      ? `${config.link}/images/${post.thumbnailUrl}`
      : undefined,
    category: post.tags.map(tag => ({ name: tag })),
  });
});

feed.addCategory("Technologies");

// Output: RSS 2.0
writeFileSync("public/rss.xml", feed.rss2(), "utf-8");
// Output: Atom 1.0
writeFileSync("public/rss-atom.xml", feed.atom1(), "utf-8");
// Output: JSON Feed 1.0
writeFileSync("public/feed.json", feed.json1(), "utf-8");
