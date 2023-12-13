---
title: TypeScript + Express + typeORM 세팅
description: TypeScript와 Express 그리고 typeORM의 세팅하는 방법을 알아보자
tags:
  - JavaScript
  - backend
  - express
  - typeORM
date: 2020-09-11
category: 💻 Dev
---
이번 프로젝트에서 Backend를 담당하게 되었다. 토이 프로젝트로 `Express`, `Sequelize` 를 사용했기에 금방 할 줄 알았으나, 너무 오래 걸렸다.. 
나와 같은 사람들이 늪에 빠지지 않길 바라며 글을 작성한다.

# 폴더 구조

```
.
├── src
│   ├── controller
│   │   └── users.ts
│   ├── entity
│   │   └── User.ts
│   ├── migration
│   ├── subscriber
│   ├── routes
│   │   └── users.ts
│   ├── tests
│   │   └── app.test.ts
│   │   └── user.test.ts
│   ├── index.ts
│   ├── server.ts
│   ├── uploads
│   └── utils
│       └── createTypeormConn.ts
├── README.md
├── .env
├── jest.config.js
├── node_modules
├── ormconfig.js
├── package-lock.json
├── package.json
└── tsconfig.json
```

---

# TypeScript

## 설치

우선 `npm`으로 `typescript`를 설치한다.

```json
npm i -D typescript
```

## 설정

설치가 완료가 되었다면 `tsconfig.json`를 추가한 후 자신의 상황에 맞게 설정하면 된다.

```json
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["ES5", "ES6"],
    "target": "ES6",
    "module": "commonjs",
    "moduleResolution": "Node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  },
  "exclude": ["node_modules"]
}
```

`tsconfig.json` 에서 아래 두 줄은 `typeORM` 공식 문서에서 추가하라는 옵션이다. 

