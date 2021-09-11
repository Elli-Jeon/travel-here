# Travel-here

✈ travel-here는 전 세계의 여행후기글을 볼 수 있는 여행후기 플랫폼입니다.

<a href="https://www.figma.com/file/dTugkNDMoHBZrPUQvRB7hS/TravelApp" target="_blank">FIGMA 프로토타입</a>

<br>

## 목차

1. [팀원 소개](#1)
2. [기술 스택](#2)
3. [프로젝트 설치 및 실행 방법](#3)
4. [폴더 디렉토리](#4)
5. [프로젝트 기능 설명](#5)
6. [버그](#6)
7. [아쉬운 점 / 개선할 점](#7)

<br>

## 1. 팀원 <a id="1"></a>

- 전상우(팀장)
- 김현수
- 박현정
- 임상기

<br>

## 2. 기술 스택 <a id="2"></a>

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=black">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=black">
<img src="https://img.shields.io/badge/Redux_Thunk-a88bd6?style=for-the-badge&logo=Redux&logoColor=black">
<img src="https://img.shields.io/badge/styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=black">
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black">

<br>
<br>

## 3. 프로젝트 설치 및 실행 방법 <a id="3"></a>

```js
$ npm install
$ yarn install
$ yarn start
```

<br>

## 4. 폴더 디렉토리 <a id="4"></a>

```
📦public
┗ 📜index.html
📦src
┣ 📂assets
┃ ┗ 📂images
┃ ┃ ┣ 📜background.jpeg
┃ ┃ ┣ 📜blur.png
┃ ┃ ┗ 📜logo.png
┣ 📂components
┃ ┣ 📂Category
┃ ┃ ┣ 📜Category.jsx
┃ ┃ ┣ 📜Category.style.js
┃ ┃ ┗ 📜CategorySkeleton.jsx
┃ ┣ 📂Comment
┃ ┃ ┣ 📜Comment.jsx
┃ ┃ ┣ 📜Comment.style.js
┃ ┃ ┣ 📜CommentList.jsx
┃ ┃ ┗ 📜styleConstants.js
┃ ┣ 📂GreetingCard
┃ ┃ ┣ 📜GreetingCard.jsx
┃ ┃ ┗ 📜GreetingCard.style.js
┃ ┣ 📂Header
┃ ┃ ┣ 📜Header.jsx
┃ ┃ ┗ 📜Header.style.js
┃ ┣ 📂Loading
┃ ┃ ┗ 📜Loading.jsx
┃ ┣ 📂LoginHelp
┃ ┃ ┣ 📜LoginHelp.jsx
┃ ┃ ┗ 📜LoginHelp.style.js
┃ ┣ 📂LoginModal
┃ ┃ ┣ 📂footer
┃ ┃ ┃ ┣ 📜LoginFooter.jsx
┃ ┃ ┃ ┗ 📜LoginFooter.style.js
┃ ┃ ┣ 📂header
┃ ┃ ┃ ┣ 📜LoginHeader.jsx
┃ ┃ ┃ ┗ 📜LoginHeader.style.js
┃ ┃ ┣ 📜LoginModalOpen.jsx
┃ ┃ ┗ 📜LoginModalOpen.style.js
┃ ┣ 📂Logo
┃ ┃ ┣ 📜Logo.jsx
┃ ┃ ┗ 📜Logo.style.js
┃ ┣ 📂Mypage
┃ ┃ ┣ 📂bookmark
┃ ┃ ┃ ┣ 📜Bookmark.jsx
┃ ┃ ┃ ┗ 📜Bookmark.style.js
┃ ┃ ┣ 📂comment
┃ ┃ ┃ ┣ 📜Comment.jsx
┃ ┃ ┃ ┗ 📜Comment.style.js
┃ ┃ ┣ 📂info
┃ ┃ ┃ ┣ 📜Info.jsx
┃ ┃ ┃ ┗ 📜Info.style.js
┃ ┃ ┣ 📂Password
┃ ┃ ┃ ┣ 📜Password.jsx
┃ ┃ ┃ ┗ 📜Password.style.js
┃ ┃ ┣ 📂post
┃ ┃ ┃ ┣ 📜Post.jsx
┃ ┃ ┃ ┗ 📜Post.style.js
┃ ┃ ┣ 📜Mypage.jsx
┃ ┃ ┣ 📜Mypage.style.js
┃ ┃ ┗ 📜styleConstatns.js
┃ ┣ 📂NavBar
┃ ┃ ┣ 📜NavBar.jsx
┃ ┃ ┗ 📜NavBar.style.js
┃ ┣ 📂NavLinks
┃ ┃ ┣ 📜NavLinks.jsx
┃ ┃ ┗ 📜NavLinks.style.js
┃ ┣ 📂Post
┃ ┃ ┣ 📂PostSlider
┃ ┃ ┃ ┣ 📜ContentPlaceholder.js
┃ ┃ ┃ ┣ 📜PostSlider.jsx
┃ ┃ ┃ ┗ 📜PostSlider.style.js
┃ ┃ ┣ 📜NoneMember.jsx
┃ ┃ ┣ 📜Post.jsx
┃ ┃ ┣ 📜Post.style.js
┃ ┃ ┗ 📜styleConstants.js
┃ ┣ 📂PostCard
┃ ┃ ┣ 📜ContentPlaceholder.js
┃ ┃ ┣ 📜PostCard.jsx
┃ ┃ ┗ 📜PostCard.style.js
┃ ┗ 📂Write
┃ ┃ ┣ 📂WriteBtn
┃ ┃ ┃ ┣ 📜WriteBtn.jsx
┃ ┃ ┃ ┗ 📜WriteBtn.style.js
┃ ┃ ┗ 📂WriteModal
┃ ┃ ┃ ┣ 📜UpdateModal.jsx
┃ ┃ ┃ ┣ 📜WriteModal.jsx
┃ ┃ ┃ ┗ 📜WriteModal.style.js
┣ 📂hooks
┃ ┗ 📜useAuth.js
┣ 📂pages
┃ ┣ 📂Board
┃ ┃ ┣ 📜Board.jsx
┃ ┃ ┗ 📜Board.style.js
┃ ┣ 📜CategoryList.jsx
┃ ┣ 📜Home.jsx
┃ ┣ 📜Login.jsx
┃ ┣ 📜LoginFind.jsx
┃ ┣ 📜MyPage.jsx
┃ ┣ 📜NotFound.jsx
┃ ┣ 📜NotFound.style.js
┃ ┗ 📜Write.jsx
┣ 📂store
┃ ┣ 📂apis
┃ ┃ ┣ 📜board.js
┃ ┃ ┣ 📜comment.js
┃ ┃ ┣ 📜delete.js
┃ ┃ ┣ 📜post.js
┃ ┃ ┣ 📜postLike.js
┃ ┃ ┗ 📜userLike.js
┃ ┣ 📂modules
┃ ┃ ┣ 📜board.js
┃ ┃ ┣ 📜bookmark.js
┃ ┃ ┣ 📜category.js
┃ ┃ ┣ 📜comment.js
┃ ┃ ┣ 📜delete.js
┃ ┃ ┣ 📜login.js
┃ ┃ ┣ 📜mypageBookmark.js
┃ ┃ ┣ 📜mypageComment.js
┃ ┃ ┣ 📜mypagePost.js
┃ ┃ ┣ 📜nav.js
┃ ┃ ┣ 📜postLike.js
┃ ┃ ┣ 📜user.js
┃ ┃ ┣ 📜userLike.js
┃ ┃ ┗ 📜view.js
┃ ┗ 📜index.js
┣ 📂styles
┃ ┣ 📜Background.js
┃ ┗ 📜GlobalStyle.js
┣ 📂utils
┃ ┗ 📜getDate.js
┣ 📜App.js
┣ 📜auth_service.js
┣ 📜firebase.js
┣ 📜history.js
┗ 📜index.js
```

<br>

## 5. 프로젝트 기능 설명 <a id="5"></a>

<hr />

### 로그인

<details>
  <summary>상세보기</summary>

#### 이메일과 비밀번호로 회원가입

![회원가입(이메일)](https://user-images.githubusercontent.com/70390705/132844269-c65c4ce8-5258-4201-a793-44dc995242a9.gif)

#### 이메일과 비밀번호로 로그인

![로그인(이메일)](https://user-images.githubusercontent.com/70390705/132844272-6fd218f7-bd29-4ad9-b325-c94abec20b14.gif)

#### SNS 로그인

![SNS로그인](https://user-images.githubusercontent.com/70390705/132844271-a5940536-5faf-42c1-9fb4-593f81f5a79b.gif)

#### 재설정 이메일 보내기를 통해 비밀번호 변경

![비밀번호 재설정(이메일)](https://user-images.githubusercontent.com/70390705/132844253-a75dd3a3-7cf0-49e7-bb19-0205bb588232.gif)

</details>

<hr />

### 글쓰기

<details>
  <summary>상세보기</summary>

#### 글등록

![글쓰기](https://user-images.githubusercontent.com/64853423/132875402-d9ff8fc1-b00f-4a33-8281-a456a025b72d.gif)

#### 사진 추가

![사진추가](https://user-images.githubusercontent.com/64853423/132875541-edf81368-d9b6-4963-a6fd-bed40a4e8d8b.gif)

#### 사진 삭제

![사진삭제](https://user-images.githubusercontent.com/64853423/132875556-faf4a801-0c25-4469-941a-cb651cd1f458.gif)

#### 글등록

![글등록](https://user-images.githubusercontent.com/64853423/132875577-385d9f76-ac3c-4673-9ac9-6d29ff2a50f4.gif)

#### 취소

![취소](https://user-images.githubusercontent.com/64853423/132875585-06c828c5-cdc6-4ffc-8761-0af2fb956f5d.gif)

</details>

<hr />

### 게시판 (Board)

<details>
  <summary>상세보기</summary>

#### 지역별 게시글 모아보기

![1](https://user-images.githubusercontent.com/68575268/132719758-2d850047-15f5-4ca7-aa17-906db95c3ff2.gif)

#### 보고 싶은 게시글 선택하여 살펴보기

![Animation](https://user-images.githubusercontent.com/68575268/132719768-569010ba-cf96-4f05-a61d-9e9cbdbde56c.gif)

</details>

<hr />

### 게시글 (Post)

<details>
  <summary>상세보기</summary>

#### 댓글, 좋아요, 북마크, 조회수 기능

![댓글 좋아요 북마크](https://user-images.githubusercontent.com/68575268/132719775-c3c39141-d7b4-4378-a15e-af001d826d67.gif)

#### 본인일 경우에만 수정, 삭제가 가능합니다.

![userCheck](https://user-images.githubusercontent.com/76847993/132731934-c1f3b034-435e-4598-a0c3-bcc31b1a0107.gif)

#### 게시글 수정, 삭제 기능

![게시글수정삭제](https://user-images.githubusercontent.com/76847993/132734801-c0b5a8ff-a8e9-48ea-85b5-ec7d9c40de0f.gif)

#### 댓글, 수정 삭제 기능

![댓글수정삭제!](https://user-images.githubusercontent.com/76847993/132733887-c9871c4c-8577-4604-b872-4fb3ed654c85.gif)

</details>

<hr />

### 마이페이지

<details>
  <summary>상세보기</summary>

#### 전체적인 디자인입니다. 왼쪽창에서 같은 목록, 또는 오른쪽 창에서 < 아이콘을 누르면 창이 닫힙니다.

![total_design](https://user-images.githubusercontent.com/76847993/132723722-3d5cf309-8c99-49fb-8d27-c646b82e1710.gif)

#### 닉네임, 프로필사진 수정 기능입니다. <br />프로필사진은 기본사진이 아닐 때 수정할 경우 '기본사진으로 변경' 버튼이 추가됩니다.

![change2!](https://user-images.githubusercontent.com/76847993/132722552-1ce85841-1b46-4d2b-88a0-cde033609535.gif)

#### 수정사항은 게시글쓰기, 게시글, 댓글에서 모두 바로 반영됩니다.

![즉시반영!](https://user-images.githubusercontent.com/76847993/132729254-6f2a93d3-24e0-4417-b5bb-00ccd9b8d19c.gif)

#### 내가 쓴 글, 댓글, 찜 목록을 클릭하면 해당 게시글로 이동합니다.

![move](https://user-images.githubusercontent.com/76847993/132723763-782ae28d-3753-4055-ba72-ef37a1d46860.gif)

#### 비밀번호 변경 시 현재 비밀번호로 재인증을 한 후 맞게 입력한 경우에만 변경이 가능합니다.

![password](https://user-images.githubusercontent.com/76847993/132725017-0a5abc0e-ecdc-4182-8765-101f6fed00ec.gif)

#### 탈퇴하기를 클릭하면 탈퇴 여부를 선택하여 탈퇴 할 수 있다.

![탈퇴하기](https://user-images.githubusercontent.com/70390705/132844265-6ac071ac-08b2-4205-a9d6-36288ac76496.gif)
<<<<<<< HEAD

=======

> > > > > > > 4f0eadb483c70d3b97a8c424827c5fc5e7b39b76

</details>

<hr />

### 비회원

<details>
  <summary>상세보기</summary>

#### 로그인하지않고 게시글을 클릭하면 다음과같은 창이 뜹니다.

![비회원](https://user-images.githubusercontent.com/76847993/132726677-781f23d7-49e4-4a4c-a93d-2878abeb101d.gif)

#### 또한 navBar에 mypage, 우측하단 게시글쓰기 버튼이 뜨지 않습니다.

</details>

<hr />

### 404 not Found

<details>
  <summary>상세보기</summary>

#### 404오류 화면입니다.

![notFound](https://user-images.githubusercontent.com/76847993/132727674-32ab58a5-332e-40a9-9131-af9b2c9b0750.gif)

</details>

<br>

## 6. 버그 <a id="6"></a>

##### 1. 마이페이지 - 내 정보 - 닉네임 변경이 간헐적으로 안되는 경우

<br>

## 7. 아쉬운 점 / 개선할 점 <a id="7"></a>

<table class="table">
  <tr>
    <td class="title">팀원</td>
    <td class="title left">아쉬운 점</td>
    <td class="title right">개선할 점</td>
  </tr>
  <tr>
    <td rowspan="6" class="phj">박현정</td>
    <td>역할 분배를 페이지별로 했더니 특정 사람에게 너무 많은 역할이 주어졌습니다.</td>
    <td>개발을 시작하기 전에 기능별 정의를 분명하게 하고 그 기능별로 역할 분배를 해야겠다고 느꼈습니다.</td>
  </tr>
  <tr>
    <td>리덕스의 action이 너무 많아진 느낌입니다.</td>
    <td>개발을 하면서 그때그때 중복된 부분을 정리해야할 것 같습니다.
</td>
  </tr>
  <tr>
    <td>데이터를 정의할 때 어떤 type의 값을 넣을건지를 정확히 정하지 않아 나중에 수정할 일이 많았습니다.</td>
    <td>개발 전 단계에서 데이터타입을 정확하게 해야겠다고 느꼈습니다. 예를 들어 post id는 string타입의 date.now로 하자는 식으로요.
</td>
  </tr>
  <tr>
    <td>firebase와 redux상태간의 정확한 정리가 없어 헷갈리는 일이 많았습니다.	</td>
    <td>firebase에서 받아오는 사용자와, redux에서의 사용자를 서류상으로 정확하게 명시해놓고 각각 어떻게 쓸것인지 팀원들과 정의하는 시간을 가져야할 것 같습니다.
</td>
  </tr>
  <tr>
    <td>코드리뷰가 적극적으로 이루어지지 않았던 것 같습니다. 제가 짠 코드가 괜찮은 코드인지 아닌지를 판단하기 어려웠고, 팀원이 짠 코드를 제대로 파악하기 힘들었습니다.</td>
    <td>팀프로젝트이니만큼 프로젝트에 사용된 코드에 모두가 책임감을 가져야한다고 생각합니다. 그 책임감을 지려면 어느정도 코드리뷰에 강제성이 있어야될 것 같습니다.
</td>
  </tr>
  <tr>
    <td colspan="2">*** 개발 외 힘들었던 점 *** <br /> 디자인 시안의 부재.. 디자이너의 필요성을 느꼈습니다.</td>
  </tr>
  <tr>
    <td rowspan="3" class="khs">김현수</td>
    <td>정확한 디자인이 없었던 점</td>
    <td>figma를 사용해서 대략적인 디자인이 있었지만 기능 및 세부사항들을 개발하면서 추가하여 프로젝트의 기간이 늘어지는 상황이 됐습니다. 시간이 좀 걸리더라도 기능별 세부사항과 디자인을 확정시켜두고 개발하는 방법이 좋을 것 같습니다.</td>
  </tr>
  <tr>
    <td>대화의 부재</td>
    <td>프로젝트를 진행할 때 서로 도움이 될 수 있는 부분이 있었지만 내꺼 하기에 바쁘다는 핑계가 있었던 것 같습니다. 개발 스케쥴을 내 작업에만 맞췄던 것 같습니다.</td>
  </tr>
  <tr>
    <td>다른 사람의 코드를 확인하지 못함</td>
    <td>흐름정도만 파악한 뒤 정확한 동작을 확인하지 않았습니다. 더 세심하게 보는 습관을 가져야 할 것 같습니다.</td>
  </tr>
  <tr>
    <td rowspan="5" class="jsw">전상우</td>
  </tr>
  <tr>
    <td>코드 리뷰의 문제점</td>
    <td>코드 리뷰 담당자를 한 명씩 정해서 이상이 있으면 연대 책임시키기</td>
  </tr>
  <tr>
    <td>너무 많은 state</td>
    <td>추적 중인 state가 15개이다. 비슷한 위치에 놓인 컴포넌트끼리는 state를 통하해도 좋지 않을까? 예를 들어 mypage, board, post 3개로.</td>
  </tr>
  <tr>
    <td>너무 많은 Boilerplate</td>
    <td>redux 자체의 문제점. redux toolkit을 사용하는 것이 좋을 듯 하다. 최근에는 비동기적인 작업을 redux-saga 대신에 react-query, swr, apollo로 대신한다고 하니 다음 프로젝트에서는 이를 활용해보는 것이 좋을 듯 하다.</td>
  </tr>
  <tr>
    <td>서로 다른 코딩 방식</td>
    <td>3가지 방법으로 이를 해결할 수 있을듯 하다. 첫 번째는 ESLint와 Prettier을 맨처음 세팅할 때 설정하는 것. 두 번째는 변수명을 좀 더 명확하게 짓는 것. 세 번째는 주석을 좀 더 명확하게 다는 것</td>
  </tr>
  <tr>
    <td  rowspan="5"  class="lsg">임상기</td>
   <td>해결되지 않는 문제를 혼자 끙끙 앓고 있던 것이 아쉽습니다.</td>
    <td>모르는 것들은 팀원들과 상의하면서 프로젝트를 하면 좋을 거 같습니다.</td>
  </tr>
  <tr>
   <td>프로젝트 기간을 정확히 정하지 않고 계속 연장했던 부분이 아쉽습니다.</td>
    <td>프로젝트의 우선순위를 두어 필요한 기능을 먼저 구현하여 완성하고, 나머지 기능들은 그 다음에 완성을 해나가면 좋을 것 같습니다.</td>
  </tr>
  <tr>
   <td>리덕스 강의는 들었으나 적용을 하지 못한 점이 아쉽습니다.</td>
    <td>프로젝트 끝나고 개인적으로 리덕스를 적용하면서 이해를 더 높여야겠습니다.</td>
  </tr>
  <tr>
   <td>영어 실력 부족. 번역기를 쓴다지만 어느 정도 영어 실력은 있으면 훨씬 수월할 것 같습니다.</td>
    <td>영어 원문을 보고 해석하는 연습을 조금씩이라도 해야 될 것 같습니다.</td>
  </tr>
  <tr>
    <td colspan="2">*** 향후 계획 *** <br />Node.js도 배워 볼 계획입니다. 파이어스토어가 아닌 Node.js를 통해서도 백엔드를 구현해볼 수 있도록 공부할 계획입니다.</td>
  </tr>
</table>
