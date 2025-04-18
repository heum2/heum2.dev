---
title: React Native에서 Development, Staging, Production 설정
description: Development, Staging, Production 설정
tags:
  - react-native-config
  - react native
  - environment variables
date: 2021-07-19
thumbnailUrl: 2021/react-native-config/thumbnail.png
category: 💻 Dev
---

## Intro

**React Native**에는 작업하고 있는 환경에 따라서 **Development, Staging, Production**이 있다. 매번 서버 주소를 하드코딩으로 변경하기에는 부적절하기에 `react-native-config`라이브러리를 이용해 환경변수를 변경하는 방법을 찾아보았다.

## Setup

설치 방법은 아래와 같다.

```bash
yarn add react-native-config
```

react native 버전이 0.60 이상이면 autolinking도 가능하다. 그렇지 않다면 해당 링크를 [참조](https://github.com/luggit/react-native-config#setup)하자.

### Env file

프로젝트 루트폴더에 `.env.development`, `.env.staging` 및 `.env.production`파일을 생성한다.

```bash
// .env.development
API_URL=https://develop.com

// .env.staging
API_URL=https://staging.com

// .env.production
API_URL=https://production.com
```

### Setup for Android

`android/settings.gradle`맨 아래에 아래 내용을 추가한다.

```dart
+ include ':react-native-config'
+ project(':react-native-config').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-config/android')
```

`android/app/build.gradle`에 플러그인을 적용할 코드를 추가한다.

```dart
apply plugin: "com.android.application"
+ apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```

또, 빌드할 때 어떤 환경에서 빌드되는 지 알아야하기에 `envConfigFiles`를 추가해준다.

```dart
+ project.ext.envConfigFiles = [
+   productiondebug: ".env.production",
+   productionrelease: ".env.production",
+   developmentrelease: ".env.development",
+   developmentdebug: ".env.development",
+   stagingrelease: ".env.staging",
+   stagingdebug: ".env.staging"
+ ]

apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```

다음으로 `buildTypes`를 아래와 같이 설정한다.

```dart
buildTypes {
  debug {
    signingConfig signingConfigs.debug
+   matchingFallbacks = ['debug', 'release']
  }
  release {
    signingConfig signingConfigs.debug
    minifyEnabled enableProguardInReleaseBuilds
    proguardFiles getDefaultProguardFil  ("proguard-android.txt"), "proguard-rules  pro"
  }
 }
```

`buildTypes` 바로 아래에 `flavorDimensions`를 설정해준다.

```dart
flavorDimensions "default"
  productFlavors {
    production {}
    staging {
      // 여기서 빌드별 구성을 할 수 있습니다.
    }
    development {}
  }
```

이름들은 `productFlavors`를 기준으로 일치해야한다. 만약 `stagingdebug` 인 경우 앞글자가 **staging**, 뒷 글자가 **debug**이기에 `.env.staging`의 구성으로 App을 `debug`로 빌드시켜준다.

마지막으로 `package.json`에 `script`를 추가시켜주자.

```json
"script": {
	"android:staging": "react-native run-android --variant=stagingdebug",
	"android:staging-release": "react-native run-android --variant=stagingrelease",
	"android:dev": "react-native run-android --variant=developmentdebug",
	"android:dev-release": "react-native run-android --variant=developmentrelease",
	"android:prod": "react-native run-android --variant=productiondebug",
	"android:prod-release": "react-native run-android --variant=productionrelease",
}
```

`staging` 환경으로 `debug`를 실행하면 아래와 같다.

```bash
yarn android:staging
```

`staging` 환경으로 `release`를 실행하면 아래와 같다.

```bash
yarn android:staging-release
```

### Setup for iOS

ios는 schemes를 3개 만들면 된다. 예를 들어 MyApp이 Display name이라고 하면 **MyAppDev, MyAppStaging, MyAppProd**로 만들면 된다.

우선 xcode를 연 후, 정지버튼 오른쪽에 MyApp을 선택 후, Manage Scemes를 연다.

![](https://images.velog.io/images/heumheum2/post/9605bc75-93e4-4dcb-bc98-5e339befb28e/image.png)

해당 화면이 나오게 되는데, MyApp scheme의 이름을 MyAppDev로 변경해준다.

![](https://images.velog.io/images/heumheum2/post/f9076806-24f1-4fc6-895c-630a3956eb1e/image.png)

추가버튼을 통해서 Staging, Prod도 만든 뒤, Shared 체크박스에 체크가 되어있는지 확인한다.

![](https://images.velog.io/images/heumheum2/post/1a41b4d7-ad4b-4b26-a197-b99837d15342/image.png)

MyAppDev를 더블클릭을 하거나 Edit버튼을 선택한다.

![](https://images.velog.io/images/heumheum2/post/5814578a-7600-4324-97e2-3bf964e91ddc/image.png)

왼쪽 메뉴를 보면 Build가 있고 클릭해서 나온 메뉴들 중에 Pre-actions가 있을 것이다.

![](https://images.velog.io/images/heumheum2/post/61849273-0440-4c4e-b0eb-2509a2621717/image.png)

Shell은 냅두고 `Provide build settings from`에 프로젝트인 MyApp를 선택을 한 뒤, 아래와 같은 코드를 넣어준다.

```bash
# 설정한 scheme 이름에 맞게 development 부분을 변경해주세요.
cp "${PROJECT_DIR}/../.env.development" "${PROJECT_DIR}/../.env"
echo ".env.development" > /tmp/envfile
```

처음에는 cp 명령어를 이용해 `.env.development`를 `.env`로 복사했지만 문제가 development의 환경 값을 계속 가지고 있는 [이슈](https://github.com/luggit/react-native-config/issues/511)가 있었다.

`/tmp/envfile`에 환경 값을 지정해버리는 방식으로 문제를 해결했다.

마지막으로 `package.json`에 `script`를 추가시켜주자.

```json
"script": {
	"ios:dev": "react-native run-ios --scheme MyAppDev",
	"ios:prod": "react-native run-ios --scheme MyAppProd",
	"ios:staging": "react-native run-ios --scheme MyAppStaging",
}
```

`staging` 환경으로 빌드하는 방법은 아래와 같다.

```bash
yarn ios:staging
```

## Usage

```tsx
import Config from "react-native-config";

Config.API_URL;
```

## Link

[https://github.com/luggit/react-native-config](https://github.com/luggit/react-native-config)
[https://www.bigbinary.com/blog/handling-environment-specific-configurations-in-react-native](https://www.bigbinary.com/blog/handling-environment-specific-configurations-in-react-native)