간략하게 설명하면 `typeORM`에서 `reflect-metadata` 라이브러리를 사용하는데, 해당 라이브러리의 지원을 돕기 위해 아래의 두 줄이 필요하다. 자세한 내용은 [[참고](https://www.typescriptlang.org/docs/handbook/decorators.html)] 하기 바란다.

```json
// tsconfig.json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
}
```

---

# TypeORM

## 설치

`typeorm, express, mysql, reflect-metadata`를 설치 한다.

```bash
npm i typeorm express mysql reflect-metadata
```

`typescript` 지원도 필요하기에 아래와 같이 설치한다. ( typeORM은 typescript 지원함 )

```bash
npm i -D @types/express @types/node
```

## 설정

`typeORM`을 설치 했으니 `ormconfig.json` 파일을 추가해 아래와 같이 입력한다.

```json
// ormconfig.json
[
  {
    name: "test",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "typeorm-test",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/entity/*.ts"],
    subscribers: ["src/migration/*.ts"],
    migrations: ["src/migration/*.ts"],
  },
  {
    name: "production",
    type: "mysql",
    host: '',
    port: '',
    username: '',
    password: '',
    database: '',
    synchronize: false,
    logging: true,
    entities: ["dist/entity/*.js"],
    subscribers: ["dist/migration/*.js"],
    migrations: ["dist/migration/*.js"],
    migrationsTableName: "migrations",
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
];
```

배열로 입력을 했는데, 이는 이름에서 유추할 수 있듯 테스트 할 때 사용하는 DB와 배포하고 나서 사용하는 DB를 나눈 것이다. 각자 환경에 맞게 설정 하면 된다. `.env`를 사용하는 유저는 `ormconfig.js` 를 사용하면 된다. 

테스트 할 때 사용하는 DB에서는 `synchronize: true, logging: false, dropSchema: true` 옵션이 보인다. 공식 문서에서는 다음과 같이 설명한다.

### **synchronize : boolean**

- 참 / 거짓에 따라 해당 스키마의 테이블 / 컬럼들을 추가 및 변경 해준다.
- 테스트 환경에서만 사용하고, 배포할 경우엔 사용 금지.

### **logging : boolean**

- 참 / 거짓에 따라 query log 들을 보여 준다.

### **dropSchema : boolean**

- 참 / 거짓에 따라 서버가 재 실행 될 때마다 해당 스키마의 테이블들을 전부 삭제한다.
- 테스트 환경에서만 사용하고, 배포할 경우엔 사용 금지. ( 데이터가 전부 날아감 )

그 다음 줄은 `entities, subscriber, migrations`이 있다. 해당 코드가 들어있는 폴더 경로를 입력해 주면 어느정도 설정은 끝이다. 옵션에 대해 자세히 알고 싶다면 [[여기](https://typeorm.io/#/connection-options)]를 클릭해 확인해 보기 바란다.

## Entity

`/entity` 폴더 안에 `User.ts` 파일을 추가한다.

```tsx
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

}
```

`Entity`는 데이터베이스 테이블을 만드는데 사용한다. 

`Column`은 테이블 속성을 설정 할 수 있다. 

`PrimaryGeneratedColumn`은 auto increment가 설정 된 기본 키이다. `PrimaryGeneratedColumn('uuid')`로 고유의 문자열을 가질 수도 있다.

## 관계 테이블

`/entity` 폴더 안에 `Photo.ts` 파일을 추가한다.

```tsx
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  name!: string;

  @Column("text")
  description!: string;

  @Column()
  filename!: string;

  @Column("double")
  views!: number;

  @Column()
  isPublished!: boolean;

  @ManyToOne(type => User, user => user.photos)
  user!: User;

}
```

유저와 사진의 관계는 한 명의 유저가 여러 장의 사진을 찍을 수 있고, 한 장의 사진은 한 명의 유저만 가지고 있기에 1:N 관계이다. 

그렇기에 주가 되는 테이블은 User이며 Photo 테이블에서 userId 값을 가져야 한다.

Photo ← ManyToOne ←User 이런 식으로 **한 명의 유저가 많은 사진을 가지고 있음**을 해석 하면 된다.

`ManyToOne`은 매개 변수 **첫 번째 인자**로 `typeFunctionOrTarget` 또는 `(type:any) ⇒ ObjectType<T>`를 받는다고 나와있다. 여기서는 후자를 선택해 User를 넣는다.

**두 번째 인자**로 `inverseSide` 또는 `(object: T) ⇒ any`를 받는다고 한다. 똑같이 후자를 선택해 `user ⇒ user.photos` 를 사용한다.

`/entity` 폴더 안에 `User.ts` 파일에 `OneToMany`를 추가해준다.

```tsx
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  @OneToMany(type => Photo, photo => photo.user)
  photos!: Photo[];
}
```

이렇게 관계를 만들어주고 나면 아래와 같이 사용할 수 있다.

```tsx
const user = new User();
user.firstName = 'Heum';
user.lastName = '2';
user.age = 99;
await connection.manager.save(user);

const photo = new Photo();
photo.name = '사진이름';
photo.description: '사진 설명입니다.';
photo.filename = '파일 이름';
photo.views = 123.12;
photo.isPublished = true,
photo.user = photo;

const user2 = new User();
user2.firstName = 'Heum';
user2.lastName = '3';
user2.age = 11;
user2.photos = [photo];
await connection.manager.save(user2);
```

더 많은 관계 테이블의 연결 방법은 [[여기](https://typeorm.io/#/relations)]를 클릭해 확인하기 바란다.

## DB 연결

`/utils` 폴더 안에 `createTypeormConn.ts` 을 추가한다.

```tsx
// ... utils/createTypeormConn.ts
import { getConnectionOptions, createConnection } from 'typeorm';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return await createConnection({...connectionOptions, name: "default"});
};
```

### getConnectionOptions

`ormconfig.json`에서 설정한 옵션들을 가지고 있다. 매개 변수로 **ConnectionName**을 받기에 `process.env.NODE_ENV`를 이용해 환경에 맞게 DB를 사용할 수 있다.

### createConnection

DB와 연결을 만들어주는 함수이다. 매개 변수로 **ConnectionOptions**을 받는다. 그렇기에 `connectionOptions`를 넣어 주면 된다.
하지만 안타깝게도 에러가 난다. ~~왜??~~
연결할 때 default 이름을 가진 옵션이 없으면 에러가 난다고 한다. 그래서 이름을 변경한 코드이다.

모든 DB를 연결한다고 하면 `getConnectionOptions()`로 모든 옵션 설정을 가져온 뒤, `createConnection` 매개 변수로 넣어 주면 된다. 나는 단일 db 연결만 원하기에 이렇게 설정했다.

# 참고
https://velog.io/@josworks27/TypeScript-Express-typeORM으로-서버-세팅하기1
https://youtu.be/Reb7ISQZCvA
https://typeorm.io/