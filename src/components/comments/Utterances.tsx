"use client";

import React, { useEffect, useRef } from "react";

import { config } from "config";

function Utterances(): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";

    const setting: { [key: string]: string } = config.utterances.config;
    Object.keys(setting).forEach(key => {
      script.setAttribute(key, setting[key]);
    });

    script.setAttribute("theme", "github-light");
    script.setAttribute("crossorigin", "anonymous");

    script.onload = ev => {
      const comments = document.getElementById("comments");
      if (comments && comments.children[1]) {
        //@ts-ignore
        comments.children[1].style.display = "none";
      }
    };
    script.async = true;

    ref.current?.appendChild(script);
  }, []);

  if (!config.utterances.enable) {
    return <></>;
  }

  return <div id="comments" ref={ref} className="border-t-[1px]" />;
}

export default Utterances;
