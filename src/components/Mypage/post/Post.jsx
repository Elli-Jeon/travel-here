import React from 'react';
import * as S from "./Post.style";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const Post = ({user}) => {

  const postDB = useSelector(state => state.mypagePost.data);

  const history = useHistory();

  const check = postDB.length === 0;

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
      {!check && postDB.map((post) => {
        return(
        <S.List key={post.post_id} onClick={() => onMovePage(post)} title={'게시글 보러가기'}>
          <p>{post.post_title}</p>
        </S.List>
        )
      })}
      {check &&
        <S.Null>작성하신 게시글이 없습니다</S.Null>
      }
    </>
  )
}

export default Post;