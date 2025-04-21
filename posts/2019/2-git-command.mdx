---
title: Git 명령어
description: Git 명령어에 대해 자세히 알아보자.
tags:
  - Git
date: 2019-12-12
series: Git 공부
category: 💻 Dev
thumbnailUrl: 2019/thumbnail.png
---

이번 세미나의 중심 내용은 `git reset`, `git checkout` 명령어와 **HEAD**, **master** 였다.

## git log

1일차에서 배운 `git log`는 기록 된 메시지들을 볼 수 있는 명령어였다.

```shell
$ git log
commit 1b5db033fac67ab86f6f166c3ad6e101411cd906 (HEAD -> master)
Author: HeumHeum2 <jwh6295@gmail.com>
Date: Wed Dec 11 15:23:47 2019 +0900

    working 5

commit 103e78de24c45cd227f489bc255c831e6cdb09e0
Author: HeumHeum2 <jwh6295@gmail.com>
Date: Wed Dec 11 15:23:31 2019 +0900

    working 4

```

`git log`를 실행시키게 되면 맨 처음 **HEAD**를 본다고 한다. **HEAD -> master** 이 형태를 볼 수 있는데, **HEAD**가 **master**를 가르키고 있구나 정도만 이해하면 될 것 같다.싣

commit ID는 commit 옆에 있는`1b5db033fac67ab86f6f166c3ad6e101411cd906` 부분으로 Author email, files, commit message, parent, Date 값 들을 **Hash**로 암호화(Encryption) 한 것이다.

---

## git reset

`git reset`은 삭제와 복구를 할 수 있는 명령어라고 한다.
해당 명령어 사용 방법은 `git reset <commit id>`로 현재 기록하고 있었던 파일들이 동작을 이상하게 하거나 삭제해야 할 경우, 이전 기록의 commit ID로 복구가 되고 이 후에 기록했던 파일들은 삭제가 된다.

```shell
$ git reset 103e78de24c45cd227f489bc255c831e6cdb09e0
Unstaged changes after reset:
M work.txt
M work3.txt # 파일 내용들이 변경되었음을 확인할 수 있음

$ git log
commit 103e78de24c45cd227f489bc255c831e6cdb09e0 (HEAD -> master)
Author: HeumHeum2 <jwh6295@gmail.com>
Date: Wed Dec 11 15:23:31 2019 +0900

    working 4

```

여기서 **master**가 **1b5db...** 에서 **103e7...**로 commit ID가 변경되었음을 알 수 있었다. 그런데 **1b5db...**은 진짜로 삭제되었을까??  
다시 `git reset`을 사용해서 확인해보자.

```shell
$ git reset 1b5db033fac67ab86f6f166c3ad6e101411cd906
Unstaged changes after reset:
M work.txt
```

work.txt가 변경되었음을 알려준다. `git log`를 찍어서 확인해보면

```shell
$ git log
commit 1b5db033fac67ab86f6f166c3ad6e101411cd906 (HEAD -> master)
Author: HeumHeum2 <jwh6295@gmail.com>
Date: Wed Dec 11 15:23:47 2019 +0900

    working 5

commit 103e78de24c45cd227f489bc255c831e6cdb09e0
Author: HeumHeum2 <jwh6295@gmail.com>
Date: Wed Dec 11 15:23:31 2019 +0900

    working 4

```

다시 복원이 되었다. 즉, **Git 불변성**을 확인 할 수 있었다.  
만약 `git reset`으로 이전 버전으로 복구한 후 `git commit -m`을 했을 때 어떻게 되는지는 각자 해보면 좋을 것 같다.

---

## git checkout

`git checkout`은 시간여행을 해주는 명령어라고 설명해주셨다. 명령어 사용법은 `git reset`과 동일하다.

```shell
$ git checkout 103e78d
Note: switching to '103e78d'. # 103e78d라는 commend ID로 변경되었다는 것을 알 수 있다.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

git switch -c <new-branch-name>

Or undo this operation with:

git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 103e78d working 4 # commend ID로 인해 파일들이 변경되었음을 알려줌.
M work.txt
```

`git log`를 찍어 기록 확인해보자.

```shell


$ git log
commit 103e78de24c45cd227f489bc255c831e6cdb09e0 (HEAD)
Author: HeumHeum2 <jwh6295@gmail.com>
Date: Wed Dec 11 15:23:31 2019 +0900

    working 4

```

`git checkout`을 했더니 **HEAD -> master**가 **HEAD**로 변경 되어있음을 볼 수 있다.  
그렇다면 **master**는 어디에 있을까?  
`git log`에 `--all` 옵션을 붙여서 찾아보자.

```shell
$ git log --all
commit 1b5db033fac67ab86f6f166c3ad6e101411cd906 (master)
Author: HeumHeum2 <jwh6295@gmail.com>
Date: Wed Dec 11 15:23:47 2019 +0900

    working 5

commit 103e78de24c45cd227f489bc255c831e6cdb09e0 (HEAD)
Author: HeumHeum2 <jwh6295@gmail.com>
Date: Wed Dec 11 15:23:31 2019 +0900

    working 4

```

**master**를 보면 최근에 기록한 곳의 commit ID를 가지고 있다고 한다.  
여기에서 **master**는 최근 `git commit`한 commit ID를 가진다는 것, **HEAD**는 현재 작업하고 있는 위치를 알려준다는 것을 알 수 있었다.  
현재 진행중인 작업을 최근에 작업한 곳으로 이동하고 싶다면 `git checkout master`를 사용하면 된다.  
만약 `master`가 아닌 commend ID로 입력하게 되면 어떻게 되는지는 직접 해보면 좋을 것 같다.

---

## git branch

마지막으로 **master**는 **branch**라고 불려진다. **분기**라는 뜻으로 게임에서 어느정도 캐릭터를 육성하다가 직업을 선택하는 순간이 온다. 그 순간을 **분기**라고 하는데, 프로젝트를 만들 때에도 **분기**가 찾아온다. `git branch`을 사용하면 프로젝트를 하나 더 복사하지 않아도 되는 장점이 생긴다. 명령어 사용 방법은 `git branch  <branch name>`이다.

```shell
$ git branch exp

$ git log
commit 1b5db033fac67ab86f6f166c3ad6e101411cd906 (HEAD -> master, exp)
Author: HeumHeum2 <jwh6295@gmail.com>
Date: Wed Dec 11 15:23:47 2019 +0900

    working 5

commit 103e78de24c45cd227f489bc255c831e6cdb09e0
Author: HeumHeum2 <jwh6295@gmail.com>
Date: Wed Dec 11 15:23:31 2019 +0900

    working 4

```

branch로 master, exp가 있는 것을 볼 수 있다.

---

## 마치며

내일은 **branch**가 여러 개 있고, 작업하고 있는 **branch**가 성공했을 경우 **branch**를 합치고 싶을 때 사용하는 명령어를 배운다고 한다.
**HEAD**와 **master**가 무엇인지 알게되었고, Git은 변하지 않고 언제나 기록하고 있으니 두려움 없이 `git chechout` 과 `git reset`을 많이 써봐야겠다.
벌써 Git이 친구 같다.
