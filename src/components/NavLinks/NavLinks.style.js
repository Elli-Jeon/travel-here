import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const Header = styled.div`
  width: 100vw;
  padding-bottom: 1rem;
  `;


const Container = styled.div`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  ${(props) => {
    if (!props.isPc && props.login) {
      return css`
        background-color: rgba(0, 0, 0, 0.7);
        width: 100vw;
        height: 200px;
        transition: 0.3s;
        transform: ${(props) =>
          props.isNavOpened ? "translateY(0px)" : "translateY(-200px)"};
        align-items: ${(props) =>
          props.isNavOpened && "flex-start"};
      `;
    }
    if(!props.isPc && !props.login){
      return css`
        background-color: rgba(0, 0, 0, 0.7);
        width: 100vw;
        height: 170px;
        transition: 0.3s;
        transform: ${(props) =>
          props.isNavOpened ? "translateY(0px)" : "translateY(-170px)"};
        align-items: ${(props) =>
          props.isNavOpened && "flex-start"};
      `;
    }
  }}
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  font-weight: bold;
  ${(props) => {
    if (!props.isPc) {
      return css`
        flex-direction: ${(props) =>
          props.isNavOpened ? "row" : "column"};
        justify-content: ${(props) =>
          props.isNavOpened ? "flex-end" : "center"};
        margin-bottom: ${(props) =>
          props.isNavOpened ? "0" : "2rem"};
      `;
    }
  }} 
  li {
    ${(props) => {
    if (!props.isPc) {
      return css`
        margin: ${(props) =>
          props.isNavOpened ? "0 0 0 5rem" : "0rem 0 1.2rem 0"};
      `;
      }
    }} 
  }
`;

const Li = styled.li`
  margin-left: 5rem;
  font-size: 1.5rem;
  :hover{
    cursor: pointer;
  }
  a {
    color: white;
  }
  
`;

const Button = styled.button`
  padding: 0;
  font-weight: bold;
  margin-right: 3rem;
  font-size: 1.5rem;
  color: white;
  border: none;
  background: transparent;
  :hover{
    cursor: pointer;
  }
  ${(props) => {
  if (!props.isPc) {
    return css`
      margin-right: ${(props) =>
        props.isNavOpened || "0" };
    `;
  }
  }} 
`;

const StyledNav = styled(NavLink)`

`;

export { Container, Ul, Li, Button, Header, StyledNav };
