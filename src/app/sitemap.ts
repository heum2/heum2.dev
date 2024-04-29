import { MetadataRoute } from "next";
import { config } from "config";
import { allPosts } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = config.link;

  const posts: MetadataRoute.Sitemap = allPosts.map(post => ({
    url: `${siteUrl}/posts${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "daily",
    priority: 0.5,
  }));

  const routes: MetadataRoute.Sitemap = config.menus.map(route => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.5,
  }));

  return [...routes, ...posts];
}
