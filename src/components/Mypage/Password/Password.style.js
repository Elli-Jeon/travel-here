import styled from 'styled-components';
import {
  flex,
  marginTop,
  fontSize,
  hideScrollbar,
  cursorPointer,
  frame,
} from '../styleConstatns';

const pink = "#ff73b3";

const Container = styled.section`
  width: 100vw;
  height: 90vh;
  ${flex};
  flex-direction: row;
  caret-color: transparent;
`;

const BackBtn = styled.button`
  position: absolute;
  color: white;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 24px;
  top: 1em;
  right: 1em;
`;

const Contents = styled.div`
  position: relative;
  width: 20rem;
  height: 10rem;
  border-radius: 20px;
  ${flex};
  overflow: hidden;
  margin-bottom: 3rem;
  h3 {
    margin-bottom: 16px;
    font-size: 13px;
  }
  .errorMsg {
    font-size: 0.6rem;
  }
  h1 {
    font-size: 34px;
    color: white;
    margin-bottom: 2.5rem;
  }
  input {
    margin-bottom: 1rem;
    display: block;
    padding: 8px;
    width: 70%;
    height: 2rem;
    border-radius: 12px;
    outline: none;
    box-shadow: 0 0 5px 1px ${pink};
    caret-color: black;
  }
  p {
    color: white;
  }
  .chageBtn {
    border: none;
    width: 5rem;
    height: 2rem;
    border-radius: 12px;
    color: #fff;
    background-color: ${pink};
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;
    box-shadow: 0 0 5px ${pink};
  }
`;

export { BackBtn, Contents, Container };
