﻿import React, { useEffect } from 'react';
import * as S from "./Comment.style";
import { useDispatch, useSelector } from 'react-redux';
import { mypageCommentMiddleware } from 'store/modules/mypageComment';

const Comment = ({comments}) => {

  const commentDB = useSelector(state => state.mypageComment.data);
  const dispatch = useDispatch();


  useEffect(()=>{
    for(let i=0; i<comments.length; i++){
      dispatch(mypageCommentMiddleware(comments[i]));
    }
  },[]);


  return(
    <>
      {commentDB.map((com) => {
        return(
        <li key={com.comment_id}>
          <h1>{com.comment_content}</h1>
        </li>
        )
      })}
    </>
  )
}

export default Comment;