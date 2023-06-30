import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ASide({ children, className }: Props): JSX.Element {
  return (
    <div
      className={`${className} common-no-scroll-bar sticky top-[81px] hidden lg:block overflow-scroll`}
      style={{ height: "calc(100vh - 81px)" }}
    >
      {children}
    </div>
  );
}
