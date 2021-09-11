import React from 'react';
import * as S from "./Bookmark.style";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const Bookmark = ({ user }) => {

  const bookmarkDB = useSelector(state => state.mypageBookmark.data);

  const history = useHistory();

  const check = bookmarkDB.length === 0;

  const onMovePage =(post) => {
    history.push({
      pathname: `/categorylist/${post.post_region}`,
      search: `?id=${post.post_id}`,
      state: {
        like: user.user_like_posts,
        bookmark: user.user_bookmark_posts,
        postData: post,
        profile: user.user_image,
        check: 'check',
      }
    });
  }
  

  return (
    <>
      {!check && bookmarkDB.map((bm) => {
        return (
          <S.List key={bm.post_id} onClick={()=>onMovePage(bm)} title={'게시글 보러가기'}>
            <p>{bm.post_title}</p>
          </S.List>
        )
      })}
      {check &&
        <S.Null>찜한 목록이 없습니다</S.Null>
      }
    </>
  )
}

export default Bookmark;