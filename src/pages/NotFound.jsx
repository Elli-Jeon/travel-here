import React from "react";
import { useHistory } from 'react-router';
import * as S from "./NotFound.style";

export default function NotFound() {

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  }

  return (
    <S.Container>
      <section>
        <h1>404</h1>
        <div>
          <h2>SORRY!</h2>
          <p>페이지를 찾을 수 없습니다</p>
          <button onClick={goBack}>Go Back</button>
        </div>
      </section>
    </S.Container>
  );
}
