import styled from "styled-components";
import background from "../assets/images/background.jpeg";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  
`;

export const Content = styled.section`
  width: 100%;
  height: calc(100vh - 55px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
