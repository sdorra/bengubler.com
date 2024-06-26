import { Feed } from "feed";

import { baseUrl } from "@/lib/config";

import { MDXContent } from "@content-collections/mdx/react";
import { allPosts } from "content-collections";
import { NextRequest, NextResponse } from "next/server";

const createFeed = (renderToString: Function) => {
  const feed = new Feed({
    title: "bengubler.com",
    description: "Ben Gubler's personal website",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    favicon: `${baseUrl}/icon.png`,
    copyright: `Copyright ${new Date().getFullYear()} Ben Gubler`,
    author: {
      name: "Ben Gubler",
    },
  });

  const posts = allPosts
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .map((post) => ({
      ...post,
      url: `/posts/${post._meta.path}`,
    }));

  for (const post of posts) {
    const html = renderToString(<MDXContent code={post.mdx} />);

    feed.addItem({
      title: post.title,
      id: `${baseUrl}${post.url}`,
      link: `${baseUrl}${post.url}?utm_campaign=feed&utm_source=rss2`,
      description: post.description,
      content: html,
      date: post.date,
      category: post.tags
        ? post.tags.map((name) => ({ name: name }))
        : undefined,
      // image: createImageUrl(post.image.url, 256, 256, true),
    });
  }

  return feed.rss2();
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  const ReactDOMServer = (await import("react-dom/server")).default;

  const feed = createFeed(ReactDOMServer.renderToString);

  return new NextResponse(feed, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
