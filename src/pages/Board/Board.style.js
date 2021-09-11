import styled, { css } from "styled-components";

const Container = styled.div`
  margin : 5vh 5vw;
  margin-top: 0;
  padding : 3rem;
  padding-top: 0;
  display: flex;
  justify-content: center;
  ${({isPc, isTablet})=>{
    if(isPc){
      return css`
        flex-direction : row;
      `;
    } else if(isTablet){
      return css`
        flex-direction: row;

      `;
    } else {
      return css`
        flex-direction: column;
      `
    }
  }}
  ${(props) => {
    if (props.isNavOpened) {
      return css`
        transform: ${(props) =>
          props.isNavOpened ? "translateY(110px)" : "translateY(0)"};
        transition: all 300ms ease-in-out;
      `;
    }
  }} 
  
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height : 100%;
`;

export {
  Container,
  Column
}