import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { loginUserInfo, logoutUserInfo } from 'store/modules/user';
import { userMiddleware } from 'store/modules/userLike';
import { dbService } from 'firebase.js';

const useAuth = () => {
  const { isLoggedIn, userInfo } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  }));
  const dispatch = useDispatch();

  const login = (providerName) => {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebase.auth().signInWithPopup(authProvider);
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logoutUserInfo());
      });
  };

  const onAuthChange = (onUserChanged) => {
    firebase.auth().onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // 로그인한 유저가 있다면
      if (user) {
        const userDB = await dbService.collection('users').doc(user.uid).get();
        // 유저 정보가 db에 저장되어 있다면
        if (userDB.exists) {
          dispatch(loginUserInfo(userDB.data()));
          dispatch(userMiddleware(user.uid, '', 'init'));
          // 아니면 새로 저장해야
        } else {
          const value = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || '익명',
            user_image: user.photoURL,
            user_like_comments: [],
            user_like_posts: [],
            user_bookmark_posts: [],
            user_write_comments: [],
            user_write_posts: [],
          };
          dbService.collection('users').doc(user.uid).set(value);
          dispatch(loginUserInfo(value));
        }
        // 로그인한 유저가 없다면
      } else {
        dispatch(logoutUserInfo());
      }
    });
  }, []);

  return [isLoggedIn, userInfo, login, logout, onAuthChange];
};

export default useAuth;
