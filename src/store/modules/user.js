// A R S

// action

const LOGIN_USER_INFO = "user/GET_USER_INFO";
const LOGOUT_USER_INFO = "user/LOGOUT_USER_INFO";

// action 생성자
export const loginUserInfo = (payload) => {
  return {
    type: LOGIN_USER_INFO,
    payload: payload,
  };
};
export const logoutUserInfo = () => {
  return {
    type: LOGOUT_USER_INFO,
  };
};

// initialValue
const initialValue = {
  isLoggedIn: false,
  userInfo: {},
};

// reducer
const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case LOGIN_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT_USER_INFO:
      return {
        ...state,
        userInfo: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
