import React, {useEffect} from "react";
import { useMediaQuery } from "react-responsive";
import NavLinks from "components/NavLinks/NavLinks";
import NavBar from "components/NavBar/NavBar";
import { openNav, closeNav } from "store/modules/nav";
import { useSelector, useDispatch } from "react-redux";
import * as S from "./Header.style";

export default function Header({ isLoggedIn }) {
  
  const dispatch = useDispatch();

  const { isNavOpened } = useSelector((state) => state.nav);

  const isPc = useMediaQuery({
    query : `(min-width : 1024px)`
  });

  const navToggle = () => {
    if (isNavOpened) {
      dispatch(closeNav());
    } else {
      dispatch(openNav());
    }
  };

  useEffect(()=>{
    if (isPc) {
      dispatch(closeNav());
    }
  },[isPc])


  return (
    <S.Header isPc={isPc} isNavOpened={isNavOpened}>
      <NavLinks isLoggedIn={isLoggedIn} isPc={isPc} isNavOpened={isNavOpened} navToggle={navToggle} />
      <NavBar isPc={isPc} />
    </S.Header>
  );
}
