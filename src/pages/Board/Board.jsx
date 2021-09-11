import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "components/PostCard/PostCard";
import { fetchPostList } from "store/modules/board";
import Loading from "../../components/Loading/Loading";
import * as S from "./Board.style";
import { useMediaQuery } from "react-responsive";

const Board = ({ match, location }) => {
  let [viewRender, setViewRender] = useState(false);

  const { isNavOpened } = useSelector((state) => state.nav);

  // redux에서 데이터 fetch한 결과(성공하면 data에 배열로 담김)
  const { postList, error, loading, view } = useSelector((state) => ({
    postList: state.board.data,
    loading: state.board.loading,
    error: state.board.error,
    view: state.view.view,
  }));
  const dispatch = useDispatch();

  const isPc = useMediaQuery({
    query: "(min-width : 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width : 680px) and (max-width :1023px)",
  });

  // categorylist에서 region에 따라서 놓여져있고 클릭하면 그에 맞게 검색
  useEffect(() => {
    dispatch(fetchPostList(match.params.region));
  }, [dispatch, match.params.region]);

  useEffect(() => {}, [isNavOpened]);

  if (loading) return <Loading width="100" height="100" />;
  if (error) return <div>Error</div>;
  if (!postList) return null;

  // postList를 등분
  if (postList) {
    let check;
    if (isTablet) {
      check = Math.ceil(postList.length / 2);
      return (
        <S.Container isPc={isPc} isTablet={isTablet}>
          <S.Column>
            {postList
              .filter((ele, index) => {
                return index < check;
              })
              .map((post) => {
                return (
                  <PostCard
                    key={post.post_id}
                    postData={post}
                    location={location}
                    view={view}
                    viewRender={viewRender}
                    setViewRender={setViewRender}
                  />
                );
              })}
          </S.Column>
          <S.Column>
            {postList
              .filter((ele, index) => {
                return index >= check;
              })
              .map((post) => {
                return (
                  <PostCard
                    key={post.post_id}
                    postData={post}
                    location={location}
                    view={view}
                    viewRender={viewRender}
                    setViewRender={setViewRender}
                  />
                );
              })}
          </S.Column>
        </S.Container>
      );
    } else {
      // PC. 세등분
      check = Math.ceil(postList.length / 3);

      return (
        <S.Container isPc={isPc} isTablet={isTablet}>
          <S.Column>
            {postList
              .filter((ele, index) => {
                return index < check;
              })
              .map((post) => {
                return (
                  <PostCard
                    key={post.post_id}
                    postData={post}
                    location={location}
                    view={view}
                    viewRender={viewRender}
                    setViewRender={setViewRender}
                  />
                );
              })}
          </S.Column>
          <S.Column>
            {postList
              .filter((ele, index) => {
                return index >= check && index < check * 2;
              })
              .map((post, i) => {
                return (
                  <PostCard
                    key={post.post_id}
                    postData={post}
                    location={location}
                    view={view}
                    viewRender={viewRender}
                    setViewRender={setViewRender}
                  />
                );
              })}
          </S.Column>
          <S.Column>
            {postList
              .filter((ele, index) => {
                return index >= check * 2;
              })
              .map((post, i) => {
                return (
                  <PostCard
                    key={post.post_id}
                    postData={post}
                    location={location}
                    view={view}
                    viewRender={viewRender}
                    setViewRender={setViewRender}
                  />
                );
              })}
          </S.Column>
        </S.Container>
      );
    }
  }
};

export default Board;
