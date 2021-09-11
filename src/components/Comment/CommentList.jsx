import React, { useState, useEffect, useRef } from 'react';
import { dbService } from "firebase.js";
import firebase from "firebase";
import timeCalculate from "utils/timeCalculate";
import * as S from "./Comment.style"; 


const CommentList = ({ com, add, onEdit, onDelete, onScroll, render, user }) =>{
  let [editDelete, setEditDelete] = useState(false);
  let [edit, setEdit] = useState(false);
  let userCheck = com.user_uid === user.uid;

  const container = useRef();
  const input = useRef();

  const onEnter = (e) => {
    if(e.key !== 'Enter' | e.key === 'Enter' && e.shiftKey){
      return;
    }
    if(e.key === 'Enter'){
      e.preventDefault();
      onEditFrame(e.target.value, e.target.parentElement.id);
    }
  }

  const onDoneEdit = () => { 
    onEditFrame(input.current.value, container.current.id, input.current.placeholder);
  };
  
  const onEditFrame = async(value, i, placeholder) => {
    if(!value){
      await dbService.collection('comment').doc(i).update({
        comment_content: placeholder
      });
    }
    if(value){
      await dbService.collection('comment').doc(i).update({
        comment_content: value
      });
    }
    onEdit();
    setEdit(false);
    setEditDelete(false);
  }

  const onStartEdit = () => {
    setEdit(true);
  };

  const onDeleteList = async(e) => {
    if(!window.confirm("정말 삭제하시겠습니까?")){
      setEditDelete(!editDelete);
      return;
    }
    const target = e.target;
    let i = target.parentElement.parentElement.parentElement.id;

    await dbService.collection('comment').doc(i).delete();
    await dbService.collection('users').doc(user.uid).update({
      user_write_comments: firebase.firestore.FieldValue.arrayRemove(i),
    });
    onDelete();
  }

  const onEditDelete = () => {
    setEditDelete(!editDelete);
  }


  //댓글 추가시 스크롤 맨 밑으로
  useEffect(() => {  
    if(add != 'add'){
      return;
    }
    onScroll();
  },[render]);


  return (
    <S.CommentList ref={container} id={com.comment_id} key={com.comment_id}>
      {com.user_image ? <img src={com.user_image} alt="프로필 이미지입니다"></img> : <S.ProfileIcon className="fas fa-user-circle"></S.ProfileIcon>}
      {edit ?
      (<input ref={input} placeholder={com.comment_content} onKeyPress={e=>onEnter(e)}/>) :
      <S.Content>
        <span>{com.comment_writer ? <p>{com.comment_writer}</p> : <p>익명</p>}<S.Time>{timeCalculate(com.time)}</S.Time></span>
        <span>{com.comment_content}</span>
      </S.Content>}
      <S.EditDel>
        {editDelete &&
          <>
          <S.Toggle>
            {!edit && <div onClick={onStartEdit}>수정</div>}
            {!edit && <div onClick={e=>onDeleteList(e)}>삭제</div>}
            <div></div>
          </S.Toggle>
          </>
        }
        {edit && <S.Check onClick={onDoneEdit}>수정완료</S.Check>}
        {userCheck && <i className="fas fa-ellipsis-v" onClick={onEditDelete}></i>}
      </S.EditDel>
      {/* <S.Time>{timeCalculate(com.time)}</S.Time> */}
    </S.CommentList>
  )
}

export default CommentList;