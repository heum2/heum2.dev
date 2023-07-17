---
title: "Git으로 협업하기"
description: "Git을 이용해 협업하는 방법을 알아보자."
tags:
  - Git
date: 2019-12-13
series: "Git 공부"
category: "💻 Dev"
---

이번 세미나는 `git merge`, `git remote add`, `git push`, `git pull` 명령어와 **협업**이 중심 내용이였다.

## git merge

`git merge`는 작업하고 있는 **branch** 들을 합치고 싶을 때 사용하는 명령어다.

먼저 **master**에는 m_work.txt 파일을 **exp**에는 e_work.txt 파일을 만들어 서로 다르게 해주었다.

```shell:branch(master)
work.txt
m_work.txt
```

```shell:branch(exp)
work.txt
e_work.txt
```

```shell
$ git log --oneline --all --graph

- 63d2d07 (exp) working e2
- 682767a working e1
  | _ 3dd3a20 (HEAD -> master) working m2
  | _ 5836424 working m1
  |/
- 5bd3f73 working 3
- b023f81 working 2
- 247a290 working 1
```

`--oneline` 옵션은 한 줄로 보겠다는 옵션이고, `-all`은 모든 branch 및 tag의 기록을, `--graph`는 그래프로 보여주는 옵션이다.

`git log`를 보면 commit ID **5bd3f73** 이후로 서로 다른 길을 가고 있음을 보여준다. 이 둘을 한번 합쳐보겠다.

```shell
(master) # 현재 HEAD가 위치한 곳은 master이다.

$ git merge exp
Merge made by the 'recursive' strategy.
e_work.txt | 2 ++
1 file changed, 2 insertions(+)
create mode 100644 e_work.txt

$ git log --oneline --all --graph

- 81b2063 (HEAD -> master) Merge branch 'exp'
  |\
  | _ 63d2d07 (exp) working e2
  | _ 682767a working e1
- | 3dd3a20 working m2
- | 5836424 working m1
  |/
- 5bd3f73 working 3
- b023f81 working 2
- 247a290 working 1
```

`git merge`를 사용하고 `create mode 100644 e_work.txt` 부분을 보면, e_work.txt가 **master**에 새로 생겼음을 알 수 있다. 이로써 다른 파일은 순조롭게 합쳐지는 것을 알 수 있었다.

만약 같은 파일에서 **branch**들을 합치고 싶을 때는 어떻게 적용되는지 해보자.

```shell
(parent) (master) (exp)
0           0       0
0           0       0
0           m1      0
0           0       0
0           0       e1
0           0       0
0           m1      0
0           0       e1
0           0       0
0           m1      e1
```

우선 work.txt 파일을 만들고, **master**와 **exp**를 파일을 변경해 `git commit`해보았다.  
합치기 전에 HEAD가 누구를 가르키고 있는지에 따라서 `git merge <branch name>`의 branch name을 신경써줘야한다.

**master** 에서 **exp**를 합쳐보자.

```shell
$ git merge exp
Auto-merging work.txt # 자동으로 합쳐준다.
CONFLICT (content): Merge conflict in work.txt
Automatic merge failed; fix conflicts and then commit the result.
```

**conflict**이 났다고 알려준다. 왜 그런지 살펴보자.

```shell
(master|MERGING)
0
0
m1
0
e1
0
m1
e1
0
< < < < < < < HEAD
m1
=======
e1
> > > > > > > exp
```

다른 것들은 자동으로 합쳐줬지만 마지막 행은 **parent**와 비교했을 때 둘다 변경이 되었으니 개발자가 변경해달라고 요청하는 것이다.
**branch**를 보면 **master|MERGING** 로 되어있어, 합성중인 상태라는 것을 알 수 있다.
만약 합성을 취소하고 싶다면 `git merge --abort`명령어를 사용하면 합성 전으로 돌아갈 수 있다.
충돌 내용을 변경 후, 합성을 다시 진행하고 싶다면 `git commit`을 하면 새로운 `commit ID`를 만들어 완성본을 보여준다.

```shell
(master|MERGING)
$ git commit -am "working merge"
[master dfdca9c] working merge

(master)
$ git log --oneline --all --graph

- dfdca9c (HEAD -> master) working merge
  |\
  | \* 4708c05 (exp) working e1
- | ecae6e2 working -m1
  |/
- aec874d working 1
```

`git log`를 찍어서 보면 제대로 합성되었음을 확인 할 수 있다.

---

## GitHub

