---
title: Windows PowerShell을 꾸며보자
description: 기본 터미널은 너무 칙칙하다. 이번에 PowerShell을 이쁘게 꾸며보자.
tags:
  - powershell
  - oh-my-posh
date: 2023-12-14
category: 💻 Dev
thumbnailUrl: oh-my-posh.png
---

기본으로 Windows에 내장되어있는 PowerShell의 디자인은 칙칙해서 내 마음에 들지 않는다.

![](https://upload.wikimedia.org/wikipedia/commons/d/d5/Windows_PowerShell_1.0_PD.png)

Mac에서는 iterm2와 같이 이쁘게 꾸며 볼 수 있으면 좋겠다는 생각이 들어 변경해보고자 한다.

---

# Oh My Posh

![](https://ohmyposh.dev/img/hero.png)
mac에는 `Oh My zsh`가 있다면 windows에는 `Oh My Posh`가 있다!

`Oh My Posh`는 프롬프트 문자열을 함수나 변수로 조정할 수 있는 기능을 갖춘 어떤 쉘에도 사용할 수 있는 사용자 정의 프롬프트 엔진이라고 [**공식문서**](https://ohmyposh.dev/docs/)에서 얘기하고 있다.

표준 터미널에서도 작동이 가능하지만 [**Windows Terminal**](https://apps.microsoft.com/detail/9N0DX20HK701?rtc=1&hl=ko-kr&gl=KR)을 설치해서 이용하는 것을 권장한다.

PowerShell 터미널을 열고 다음 명령을 실행해보자.

```powershell
winget install JanDeDobbeleer.OhMyPosh -s winget
```

이렇게 하면 설치가 완료가 된다.

## Nerd Font 설치

다음은 글꼴을 설치해야한다. 공식문서에서는 [**Nerd Font**](https://www.nerdfonts.com/)를 추천해준다.
링크로 들어가서 확인해보면 다양한 폰트들을 확인할 수 있다.
PowerShell 터미널에 다음 명령어를 실행하자.

```powershell
oh-my-posh font install
```

실행하게되면 다양한 폰트 리스트들이 나온다. 마음에 드는 폰트를 골라주면 된다.
나는 Naver에서 제작한 `D2 CodingLigature` 폰트를 사용했다.
만약 에러가 발생한다면 터미널을 종료 후 다시 실행하거나 관리자 권한으로 실행해보길 권장한다.

그리고 터미널에 `control` + `,` 키를 눌러주면 설정 창이 활성화 되는데, 프로필에 기본 값을 누른 뒤 모양을 누르면 글꼴이 보인다. 설치한 글꼴을 눌러서 저장을 눌러주면 적용 된 모습을 볼 수 있다.

## 프롬프트 변경

현재 사용하고 있는 쉘이 궁금하다면 다음 명령어를 실행하면 알 수 있다.

```powershell
oh-my-posh get shell
```

나는 PowerShell이기에 해당 방법으로 진행한다. 다른 쉘을 사용하고 있다면 [**여기**](https://ohmyposh.dev/docs/installation/prompt)를 참고하기 바란다.

다음 명령어를 실행시켜주자

```powershell
notepad $PROFILE
```

> 혹여나 에러가 발생했다면 `$PROFILE`을 생성해야 한다.
> `New-Item -Path $PROFILE -Type File -Force` 명령어를 실행시켜주자.

메모장이 켜졌다면 아래 한 줄을 입력해준다.

```
oh-my-posh init pwsh | Invoke-Expression
```

추가한 후 변경 사항을 적용하려면 프로필을 다시 로드해야한다.

```powershell
. $PROFILE
```

## 테마 변경

[**테마**](https://ohmyposh.dev/docs/themes)는 해당 링크를 참고해서 원하는 것을 보고 아래와 같은 명령어를 `notepad $PROFILE`에 입력하면 된다.

```powershell
oh-my-posh init pwsh --config 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/제목만변경.omp.json' | Invoke-Expression
```

나는 원격으로 테마를 적용시켰다.

![image](/images/oh-my-posh-done.png)

추가로 vscode에서 혹시 적용이 안되었다면 종료했다가 다시 실행해보면 적용되어 있는 모습을 볼 수 있을 것이다.
