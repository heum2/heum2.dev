import React from "react";
import { Footer } from "src/components/layout";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props): JSX.Element {
  return (
    <>
      <section>{children}</section>
      <Footer />
    </>
  );
}

export default layout;
