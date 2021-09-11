import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const CategoryBox = styled.div`
  position: relative;
  border-radius: 1rem;
  z-index: 1;

  ${(props) => {
    if (!props.isPc) {
      return css`
        margin-top: 10%;
      `;
    } else {
      return css`
        margin-top: 30%;
      `;
    }
  }}
  h3 {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 700;
    font-size: 2rem;
    margin: 0.5rem;
    text-align: center;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 10px;
    border-radius: 10px;
    ${(props) => {
      if (!props.isPc) {
        return css`
          max-height: 50vh;
        `;
      } else {
        return css`
          max-height: 20vh;
        `;
      }
    }}

    img {
      width: 120%;
    }
  }
`;
const ArrowStyle = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  cursor: pointer;
  top: 0;
  bottom: 0;
  margin: auto 0;
  transition: 0.5s;
  :hover {
    background-color: rgba(255, 255, 255, 0.9);
  }

  ${(props) => {
    if (props.right) {
      return css`
        right: 0;
      `;
    } else {
      return css`
        left: 0;
      `;
    }
  }}
`;
const Relative = {
  position: "relative",
};
const LinkStyle = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const SkeletonWrapper = styled.div`
  margin-top: 13rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SkeletonTitle = styled.div`
  width: ${(props) => (props.isPc ? "70vw" : "25vw")};
  height: ${(props) => (props.isPc ? "4vh" : "2.5vh")};
  background-color: rgba(100, 100, 100, 0.5);
  margin-left: 1rem;
  border-radius: 0.5rem;
`;
const SkeletonImg = styled.div`
  width: ${(props) => (props.isPc ? "80vw" : "30vw")};
  height: ${(props) => (props.isPc ? "40vh" : "15vh")};
  background-color: rgba(100, 100, 100, 0.5);
  margin-left: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
`;
export {
  LinkStyle,
  ArrowStyle,
  Relative,
  CategoryBox,
  SkeletonContainer,
  SkeletonTitle,
  SkeletonImg,
  SkeletonWrapper,
};
