"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import type { MDX } from "contentlayer2/core";

interface Props {
  code: MDX["code"];
}

export function MDXContent({ code }: Props) {
  const MDXComponent = useMDXComponent(code);

  return (
    <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 break-keep break-words prose dark:prose-invert max-w-6xl mx-auto">
      <MDXComponent />
    </div>
  );
}
