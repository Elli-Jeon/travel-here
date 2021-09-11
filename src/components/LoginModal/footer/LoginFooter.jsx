import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './LoginFooter.style';

function LoginFooter({ authService }) {
  const history = useHistory();
  // 로그아웃 페이지 전환
  const goToLogin = (userId) => {
    history.push({
      pathname: '/',
      state: { id: userId },
    });
  };

  // 로그인 페이지로 전환
  const routeChange = () => {
    let path = '/';
    history.push(path);
  };

  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then((data) => {
        goToLogin(data.user.uid);
      });
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToLogin(user.uid);
    });
  });

  return (
    <>
      <S.Footer>
        <ul>
          {/* Google login button */}
          <li>
            <button onClick={onLogin}>
              <span>
                <i className="fab fa-google"></i>
              </span>
              <p>Google</p>
            </button>
          </li>
          {/* Github login button*/}
          <li>
            <button onClick={onLogin}>
              <span>
                <i className="fab fa-github"></i>
              </span>
              <p>Github</p>
            </button>
          </li>
          {/* Twitter login button */}
          <li>
            <button onClick={onLogin}>
              <span>
                <i className="fab fa-twitter"></i>
              </span>
              <p>Twitter</p>
            </button>
          </li>
        </ul>
        {/* Home return button */}
        <button className="closeBtn" onClick={routeChange}>
          <i className="fas fa-arrow-left"></i>
        </button>
      </S.Footer>
    </>
  );
}

export default LoginFooter;
