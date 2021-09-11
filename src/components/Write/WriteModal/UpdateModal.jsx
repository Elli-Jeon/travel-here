import { useRef, useState } from "react";
import * as S from "./WriteModal.style";
import { dbService, storageService } from "firebase.js";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../Loading/Loading";

export default function UpdateModal({
  visible,
  isVisible,
  postData,
  login,
  isHeight,
  likePost,
}) {
  const {
    post_date,
    post_region,
    post_title,
    post_content,
    post_photo,
    post_id,
    post_writer,
    post_uid,
    post_view,
    post_like,
    post_profile_img,
  } = postData;
  const [post, setPost] = useState(post_content);
  const [title, setTitle] = useState(post_title);
  const [region, setRegion] = useState(post_region);
  const [photo, setPhoto] = useState(post_photo);
  const [load, setLoad] = useState(false);

  const postRef = useRef();
  const titleRef = useRef();
  const [attachment, setAttachment] = useState([]);

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "textarea") {
      setPost(value);
    } else if (name === "region") {
      setRegion(value);
    } else if (name === "title") {
      setTitle(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("제목을 입력해 주세요.");
      postRef.current.focus();
    } else if (!post) {
      alert("내용을 입력해 주세요.");
      titleRef.current.focus();
    } else if (!region) {
      alert("지역을 선택해 주세요.");
    } else {
      setLoad(true);
      let attachmentUrl = photo;
      if (attachment) {
        for (let i = 0; i < attachment.length; i++) {
          const attachmentRef = storageService
            .ref()
            .child(`${login.uid}/${uuidv4()}`);
          const response = await attachmentRef.putString(
            attachment[i],
            "data_url"
          );
          attachmentUrl.push(await response.ref.getDownloadURL());
        }
      }

      const updateData = {
        post_title: title,
        post_content: post,
        post_writer,
        post_uid,
        post_date,
        post_id,
        post_photo: attachmentUrl,
        post_profile_img,
        post_region: region,
        post_view,
        post_like,
        post_update: true,
      };

      await dbService.collection("post").doc(post_id).set(updateData);

      isVisible();
      setLoad(false);
      window.location.reload();
    }
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    let file;
    let fileURLs = [];

    for (let i = 0; i < files.length; i++) {
      file = files[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs.push(reader.result);
        setAttachment([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };
  // 추가된 이미지 삭제
  const removeAttachment = (e) => {
    setAttachment(attachment.filter((at) => at !== e));
  };
  // 등록된 이미지들 중 삭제
  const removePhoto = (e) => {
    setPhoto(photo.filter((at) => at !== e));
  };

  const onOverlayClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeModal();
  };

  const close = () => {
    setPost(post_content);
    setTitle(post_title);
    setRegion(post_region);
    setPhoto(post_photo);
    setAttachment([]);
    isVisible();
  }

  //창 닫기
  const closeModal = () => {
    const ok = window.confirm(
      "창을 닫으면 내용이 초기화가 됩니다. 창을 닫으시겠습니까?"
    );
    if (ok) {
      close();
    }
  };

  const closeUpdateModal = () => {
    const ok = window.confirm(
      "게시글 수정을 취소하시겠습니까?"
    );
    if (ok) {
      close();
    }
  }


  return (
    <>
      <S.Overlay visible={visible} onClick={(e) => onOverlayClick(e)}>
        <S.Container visible={visible} isHeight={isHeight}>
          <S.CloseModal onClick={closeModal} className="fas fa-times" />

          {login && (
            <S.Wrapper>
              {likePost.user_image ? (
                <>
                  <img
                    src={likePost.user_image}
                    alt="프로필 이미지입니다"
                  ></img>
                  <S.Name>{likePost.name || login.displayName}</S.Name>
                </>
              ) : (
                <>
                  <S.NamelessIcon className="fas fa-user-circle" />
                  <S.Name>{likePost.name || login.displayName}</S.Name>
                </>
              )}
            </S.Wrapper>
          )}
          <form onSubmit={onSubmit}>
            <S.TitleInput
              name="title"
              type="text"
              value={title}
              ref={titleRef}
              onChange={onChange}
              placeholder="제목을 입력해 주세요."
            />
            <textarea
              name="textarea"
              value={post}
              ref={postRef}
              onChange={onChange}
              placeholder="내용을 입력해주세요."
              rows="10"
            />
            <select name="region" value={region} onChange={onChange}>
              <option value="">지역을 선택해 주세요.</option>
              <option value="asia">Asia</option>
              <option value="north_america">North America</option>
              <option value="south_america">South America</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="oceania">oceania</option>
              <option value="antarctica">Antarctica</option>
            </select>
            <S.ImgUpload>
              <label for="inputFile">사진 선택</label>
              <p>※ ctrl로 사진을 여러장 선택하실 수 있습니다.</p>
              <input
                multiple
                id="inputFile"
                accept="image/*"
                type="file"
                onChange={onFileChange}
                name="fileNames[]"
              />
            </S.ImgUpload>
            <S.ImgWrapper photo={photo} attachment={attachment}>
              {photo &&
                photo.map((atta, i) => (
                  <div>
                    <i
                      onClick={() => removePhoto(atta)}
                      className="fas fa-times"
                    />
                    <img key={i} src={atta} alt="올릴 이미지" />
                  </div>
                ))}
              {attachment &&
                attachment.map((atta, i) => (
                  <div>
                    <i
                      onClick={() => removeAttachment(atta)}
                      className="fas fa-times"
                    />
                    <img key={i} src={atta} alt="올릴 이미지" />
                  </div>
                ))}
            </S.ImgWrapper>
            {load ? (
              <Loading width="30" height="30" />
            ) : (
              <S.BtnWrapper>
                <input type="button" onClick={closeUpdateModal} value="취소" />
                <input type="submit" value="수정" />
              </S.BtnWrapper>
            )}
          </form>
        </S.Container>
      </S.Overlay>
    </>
  );
}
