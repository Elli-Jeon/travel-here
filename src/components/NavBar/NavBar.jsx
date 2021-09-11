import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openNav, closeNav } from "store/modules/nav";
import * as S from "./NavBar.style";

export default function NavBar() {
  const { isNavOpened }  = useSelector(state => state.nav);
  const dispatch = useDispatch();

  const navToggle = () => {
    if(isNavOpened){
      dispatch(closeNav())
    } else {
      dispatch(openNav())
    }
  }

  return (
    <S.Container onClick={navToggle}>
      <S.Line></S.Line>
      <S.Line width="17px"></S.Line>
    </S.Container>
  );
}
