import { MetadataRoute } from "next";
import { config } from "config";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = config.link;

  // 포스트를 날짜순으로 정렬
  const sortedPosts = [...allPosts].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // 포스트 사이트맵 생성
  const posts: MetadataRoute.Sitemap = sortedPosts.map(post => ({
    url: `${siteUrl}/posts${post.slug}`,
    lastModified: new Date(post.date),
  }));

  // 메뉴 경로 사이트맵 생성
  const routes: MetadataRoute.Sitemap = config.menus.map(route => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
  }));

  // 메인 페이지 추가
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...routes,
    ...posts,
  ];
}
