import React, { PropsWithChildren } from "react";

import { Footer } from "src/components/layout";

function BoardLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default BoardLayout;
