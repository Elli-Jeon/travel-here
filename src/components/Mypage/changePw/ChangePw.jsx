import React from 'react';
import * as S from './ChangePw.style';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ChangePw = ({ user }) => {
  const changePwDB = useSelector((state) => state.mypageChangePw.data);

  const history = useHistory();

  const check = changePwDB.length === 0;

  const onMovePage = (post) => {
    history.push({
      pathname: `/categorylist/${post.post_region}`,
      search: `?id=${post.post_id}`,
      state: {
        like: user.user_like_posts,
        changePw: user.user_changePw_posts,
        postData: post,
        profile: user.user_image,
      },
    });
  };

  return (
    <>
      {!check &&
        changePwDB.map((cp) => {
          return (
            <S.List
              key={cp.changePw_id}
              onClick={() => {
                onMovePage(cp);
              }}
              title={'게시글 보러가기'}
            >
              <p>{cp.changePw_content}</p>
            </S.List>
          );
        })}
      {check && <S.Null>작성한 댓글이 없습니다</S.Null>}
    </>
  );
};

export default ChangePw;
