import { useMDXComponent } from "next-contentlayer2/hooks";
import type { MDX } from "contentlayer2/core";

import MDXComponents from "src/components/mdx/MDXComponetns";

interface Props {
  code: MDX["code"];
}

function MDXContent({ code }: Props) {
  const MDXComponent = useMDXComponent(code);

  return (
    <article className="prose dark:prose-invert max-w-6xl mx-auto break-keep break-words">
      <MDXComponent components={MDXComponents} />
    </article>
  );
}

export default MDXContent;
