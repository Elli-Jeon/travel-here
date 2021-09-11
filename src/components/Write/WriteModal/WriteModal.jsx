import { useEffect, useRef, useState } from "react";
import * as S from "./WriteModal.style";
import { dbService, storageService } from "firebase.js";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import { userMiddleware } from "store/modules/userLike";
import { useDispatch, useSelector } from "react-redux";
import UpdateModal from "./UpdateModal";
import { useMediaQuery } from "react-responsive";
import { useHistory, useLocation } from "react-router";
import Loading from "../../Loading/Loading";

export default function WriteModal({ visible, isVisible, postData }) {
  const auth = firebase.auth();
  const isHeight = useMediaQuery({ maxHeight: 765 });

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [attachment, setAttachment] = useState([]);
  const [load, setLoad] = useState(false);
  const [login, setLogin] = useState("");

  const postRef = useRef();
  const titleRef = useRef();

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
  // // 해당 유저가 좋아요한 post의 post_id 배열(users collection에 담김)
  let likePost = useSelector((state) => state.userLike.data);
  // // 해당 유저가 북마크한 post의 post_id 배열(users collection에 담김)
  let bookmark = useSelector((state) => state.userLike.data);

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
      let attachmentUrl = [];
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

      const ID = login.uid;
      const uuid = uuidv4();

      // users collection의 user_write_posts에 post_id 추가
      await dbService
        .collection("users")
        .doc(ID)
        .update({
          user_write_posts: firebase.firestore.FieldValue.arrayUnion(uuid),
        });

      // 정보 올리기

      const writeData = {
        post_title: title,
        post_content: post,
        post_writer: likePost.name || login.displayName,
        post_uid: login.uid,
        post_date: Date.now(),
        post_id: uuid,
        post_photo: attachmentUrl,
        post_profile_img: likePost.user_image || login.photoURL,
        post_region: region,
        post_view: 0,
        post_like: 0,
        uid: login.uid,
        post_update: false,
      };

      await dbService.collection("post").doc(uuid).set(writeData);
      setPost("");
      setTitle("");
      setRegion("");
      setAttachment([]);
      isVisible();
      setLoad(false);
      if (location.pathname === `/categorylist/${region}`) {
        // 모달 띄우기
        history.push({
          pathname: `/categorylist/${region}`,
          search: `?id=${uuid}`,
          state: {
            like: likePost.user_like_posts,
            bookmark: bookmark.user_bookmark_posts,
            postData,
            write: 'write',
          },
        });
        window.location.reload();
      } else {
        history.push({
          pathname: `/categorylist/${region}`,
          state: { uuid },
        });
      }
    }
  };
  // 파일을 여러개 추가
  const onFileChange = (e) => {
    const { files } = e.target;
    let file;
    let fileURLs = [];

    for (let i = 0; i < files.length; i++) {
      file = files[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setAttachment([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onOverlayClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeModal();
  };

  //창 닫기
  const closeModal = () => {
    const ok = window.confirm(
      "창을 닫으면 내용이 초기화가 됩니다. 창을 닫으시겠습니까?"
    );
    if (ok) {
      setPost("");
      setTitle("");
      setRegion("");
      setAttachment([]);
      isVisible();
    }
  };

  // 올린파일 개별 삭제
  const removeAttachment = (e) => {
    setAttachment(attachment.filter((at) => at !== e));
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLogin(user);
      dispatch(userMiddleware(user.uid, "", "init"));
    });
  }, []);

  return (
    <>
      {postData ? (
        <UpdateModal
          visible={visible}
          isVisible={isVisible}
          postData={postData}
          login={login}
          isHeight={isHeight}
          likePost={likePost}
        />
      ) : (
        <>
          <S.Overlay visible={visible} onClick={(e) => onOverlayClick(e)}>
            <S.Container visible={visible} isHeight={isHeight}>
              <S.CloseModal onClick={closeModal} className="fas fa-times" />
              {likePost && (
                <S.Wrapper>
                  {login.photoURL || likePost.user_image ? (
                    <>
                      <img
                        src={likePost.user_image || login.photoURL}
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
                  value={title}
                  name="title"
                  type="text"
                  tabIndex="1"
                  ref={titleRef}
                  onChange={onChange}
                  placeholder="제목을 입력해 주세요."
                />
                <textarea
                  value={post}
                  name="textarea"
                  ref={postRef}
                  tabIndex="2"
                  onChange={onChange}
                  placeholder="내용을 입력해주세요."
                  rows="10"
                />
                <select
                  name="region"
                  value={region}
                  onChange={onChange}
                  tabIndex="3"
                >
                  <option value="">지역을 선택해 주세요.</option>
                  <option value="asia">Asia</option>
                  <option value="europe">Europe</option>
                  <option value="north_america">North America</option>
                  <option value="south_america">South America</option>
                  <option value="africa">Africa</option>
                  <option value="oceania">oceania</option>
                  <option value="antarctica">Antarctica</option>
                </select>
                <S.ImgUpload>
                  <label for="inputFile" tabIndex="4">
                    사진 선택
                  </label>
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
                <S.ImgWrapper attachment={attachment}>
                  {attachment &&
                    attachment.map((atta, i) => (
                      <div>
                        <i
                          title="해당 사진 삭제"
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
                    <input
                      type="button"
                      tabIndex="5"
                      onClick={closeModal}
                      value="취소"
                    />
                    <input type="submit" tabIndex="6" value="등록" />
                  </S.BtnWrapper>
                )}
              </form>
            </S.Container>
          </S.Overlay>
        </>
      )}
    </>
  );
}
