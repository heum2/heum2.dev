import React from "react";
import { SideTag } from "./SideTag";

type Props = {
  data: string[];
  className?: string;
};

export function TagList({ data, className }: Props): JSX.Element {
  return (
    <nav
      className={`${className} gap-1 flex overflow-x-scroll lg:overflow-x-hidden mb-6`}
    >
      {data.map((tag, idx) => (
        <SideTag key={idx}>{tag}</SideTag>
      ))}
    </nav>
  );
}