지금까지 내용들은 모두 local에서 이뤄진 것!
혹여나 노트북이 말썽을 일으켜 포맷을 해야된다면 지금까지 작업했던 것이 다 날아가게 된다.
그래서 우리는 [**GitHub**](https://github.com) 같은 remote storage(원격 저장소)를 이용해 백업을 해야한다.

![image](https://raw.githubusercontent.com/heum2/image-archive/main/loginGitHub.png)

아직, [**GitHub**](https://github.com)에 가입 하지 않았다면 회원가입을 하자.

---

![image](https://raw.githubusercontent.com/heum2/image-archive/main/setGitHub.png)

**\+** 를 누르게 되면 **New repository**가 보인다. 프로젝트를 올릴 때 자주 가게 될 녀석이다.

---

![image](https://raw.githubusercontent.com/heum2/image-archive/main/createGitHub.png)

**Repository name**에 진행중인 프로젝트 이름을 적어주고, 프로젝트의 성향에 따라 Public, Private을 설정하면 될 것 같다. README는 주로 프로젝트 설명서이다. 마크다운 형식으로 작성 할 수 있다고 하는데 아직 작성해본 적은 없다.
**Repository name**을 TestRepository라고 적고 생성해보았다.

---

![image](https://raw.githubusercontent.com/heum2/image-archive/main/testGitHub.png)

이제 local storage에 remote storage 경로를 지정해주면 연결은 끝이 난다.

---

## git remote add

`git remote add <remote name><HTTPS or SSH>` remote storage에 연결해주기 위한 명령어이다.
`<remote name>`는 remote storage의 이름을 적는데, 대부분 origin을 많이 쓴다고 한다.

![image](https://raw.githubusercontent.com/heum2/image-archive/main/HttpsOrSshGitHub.png)

`<HTTPS or SSH>`는 적혀져 있으니 HTTPS로 할 것인지 SSH로 할 것인지 정해주면 된다.
`git merge` 했던 프로젝트와 연결해보겠다.

```shell
$ git remote add origin git@github.com:HeumHeum2/TestRepository.git
```

연결이 되었는지 확인해보고자 프로젝트를 올려봐야 알 것 같다.

---

## git push

`git push -u <remote name> <branch>` 명령어는 프로젝트를 **HEAD**가 가르키고 있는 **branch**와 같은 이름으로 된 remote storage의 **branch**에 업로드 해주는 역할을 한다.

```shell
$ git push -u origin master
The authenticity of host 'github.com (15.164.81.167)' can't be established.
RSA key fingerprint is SHA256: ###
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'github.com,15.164.81.167' (RSA) to the list of known hosts.
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

진행하다보면 이런 창이 나올 수도 있다. SSH Key가 나의 계정에 등록되지 않았기에 발생하는 Permission denied이다. 당황하지 말고, 내 계정의 **Settings**을 들어가보자.

![image](https://raw.githubusercontent.com/heum2/image-archive/main/sshSetGitHub.png)

들어가게 되면 이런 창이 나오는데, 혹시 SSH Key를 어디서 확인하는지 모르는 경우 [여기](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)를 클릭해 진행하면 될 것이다.

```shell
$ git push -u origin master
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 12 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (12/12), 853 bytes | 426.00 KiB/s, done.
Total 12 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), done.
To https://github.com/HeumHeum2/TestRepository.git

- [new branch] master -> master
  Branch 'master' set up to track remote branch 'master' from 'origin'.

$ git log --oneline
dfdca9c (HEAD -> master, origin/master) working merge
4708c05 (exp) working e1
ecae6e2 working -m1
aec874d working 1
```

![test](https://raw.githubusercontent.com/heum2/image-archive/main/pushGitHub.png)

SSH KEY 등록이 끝나고 push를 하면 remote storage에 파일이 업로드 된 모습과, `git log`에서는 **origin/master**가 생긴 것을 볼 수 있다.

---

## git pull

`git push`가 remote storage에 업로드 하는 명령어라면, `git pull`은 다운로드 하는 명령어이다.
`git pull`도 처음에 remote storage를 연결 시켜줘야하며, 주로 협업 진행 중 일을 시작할 때 가장 많이 사용되는 명령어라고 한다.

---

## git clone

`git clone <HTTPS OR SSH>` 는 `.git` 디렉토리가 없어도 remote storage에 업로드 되어있는 버전을 그대로 가져와 작업 할 수 있게 도와주는 명령어이다.

---

## 마치며

3일동안의 Git 세미나가 끝이 났다...
Git의 사용법을 몰라 두려워만 하고 있었는데 세미나를 통해 Git이 너무 편리한 녀석인 것을 알게 되었다.
모르면 정말 불편하지만 알게되면 정말 편리한 Git.. ~~그저 갓~~
다시 한번 복습하기 위해 처음으로 블로그에 글을 써봤다. 남들에게 알려준다는 생각으로 글을 쓰다보니 내가 어떤 것을 모르는지 깨닫게 된 계기와 지식을 공유 할때 내가 즐거워한다는 것을 깨달았다.
React를 현재 공부중인데, 지식을 공유한다고 생각하고 하나 씩 글을 써 나가야겠다.
