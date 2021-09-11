import React, { useEffect, useState } from 'react';
import * as S from './LoginModalOpen.style';
import LoginHeader from 'components/LoginModal/header/LoginHeader';
import AuthService from 'auth_service';
import firebaseService from 'firebase';
import NavLinks from 'components/NavLinks/NavLinks';
import { useHistory } from 'react-router-dom';

function LoginModalOpen() {
  const authService = new AuthService();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const history = useHistory();

  const goToPassword = () => {
    let path = '/LoginHelp';
    history.push(path);
  };

  const toggleClass = () => {
    setHasAccount(!hasAccount);
  };

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  // 로그인
  const handleLogin = async () => {
    clearErrors();
    firebaseService
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
          default:
            return;
        }
      });
  };

  // 회원가입
  const handleSignUP = async () => {
    clearErrors();
    firebaseService
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
          default:
            return;
        }
      });
  };

  // 로그아웃
  const handleLogout = () => {
    firebaseService.auth().signOut();
  };

  // 현재 로그인한 사용자 가져오기
  const authListener = () => {
    firebaseService.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  function getUserProfile() {
    const user = firebaseService.auth().currentUser;
    if (user !== null) {
      const displayName = user.displayName;
      const email = user.email;
    }
  }

  useEffect(() => {
    authListener();
  }, []);

  return (
    <>
      {user ? (
        <NavLinks user={user} setUser={setUser} handleLogout={handleLogout} />
      ) : (
        <>
          <S.LoginBg />
          <S.Logincontainer>
            <LoginHeader
              authService={authService}
              user={user}
              setUser={setUser}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignUP={handleSignUP}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
              toggleClass={toggleClass}
              goToPassword={goToPassword}
              getUserProfile={getUserProfile}
            />
          </S.Logincontainer>
        </>
      )}
    </>
  );
}

export default LoginModalOpen;
