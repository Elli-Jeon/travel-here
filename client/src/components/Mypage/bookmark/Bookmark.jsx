﻿import React, { useEffect } from 'react';
import * as S from "./Bookmark.style";
import { useDispatch, useSelector } from 'react-redux';
import { mypageBookmarkMiddleware } from 'store/modules/mypageBookmark';


const Bookmark = ({bookmarks}) => {

  const bookmarkDB = useSelector(state => state.mypageBookmark.data);
  const dispatch = useDispatch();

  
  useEffect(()=>{
    for(let i=0; i<bookmarks.length; i++){
      dispatch(mypageBookmarkMiddleware(bookmarks[i]));
    }
  },[]);

  return (
    <>
      {bookmarkDB.map((bm) => {
        return (
          <li key={bm.post_id}>
            <h1>{bm.post_title}</h1>
            <h2>{bm.post_content}</h2>
          </li>
        )
      })}
    </>
  )
}

export default Bookmark;