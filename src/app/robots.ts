import { config } from "config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = config.link;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
