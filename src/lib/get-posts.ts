import { allPosts as localPosts } from "content-collections";

type Post = (typeof localPosts)[number];

export type PostOverview = Omit<Post, "mdx" | "toc" | "_meta"> & {
  url: string;
};

export function getPosts({
  limit = false,
  localOnly = false,
}: {
  limit?: number | false;
  localOnly?: boolean;
} = {}): PostOverview[] {
  const processedLocalPosts = localPosts.map(
    ({
      title,
      description,
      date,
      tags,
      content,
      archived,
      _meta: { path },
    }) => ({
      title,
      description,
      date,
      tags,
      content,
      archived,
      url: `/posts/${path}`,
    })
  );

  const allPosts = (
    localOnly ? processedLocalPosts : [...externalPosts, ...processedLocalPosts]
  ).sort((a, b) => b.date.getTime() - a.date.getTime());

  if (limit !== false) {
    return allPosts.slice(0, limit);
  }

  return allPosts;
}

const externalPosts = [
  {
    title: "Adding Deno support to the Eta template engine",
    description: "A guide to adding Deno support to the Eta template engine.",
    date: new Date("2020-09-14"),
    tags: ["typescript", "open-source"],
    content: "Read the full article on Dev.to.",
    url: "https://dev.to/nebrelbug/adding-deno-support-to-the-eta-template-engine-28n7",
    archived: false,
  },
  {
    title: "I built a JS template engine 3x faster than EJS",
    description: "An introduction to the Eta template engine.",
    date: new Date("2020-04-11"),
    tags: ["typescript", "open-source"],
    content: "Read the full article on Dev.to.",
    url: "https://dev.to/nebrelbug/i-built-a-js-template-engine-3x-faster-than-ejs-lj8",
    archived: false,
  },
  {
    title: "TensorFlow.js: An intro and analysis with use cases",
    description: "An overview and evaluation of TensorFlow.js.",
    date: new Date("2019-04-24"),
    tags: ["ml/ai"],
    content: "Read the full article on LogRocket.",
    url: "https://blog.logrocket.com/tensorflow-js-an-intro-and-analysis-with-use-cases-8e1f9a973183/",
    archived: true,
  },
  {
    title:
      "Introducing Squirrelly: a fast, lightweight, and simple JS template engine",
    description: "An introduction to the Squirrelly template engine.",
    date: new Date("2018-09-26"),
    tags: ["typescript", "open-source"],
    content: "Read the full article on HackerNoon.",
    url: "https://hackernoon.com/introducing-squirrelly-a-fast-lightweight-and-simple-js-template-engine-70a873d765c9",
    archived: true,
  },
];
