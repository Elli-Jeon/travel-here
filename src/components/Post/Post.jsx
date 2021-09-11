import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as S from './Post.style';
import { throttle } from "lodash";
import Comment from 'components/Comment/Comment';
import PostSlider from './PostSlider/PostSlider';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { likeMiddleware } from 'store/modules/postLike';
import { userMiddleware } from 'store/modules/userLike';
import { bookmarkMiddleware } from 'store/modules/bookmark';
import { mypagePostMiddleware } from 'store/modules/mypagePost';

import {
  commentDelThunk,
  userComDelThunk,
  userLikeDelThunk,
  userBookmarkDelThunk,
  getComId,
} from "store/modules/delete";

import firebase from "firebase";
import { dbService } from "firebase.js";
import WriteModal from "components/Write/WriteModal/WriteModal";
import timeCalculate from "utils/timeCalculate";

const Post = ({
  postData,
  setIsPostOpened,
  setLikeRender,
  setViewRender,
  viewRender,
  postView,
  update,
}) => {
  const {
    post_date,
    post_region,
    post_title,
    post_content,
    post_photo,
    post_id,
    post_like,
    post_writer,
    post_uid,
    post_profile_img,
    post_view,
  } = postData;

  const location = useLocation();

  const userDB = useSelector((state) => state.userLike.data);

  const auth = firebase.auth();

  const dispatch = useDispatch();

  let [time, setTime] = useState("");

  let [bar, setBar] = useState(false);

  let [user, setUser] = useState("");

  let [check, setCheck] = useState(false);

  const [widthSize, setWidthSize] = useState(window.innerWidth);

  // writeModal
  const [visible, setVisible] = useState(false);

  let history = useHistory();

  // 좋아요 숫자 받아오기
  let likeNum = useSelector((state) => state.postLike.likeNum);

  // 내가 해당 게시글에 좋아요을 했나 안 했나 표시
  let [likePost, setLikePost] = useState(location.state.like.includes(post_id));

  // 내가 해당 게시글에 찜을 했나 안 했나 표시
  let [bookmarkPost, setBookmarkPost] = useState(
    location.state.bookmark.includes(post_id)
  );

  const userCheck = user.uid === post_uid;

  const comment = useRef();
  const textarea = useRef();

  // 좋아요 아이콘 토글 -> 할 때마다 firestore에 저장 되어야 함
  const onLikeToggle = async () => {
    if (likePost) {
      setLikePost(false);
      setLikeRender("noneLike");
      dispatch(likeMiddleware(post_id, "noneLike"));
      dispatch(userMiddleware(user.uid, post_id, "noneLike"));
    } else {
      setLikePost(true);
      setLikeRender("like");
      dispatch(likeMiddleware(post_id, "like"));
      dispatch(userMiddleware(user.uid, post_id, "like"));
    }
  };

  // 찜 아이콘 토글
  const onBookmarkToggle = () => {
    if (bookmarkPost) {
      setBookmarkPost(false);
      dispatch(bookmarkMiddleware(user.uid, post_id, "noneBookmark"));
    } else {
      setBookmarkPost(true);
      dispatch(bookmarkMiddleware(user.uid, post_id, "bookmark"));
    }
  };

  const postEdit = () => {
    setVisible(!visible);
    setBar(false);
  };

  // 게시글 삭제 시 삭제되는 것들
  // post collection : post 문서 자체
  // users collection : user_write_posts, user_write_comments, user_like_posts, user_bookmark_posts
  // comment collection : comment 문서 자체
  const postDelete = async () => {
    if(!window.confirm("정말 삭제하시겠습니까?")){
      onEditDelete();
      return;
    }
    await dbService.collection("post").doc(post_id).delete();
    await dbService
      .collection("users")
      .doc(user.uid)
      .update({
        user_write_posts: firebase.firestore.FieldValue.arrayRemove(post_id),
      });
    dispatch(commentDelThunk(post_id));
    dispatch(userLikeDelThunk(post_id));
    dispatch(userBookmarkDelThunk(post_id));
    // getComId함수를 통해 comment_id를 얻는데
    // dispatch(commentDelThunk(post_id))가 실행된 후에 그 comment_id 정보가 들어옴
    // dispatch를 비동기처리할 방법을 찾지 못해 setTimeout으로 처리
    setTimeout(() => {
      let com = getComId();
      for (let i = 0; i < com[0].length; i++) {
        dispatch(userComDelThunk(com[0][i]));
      }
    }, 1000);
    onHideModal();
  };

  const onEditDelete = () => {
    setBar(!bar);
  };

  const onContainerClick = (e) => {
    if(e.target !== e.currentTarget){
      return;
    }
    onHideModal();
  }

  // 모달창 닫기
  const onHideModal = () => {
    setViewRender(!viewRender);
    setIsPostOpened(false);
    history.push({
      search: "",
    });
    window.location.reload();
  };

  const handleSize = useCallback(() => {
    setWidthSize(window.innerWidth);
    if(textarea.current){
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  }, []);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      dispatch(userMiddleware(user.uid, '', 'init'));
      dispatch(mypagePostMiddleware(user.uid));
    });
    dispatch(likeMiddleware(post_id, "init"));
    setTime(timeCalculate(post_date));
    if(textarea.current){
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", throttle(handleSize, 2000));
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [handleSize]);

  useEffect(() => {
    if (location.state === undefined) {
      return;
    }
    if (location.state.hasOwnProperty("check")) {
      setCheck(true);
    }
  }, []);

  return (
    <S.Container onClick={e=>onContainerClick(e)}>
      <S.Contents>
        <ul ref={comment}>
          <S.Header>
            <span>
              <span>{post_title}</span>
              <p>#{post_region}</p>
              {update ? <p>조회수 1</p> : (check ? <p>조회수 {location.state.postData.post_view}</p> : <p>조회수 {postData.post_view+1}</p>)}
            </span>
            <div>
              {userCheck && (
                <i onClick={onEditDelete} className="fas fa-ellipsis-v"></i>
              )}
              <i onClick={onHideModal} className="fas fa-times-circle"></i>
              {bar && (
                <S.editDelToggle>
                  <div></div>
                  <p onClick={postEdit}>수정</p>
                  <p onClick={postDelete}>삭제</p>
                </S.editDelToggle>
              )}
            </div>
          </S.Header>
          {post_photo && <PostSlider postImages={post_photo} />}
          <S.Profile>
            {post_profile_img ? (
              <img src={post_profile_img} alt="프로필 이미지입니다"></img>
            ) : (
              <i className="fas fa-user-circle"></i>
            )}
            {post_writer ? <p>{post_writer}</p> : <p>익명</p>}
            <span>{time}</span>
          </S.Profile>
          <S.Title>{post_title}</S.Title>
          <S.Content><textarea disabled height="auto" ref={textarea}>{post_content}</textarea></S.Content>
          <S.Like>
            <span>
              {likePost ? (
                <i onClick={onLikeToggle} className="fas fa-heart"></i>
              ) : (
                <i onClick={onLikeToggle} className="far fa-heart"></i>
              )}
              {update ? <span>0</span> : (check ? <span>{location.state.postData.post_like}</span> : <span>{likeNum}</span>)}
              {/* {update ? <span>0</span> : <span>{likeNum}</span>} */}
              <p>명</p>이 좋아합니다
            </span>
            {bookmarkPost ? (
              <S.Bookmark
                onClick={onBookmarkToggle}
                title="찜 해제"
                className="fas fa-bookmark"
              ><div>찜 목록에 추가됨</div></S.Bookmark>
            ) : (
              <i
                onClick={onBookmarkToggle}
                title="찜하기"
                className="far fa-bookmark"
              ></i>
            )}
          </S.Like>
          <Comment postId={post_id} postregion={post_region} userDB={userDB} postLike={post_like} postView={post_view}/>
        </ul>
      </S.Contents>
      <WriteModal visible={visible} isVisible={postEdit} postData={postData} />
    </S.Container>
  );
};

export default Post;
