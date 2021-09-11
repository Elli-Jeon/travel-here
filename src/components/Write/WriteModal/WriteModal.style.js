import styled, { css } from "styled-components";

const primaryColor = "#1a46a0";
const gray = "#e3e3e3";
const lightBlack = "#333333";

const Container = styled.div`
  width: 80vw;
  background-color: white;
  border-radius: 0.3rem;
  transition: ${(props) => (props.visible ? "0.5s" : "1s")};
  overflow: hidden;
  opacity: ${(props) => (props.visible ? 1 : 1)};
  transform: ${(props) =>
    props.visible ? "translateY(0)" : "translateY(-75rem)"};
  z-index: ${(props) => (props.visible ? 100 : -1)};
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  p {
    margin-top: 1rem;
    margin-left: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  /* input, */
  textarea,
  select {
    margin: 1rem 0.5rem 0;
    border: 2px solid ${gray};
    border-radius: 5px;
    /* outline: none; */
    option {
      color: ${lightBlack};
    }
  }
  select:hover {
    cursor: pointer;
  }
  input:last-child {
    margin-bottom: 1rem;
  }
  textarea {
    resize: vertical;
    min-height: 15rem;
    max-height: 28rem;
    caret-color: black;
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background-color: lightgray;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: darkgray;
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
    ${(props) =>
      !props.isHeight &&
      css`
        height: 40vh;
    `}
  }
`;
const TitleInput = styled.input`
  margin: 1rem 0.5rem 0;
  border: 2px solid ${gray};
  border-radius: 5px;
  caret-color: black;
`;
const ImgUpload = styled.div`
  height: 1.6rem;
  position: relative;
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  label {
    position: absolute;
    top: 50%;
    margin-top: calc(-1rem / 2);
    left: 0.5rem;
    color: white;
    font-size: 0.8rem;
    background: ${primaryColor};
    padding: 0.4rem 0.8rem;
    border-radius: 10px;
    transition: 0.3s;
    :hover {
      cursor: pointer;
    }
  }
  p {
    margin: 0.7rem 0 0 6rem;
    font-size: 0.8rem;
    color: red;
  }
  input {
    display: none;
  }
`;
const ImgWrapper = styled.div`
  margin: 0.5rem 0.5rem 0;
  height: 80px;
  border: 2px solid ${gray};
  border-radius: 10px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
      height: 0.4rem;
    }
    ::-webkit-scrollbar-track {
      height: 0.4rem;
      border-radius: 40px;
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      height: 0.4rem;
      border-radius: 40px;
      background-color: skyblue;
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
  div {
    position: relative;
    i {
      position: absolute;
      top: 0.3rem;
      right: 0.3rem;
      font-size: 0.8rem;
      width: 1rem;
      height: 1rem;
      background: #ff0000;
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 1.3;
      :hover {
        cursor: pointer;
      }
    }
    img {
      margin: 0.2rem;
      width: 70px;
      height: 70px;
    }
  }
  ${(props) => {
    if (props.attachment === undefined) {
      return;
    }
    if (props.attachment.length === 0) {
      return css`
        display: none;
      `;
    } else {
      return css`
        display: flex;
      `;
    }
  }}

  ${(props) => {
    if (props.photo === undefined) {
      return;
    }
    if (props.attachment.length === 0){
      if (props.photo.length === 0) {
        return css`
          display: none;
        `;
      } else {
        return css`
          display: flex;
        `;
      }
    }
  }}
`;

const BtnWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  text-align: center;
  input {
    background-color: ${primaryColor};
    width: 8rem;
    font-weight: 700;
    color: white;
    height: 2rem;
    border: none;
    font-size: 1.1rem;
    border: none;
    text-align: center;
    transition: 0.3s;
    margin: auto;
    border-radius: 5px;
    :hover {
      cursor: pointer;
      border: 1px solid ${primaryColor};
      color: ${primaryColor};
      background-color: transparent;
    }

    :nth-child(1) {
      color: #555555;
      margin-right: 1rem;
      background-color: ${gray};
      :hover {
        border: 1px solid ${lightBlack};
        background-color: transparent;
      }
    }
  }
`;
const Wrapper = styled.span`
  width: 100%;
  display: flex;
  align-items: center;

  margin: 1rem 0 0 0.5rem;
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.3rem;
  }
  span {
    margin-left: 0.2rem;
  }
`;
const NamelessIcon = styled.i`
  font-size: 2rem;
  color: darkgray;
  left: 0;
  margin: 0 0.3rem 0 0.2rem;
`;
const Name = styled.span`
  color: rgba(0, 0, 0, 0.6);
`;

const CloseModal = styled.i`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  :hover {
    cursor: pointer;
  }
`;
const Overlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  transition: ${(props) => (props.visible ? '0.5s' : '1s')};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) =>
    props.visible ? "translateY(0)" : "translateY(-88rem)"};
  z-index: ${(props) => (props.visible ? 90 : -2)};
`;

export {
  Container,
  Overlay,
  Wrapper,
  Name,
  ImgWrapper,
  NamelessIcon,
  CloseModal,
  ImgUpload,
  BtnWrapper,
  TitleInput,
};
