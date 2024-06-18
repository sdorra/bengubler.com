"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function Comments() {
  const { resolvedTheme } = useTheme(); // "dark" | "light"

  return (
    <div className="mt-10">
      <Giscus
        id="comments"
        repo="nebrelbug/bengubler.com"
        repoId="R_kgDOJfqpng"
        category="Announcements"
        categoryId="DIC_kwDOJfqpns4CZ2Hf"
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
