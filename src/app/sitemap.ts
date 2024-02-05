import { MetadataRoute } from "next";
import { config } from "config";
import { allPosts } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = config.link;

  const posts = allPosts.map(post => ({
    url: `${siteUrl}/posts${post.slug}`,
    lastModified: post.date.split("T")[0],
    changeFrequency: "daily",
    priority: 0.5,
  }));

  const routes = config.menus.map(route => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "daily",
    priority: 0.5,
  }));

  return [...routes, ...posts];
}
