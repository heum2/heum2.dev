import { config } from "config";
import Image from "next/image";
import React from "react";

type Props = {};

function About({}: Props): JSX.Element {
  return (
    <article className="w-full bg-white dark:bg-zinc-700 rounded-3xl py-12 px-4 md:px-8 shadow-md">
      <h1 className="text-2xl md:text-4xl font-bold mb-5">
        조은흠 | 문제 해결에 주력하는 개발자
      </h1>
      <hr />

      <div></div>

      {/*       
      <div>
        <h1 className="text-2xl font-bold mb-2 decoration-transparent">
          💁🏻 <mark className="text-sky-400 bg-transparent">About Me</mark>
        </h1>
        <hr />
      </div>

      <div className="flex">
        <div className="flex-1">
          <h2>Introduction</h2>
        </div>
        <ul className="list-disc flex-3">
          <li>
            안녕하세요 :) 3년차 <strong>프론트엔드 개발자</strong> 조은흠입니다.
          </li>
          <li>
            스타트업에서 초기 프로젝트 참여부터 런칭 및 유지보수 경험이
            있습니다.
          </li>
          <li>
            <mark>React</mark>, <mark>Next</mark>, <mark>React Native</mark>를
            사용합니다.
          </li>
          <li>
            <strong>Clean Code</strong>에 대한 고민을 생활화합니다.
          </li>
          <li>일은 체력이라 생각해 꾸준히 운동 합니다.</li>
        </ul>
      </div> */}

      <p></p>
    </article>
  );
}

export default About;
