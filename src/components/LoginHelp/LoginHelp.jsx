import React, { useState } from 'react';
import * as S from './LoginHelp.style';
import firebaseService from 'firebase';
import { useHistory } from 'react-router-dom';

function LoginHelp() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const history = useHistory();

  // 로그인 페이지로 전환
  const routeChange = () => {
    let path = '/login';
    history.push(path);
  };

  const clearErrors = () => {
    setEmailError('');
  };

  const sendPasswordReset = () => {
    clearErrors();
    firebaseService
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail('');
        alert('이메일을 전송 했습니다.');
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          default:
            return;
        }
      });
  };
  return (
    <>
      <S.LoginBg />
      <S.Logincontainer>
        <S.Header>
          <ul>
            <li>
              <h1>비밀번호 재설정</h1>
            </li>

            <li>
              <input
                className="inputEmail"
                type="text"
                value={email}
                autoFocus
                required
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="errorMsg">{emailError}</p>
              <button onClick={sendPasswordReset} className="sendEmailBtn">
                이메일로 받기
              </button>
            </li>
          </ul>
          <S.BackBtn onClick={routeChange}>
            <i className="fas fa-arrow-left"></i>
          </S.BackBtn>
        </S.Header>
      </S.Logincontainer>
    </>
  );
}

export default LoginHelp;
