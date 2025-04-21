import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

import MDXImage from "src/components/mdx/MDXImage";

const MDXComponents: MDXComponentsType = {
  MDXImage: MDXImage,
  img: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  ) => {
    return <MDXImage src={props.src || ""} alt={props.alt || ""} />;
  },
};

export default MDXComponents;
