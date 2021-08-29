﻿import React, { useState, useRef } from 'react';
import * as S from "./Info.style";
import { useDispatch } from 'react-redux';
import { userMiddleware } from 'store/modules/userLike';
import { editMypageThunk } from 'store/modules/mypageComment';
import { editUserImgThunk, editUserNameThunk } from 'store/modules/mypagePost';
import { dbService, storageService } from 'firebase.js';
import { v4 as uuidv4 } from "uuid";

const Info = ({ uid, user, userDB, change, setChange }) => {


  const input = useRef();

  const dispatch = useDispatch();

  const [attachment, setAttachment] = useState([]);

  let [nickName, setNickName] = useState(false);

  let [img, setImg] = useState(false);



  const onUsername = (value) => {
    dbService.collection('users').doc(user.uid).update({
      name: value,      
    });
    dispatch(userMiddleware(user.uid, '', 'init'));
    dispatch(editMypageThunk(user.uid, value, 'name'));
    dispatch(editUserNameThunk(user.uid, value));
    setNickName(false);
    setChange(!change);
  };


  const onFileChange = (e) => {
    const { files } = e.target;
    let file;
    let fileURLs = [];

    file = files[0];
    let reader = new FileReader();
    reader.onload = () => {
      fileURLs[0] = reader.result;
      setAttachment([...fileURLs]);
    };
    reader.readAsDataURL(file);
  };

  const onEnter = (e) => {
    if(e.key != 'Enter'){
      return;
    }
    if(e.key === 'Enter'){
      e.preventDefault();
      onSubmitBtn();
    }
  };

  const onSubmitBtn = () => {
    onUsername(input.current.value);
    input.current.value = '';
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    let attachmentUrl = [];
    if (attachment) {
      const attachmentRef = storageService
        .ref()
        .child(`${uid.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(
        attachment[0],
        "data_url"
      );
      attachmentUrl.push(await response.ref.getDownloadURL());
    };

    await dbService.collection('users').doc(user.uid).update({
      user_image: attachmentUrl,
    });
    setAttachment([]);
    dispatch(userMiddleware(user.uid, '', 'init'));
    dispatch(editUserImgThunk(user.uid, attachmentUrl));
    dispatch(editMypageThunk(user.uid, attachmentUrl, 'img'));
    setChange(!change);
    setImg(false);
  };

  const onIconClick = () => {
    setNickName(!nickName);
  }

  const onImgClick = () => {
    setImg(!img);
  }

  return (
    <>
      <S.Id>
        <S.Paragraph>
          <S.Title>아이디</S.Title>
        </S.Paragraph>
        <p>{user.email}</p>
      </S.Id>
      <S.NickName>
        <S.Paragraph>
          <S.Title>닉네임</S.Title>
          <S.Icon onClick={onIconClick} className="fas fa-cog"></S.Icon>
        </S.Paragraph>
        {nickName ?
        (<><input ref={input} type="text" onKeyPress={e=>onEnter(e)}/>
        <button onClick={onSubmitBtn}>제출</button></>) :
        (userDB.name ? <p>{userDB.name}</p> : <p onClick={onUsername}>닉네임을 설정해보세요!</p>)}
      </S.NickName>
      <S.Profile>
        <S.Paragraph>
          <S.Title>프로필 사진</S.Title>
          <S.Icon onClick={onImgClick} className="fas fa-cog"></S.Icon>
        </S.Paragraph>
        <S.Paragraph>
          {userDB.user_image ? (img || <p><S.ProfileImg src={userDB.user_image} alt="프로필 사진"></S.ProfileImg></p>) : (img || <p><S.ProfileIcon className="fas fa-user-circle"></S.ProfileIcon></p>)}
          {img && <p>
            <form onSubmit={onSubmit}>
              <div>
                <label for="inputFile">사진 선택</label>
                <input
                  id="inputFile"
                  accept="image/*"
                  type="file"
                  onChange={onFileChange}
                  name="fileNames[]"
                />
              </div>
              {attachment && (
                <div>
                  {attachment.map((atta, i) => (
                    <>
                      <img key={i} src={atta} width="80px" height="80px" alt="프로필 사진"/>
                      <button type="submit">선택 완료</button>
                    </>
                  ))}
                </div>
              )}
            </form>
          </p>}
        </S.Paragraph>
      </S.Profile>
    </>
  )
}

export default Info;