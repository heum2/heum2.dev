---
title: Day1_세계지도 어떻게 만들어야할까?
description: 여행 프로젝트에서 어디로 여행갔는지 알기 위해 지도를 이용할 필요가 있다. 지도를 클릭할 때 해당하는 나라로 이동하는 효과를 주기 위해 방법을 찾아가는 과정을 적어본다.
date: 2024-07-18
tags:
  - 토이 프로젝트
  - 세계지도
series: 여행 앨범 프로젝트
thumbnailUrl: travel-album/day1-world-map/thumbnail.png
category: 💻 Dev
---

> 여행 프로젝트에서 어디로 여행갔는지 알기 위한 지도는 사용자들이 첫번째로 접근하게 되는 화면이다.
> 지도를 클릭할 때 해당하는 나라로 이동하는 효과를 주기 위해 방법을 찾아가는 과정을 적어본다.

![wolrd-map](/images/travel-album/world-map-thumbnail.png)

## 세계지도에 필요한 기능

세계지도를 구현할 때 세계지도에서 어떤 기능들이 필요할 지 해당하는 기능에 맞는 확장자는 무엇인지 생각해야한다.

1. 각 나라들을 구분 지을 수 있어야한다.
2. 각 나라들의 영역을 클릭하거나 후버가 동작해야한다.

세계지도 기능으로 생각해보았을 때 우선 위 2가지가 가장 중요하다고 생각이 든다.
그렇다면 **JPEG, PNG** 확장자들은 영역을 구분짓기 어렵다고 판단하여 그 두 개는 제외시켰다.

## 세계지도를 어떻게 구현해야할지 서핑하기

**ChatGPT**에게 물어보니 가이드를 제공해준다. (역시 만능...)
`d3`, `react-simple-maps` 라이브러리를 이용해야하며 세계지도 이미지로 [**Natural Earth**](https://www.naturalearthdata.com/)라는 사이트에 들어가서 GeoJSON 형식의 세계지도 데이터를 다운로드 하라고 한다.

하나도 모르겠으니 하나씩 서핑했다.
우선은 d3부터 살펴보았는데, 예제를 살펴보니 내가 원하는 지도의 기능들이 있는 것 같다.
[지구본](https://observablehq.com/@d3/versor-dragging?intent=fork) 모양의 애니메이션부터 [분포도](https://observablehq.com/@d3/walmarts-growth?intent=fork) 표현 그리고 가장 중요한 영역 클릭 시 [Zoom이 되는 예제](https://observablehq.com/@d3/zoom-to-bounding-box?intent=fork)가 있었다.

```js:영역클릭_예제
chart = {
  const width = 975;
  const height = 610;

  const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
       .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;")
      .on("click", reset);

  const path = d3.geoPath();

  const g = svg.append("g");

  const states = g.append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
      .on("click", clicked)
      .attr("d", path);

  states.append("title")
      .text(d => d.properties.name);

  g.append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

  svg.call(zoom);

  function reset() {
    states.transition().style("fill", null);
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    states.transition().style("fill", null);
    d3.select(this).transition().style("fill", "red");
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      d3.pointer(event, svg.node())
    );
  }

  function zoomed(event) {
    const {transform} = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
  }

  return svg.node();
}
```

코드를 보았을 때는 `canvas` 동작과 유사한 것 같은데 뭔가 복잡하다..😵‍💫
일단 `JavaScript`로 되어있으니 `Next.js`에도 적용할 수 있으리라 믿는다.

다음으로는 [react-simple-maps](https://www.react-simple-maps.io/)를 살펴보았다.
메인 화면으로 세계지도가 떡하니 있다.
해당 라이브러리도 영역을 구분할 수 있는 것 같다. 왜 두 가지 라이브러리를 동시에 사용하는지는 예제를 따라해보는 수 밖에 없을 것 같다.

그리고 마지막으로 [**Natural Earth**](https://www.naturalearthdata.com/)라는 사이트에 들어가서 확인해봤는데 사이트의 의도를 파악하지를 못해서 그냥 넘어갔다. `d3` 예제에서 한번 씩 **json** 파일을 읽어서 어떤 처리를 하는 것 같은데 그건가..?

일단 조사는 이렇게 마치고, 개발을 진행하면서 더 찾게되지 않을까 싶다.
