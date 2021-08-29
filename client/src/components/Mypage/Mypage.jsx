﻿import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as S from './Mypage.style';

import Info from './info/Info';
import Post from './post/Post';
import Comment from './comment/Comment';
import Bookmark from './bookmark/Bookmark';

import { mypageBookmarkMiddleware } from 'store/modules/mypageBookmark';
import { mypageCommentMiddleware } from 'store/modules/mypageComment';
import { mypagePostMiddleware } from 'store/modules/mypagePost';

import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

const Mypage = ({ user }) => {
  const [info, setInfo] = useState(false);
  const [post, setPost] = useState(false);
  const [comment, setComment] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const [change, setChange] = useState(false);

  const [check, setCheck] = useState(false);

  const [uid, setUid] = useState('');

  const auth = firebase.auth();

  const dispatch = useDispatch();

  const userDB = useSelector((state) => state.userLike.data);

  const { isNavOpened }  = useSelector(state => state.nav);

  

  const onClose = () => {
    setInfo(false);
    setPost(false);
    setComment(false);
    setBookmark(false);
    // setCheck(false);
  };

  const onDelayClose = () => {
    setCheck(false);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const onInfo = () => {
    if (info) {
      onDelayClose();
      return;
    }
    onClose();
    setInfo(true);
    setCheck(true);
  };

  const onPost = () => {
    if (post) {
      onDelayClose();
      return;
    }
    onClose();
    setPost(true);
    setCheck(true);
  };

  const onComment = () => {
    if (comment) {
      onDelayClose();
      return;
    }
    onClose();
    setComment(true);
    setCheck(true);
  };

  const onBookmark = () => {
    if (bookmark) {
      onDelayClose();
      return;
    }
    onClose();
    setBookmark(true);
    setCheck(true);
  };

  const history = useHistory();

  // 로그인 페이지로 전환
  const routeChange = () => {
    let path = '/';
    history.push(path);
  };

  // 사용자 삭제
  const userDel = () => {
    const user = auth.currentUser;
    user
      .delete()
      .then(() => {
        routeChange();
      })
      .catch((error) => {
        console.log('user An error ocurred ');
      });
  };

  const goToPassword = () => {
    let path = '/password';
    history.push(path);
  };

  useEffect(()=>{}, [isNavOpened]);

  useEffect(()=>{
    dispatch(mypagePostMiddleware(user.uid));

    for (let i = 0; i < user.user_bookmark_posts.length; i++) {
      if (i === user.user_bookmark_posts.length - 1) {
        dispatch(
          mypageBookmarkMiddleware(user.user_bookmark_posts[i], 'finish')
        );
      }
      if (i !== user.user_bookmark_posts.length - 1) {
        dispatch(mypageBookmarkMiddleware(user.user_bookmark_posts[i]));
      }
    }

    auth.onAuthStateChanged((user) => {
      setUid(user);
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < user.user_write_comments.length; i++) {
      if (i === user.user_write_comments.length - 1) {
        dispatch(
          mypageCommentMiddleware(user.user_write_comments[i], 'finish')
        );
      }
      if (i !== user.user_write_comments.length - 1) {
        dispatch(mypageCommentMiddleware(user.user_write_comments[i]));
      }
    }
  }, [change]);

  return (
    <>
      <S.Container isNavOpened={isNavOpened}>
        <S.Contents check={check}>
          <S.BackImage>
            {userDB.name ? (
              <span>'{userDB.name}'님 반갑습니다</span>
            ) : (
              <span>닉네임을 설정해보세요!</span>
            )}
            {userDB.user_image ? (
              <img src={userDB.user_image} alt="배경사진" />
            ) : (
              <i className="fas fa-user-circle"></i>
            )}
          </S.BackImage>
          <S.ListArea>
            <p onClick={onInfo}>
              <i className="fas fa-user-alt"></i>내 정보
            </p>
            <ul>
              <li onClick={onPost}>
                <i className="fas fa-pencil-alt"></i>
                내가 쓴 글
              </li>
              <li onClick={onComment}>
                <i className="fas fa-comment-dots"></i>
                내가 쓴 댓글
              </li>
              <li onClick={onBookmark}>
                <i className="fas fa-bookmark"></i>찜
              </li>
              <li onClick={goToPassword}>
                <i class="fas fa-unlock-alt"></i>비밀번호 변경
              </li>
              <li onClick={userDel}>탈퇴하기</li>
            </ul>
          </S.ListArea>
        </S.Contents>
        {info && (
          <S.Content check={check}>
            <ul>
              <li>내 정보</li>
              <Info
                uid={uid}
                user={user}
                userDB={userDB}
                change={change}
                setChange={setChange}
              />
            </ul>
          </S.Content>
        )}
        {post && (
          <S.Content check={check}>
            <ul>
              <li>내가 쓴 글</li>
              <Post user={user} />
            </ul>
          </S.Content>
        )}
        {comment && (
          <S.Content check={check}>
            <ul>
              <li>내가 쓴 댓글</li>
              <Comment user={user} />
            </ul>
          </S.Content>
        )}
        {bookmark && (
          <S.Content check={check}>
            <ul>
              <li>찜</li>
              <Bookmark user={user} />
            </ul>
          </S.Content>
        )}
      </S.Container>
    </>
  );
};

export default Mypage;
