---
title: 여행 앨범 프로젝트 구상
description: 여행에서 사진은 빠질 수 없다. 일상으로 돌아온 후 사진을 보며 지친 일상을 위로를 받기도 한다. 여행 사진도 찍고 기록도 할 수 있는 나만의 여행 앨범 프로젝트를 구상해보자.
date: 2024-05-01
tags:
  - 토이 프로젝트
series: 여행 앨범 프로젝트
thumbnailUrl:
category: 💻 Dev
---

> 여행에서 사진은 빠질 수 없다. 일상으로 돌아온 후 사진을 보며 지친 일상을 위로를 받기도 한다.
> 여행 사진도 찍고 기록도 할 수 있는 나만의 여행 앨범 프로젝트를 구상해보자.

## 기능 정리

여행 앨범이다 보니 아무래도 사진 업로드와 기록은 필수로 들어갈 것 같다.
그리고 사진에는 메타데이터가 있기에 날짜와 시간 정보, 카메라 정보, 카메라 설정, 위치 정보를 알 수 있다.
그렇기에 날짜, 시간, 위치, 카메라 정보를 이용해 UI에 표한하면 좋을 것 같다.

1. 여행 일지 페이지:

- 포스팅 기능: 사용자가 여행 경험을 텍스트와 사진으로 포스팅하는 기능. 각 포스트에는 제목, 날짜, 내용 입력 필드가 포함.
- 사진 업로드: 사용자가 여행 중 찍은 사진을 업로드하는 기능. 업로드한 사진에서 자동으로 메타데이터(위치, 카메라 모델 등)를 추출

2. 지도 통합:

- 메타데이터 추출: 업로드된 사진에서 메타데이터를 추출하여 위치 정보를 얻는다.
- 인터랙티브 세계 지도: 업로드된 사진의 메타데이터에서 추출한 위치 정보를 기반으로 세계 지도에 마커를 추가 각 마커는 그 위치에서 찍은 사진과 연결이 필요
- 지도 필터링 옵션: 사용자가 특정 지역이나 카메라로 찍은 사진만 보고 싶을 때 필터를 적용

3. 반응형 웹 디자인:

- 모바일과 데스크탑 호환: 사용자가 어떤 기기에서든 쉽게 접근하고 사용할 수 있도록 디자인합니다.

나 뿐만 아니라 다른 사람들도 이용할 수 있는 서비스를 만들고 싶기에 로그인 기능이 필요할 것 같다.

- 회원가입/로그인 페이지: 사용자가 이메일과 비밀번호를 사용하여 계정을 생성하고 로그인할 수 있는 페이지
- 소셜 미디어 로그인: 페이스북, 구글 등의 소셜 미디어 계정을 통한 로그인 옵션을 제공하여 사용자의 편의 증가

사용자들이 사용하니 관련 보안과 데이터 또한 관리해야한다.

- 데이터 암호화: 사용자 데이터와 비밀번호는 암호화하여 안전하게 저장이 필요
- 개인정보 보호 정책: 사용자의 개인 정보 보호를 위해 명확한 정책을 마련

## 페이지 레이아웃 설계

기능은 어느정도 정리된 것 같으니 어떤 페이지가 있을 지 정리해본다.

- 홈페이지: 웹사이트의 목적과 기능을 간략히 소개
- 지도 페이지: 사용자의 여행지가 지도에 표시되는 페이지
- 로그인/회원가입 페이지: 사용자가 쉽게 로그인하고 계정을 생성할 수 있어야함
- 대시보드: 로그인 후 사용자가 자신의 여행 일지를 관리할 수 있는 개인 페이지
- 여행 일지 페이지: 사용자가 여행 경험을 기록하고 사진을 업로드할 수 있는 페이지

우선 이렇게 개발을 진행해보고 디자인은 좀 더 검색을 해보면서 마음에 드는 디자인들을 하나씩 골라보면 좋을 것 같다.