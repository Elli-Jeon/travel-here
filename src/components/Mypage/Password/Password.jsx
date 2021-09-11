import React, { useState } from 'react';
import * as S from './Password.style';
import firebase from 'firebase';

const Password = () => {
  const [password, setPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [change, setChange] = useState(false);

  const clearErrors = () => {
    setPasswordError('');
  };

  // 패스워드 변경
  const passwordChange = async () => {
    clearErrors();
    function getASecureRandomPassword() {
      return password;
    }

    // [START auth_update_password]
    const user = firebase.auth().currentUser;
    const newPassword = getASecureRandomPassword();

    user
      .updatePassword(newPassword)
      .then(() => {
        setPassword('');
        alert('패스워드가 변경 되었습니다.');
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/requires-recent-login':
          case 'auth/weak-password':
          case 'auth/argument-error':
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
          default:
            return;
        }
      });
  };

  // 재인증
  const reAuth = () => {
    clearErrors();
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        user.updatePassword(password).then(function () {
          setPassword('');
          alert('재인증 되었습니다!');
          setChange(!change);
        });
      })
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case 'auth/wrong-password':
          case 'auth/too-many-requests':
            setPasswordError(err.message);
            break;
          default:
            return;
        }
      });
  };

  return (
    <>
      <S.Contents>
        {change ? (
          <>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <p className="errorMsg">{passwordError}</p>
            <button className="chageBtn" onClick={passwordChange}>
              변경
            </button>
          </>
        ) : (
          <>
            <h3>계속하려면 먼저 본인임을 인증하세요.</h3>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <p className="errorMsg">{passwordError}</p>
            <button className="chageBtn" onClick={reAuth}>
              재인증
            </button>
          </>
        )}
      </S.Contents>
    </>
  );
};

export default Password;
