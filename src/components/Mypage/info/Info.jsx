import React, { useState, useRef } from 'react';
import * as S from "./Info.style";
import { useDispatch } from 'react-redux';
import { userMiddleware } from 'store/modules/userLike';
import { editMypageThunk } from 'store/modules/mypageComment';
import { editUserImgThunk, editUserNameThunk } from 'store/modules/mypagePost';
import { dbService, storageService } from 'firebase.js';
import { v4 as uuidv4 } from "uuid";
import Loading from "../../Loading/Loading";

const Info = ({ uid, user, userDB, change, setChange }) => {


  const input = useRef();

  const dispatch = useDispatch();

  const [attachment, setAttachment] = useState([]);

  let [load, setLoad] = useState(false);

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
    setTimeout(()=>{
      dispatch(editMypageThunk(user.uid, '', 'finish'));
    }, 1000);
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
    setLoad(true);
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
    changeImg(attachmentUrl);
  };

  const onDefaultImg = async() => {
    await dbService.collection('users').doc(user.uid).update({
      user_image: null,
    });
    changeImg(null);
  }

  const changeImg = (data) => {
    setAttachment([]);
    dispatch(userMiddleware(user.uid, '', 'init'));
    dispatch(editUserImgThunk(user.uid, data));
    dispatch(editMypageThunk(user.uid, data, 'img'));
    setChange(!change);
    setImg(false);
    setTimeout(()=>{
      dispatch(editMypageThunk(user.uid, '', 'finish'));
    }, 1000);
    setLoad(false);
  }

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
          <S.Icon onClick={onIconClick} className="fas fa-cog" title={"수정하기"}></S.Icon>
        </S.Paragraph>
        {nickName ?
        (<div>
          <textarea ref={input} type="text" maxLength="15" wrap="off" placeholder="최대 15자(띄어쓰기 포함)" onKeyPress={e=>onEnter(e)} />
          <button onClick={onSubmitBtn}>제출</button>
        </div>) :
        (userDB.name ? <p>{userDB.name}</p> : <p onClick={onUsername}>닉네임을 설정해보세요!</p>)}
      </S.NickName>
      <S.Profile>
        <S.Paragraph>
          <S.Title>프로필 사진</S.Title>
          <S.Icon onClick={onImgClick} className="fas fa-cog" title={"수정하기"}></S.Icon>
        </S.Paragraph>
        <S.Paragraph>
          {userDB.user_image ? (img || <p><S.ProfileImg src={userDB.user_image} alt="프로필 사진"></S.ProfileImg></p>) : (img || <p><S.ProfileIcon className="fas fa-user-circle"></S.ProfileIcon></p>)}
          {img && <p>
            <S.Form onSubmit={onSubmit} img={userDB.user_image}>
              <div>
                <label for="inputFile">사진 변경</label>
                <input
                  id="inputFile"
                  accept="image/*"
                  type="file"
                  onChange={onFileChange}
                  name="fileNames[]"
                />
                {userDB.user_image &&
                <p onClick={onDefaultImg}>기본사진으로 변경</p>}
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
              {load && <S.Loading>
                <Loading width="30" height="30" />
              </S.Loading>}
            </S.Form>
          </p>}
        </S.Paragraph>
      </S.Profile>
    </>
  )
}

export default Info;