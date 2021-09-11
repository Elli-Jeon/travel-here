import { createStore } from 'redux';
import { reducer } from './reducer';

// action

const LOGIN_STATE = 'login/LOGIN_STATE';

// action 생성자
export const setAction = (payload) => {
  return {
    type: LOGIN_STATE,
    isLoggedIn,
    userInfo,
    user,
    email,
    password,
    emailError,
    passwordError,
    hasAccount,
  };
};

// initialValue
export const initialValue = {
  isLoggedIn: false,
  userInfo: {},
  user: action.payload,
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  hasAccount: false,
};

// reducer
const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case LOGIN_STATE:
      return {
        ...state,
        user: action.payload,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        hasAccount: false,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));

const loginState = (text) => {
  store.dispath({ type: LOGIN_STATE, text: toDo });
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  loginState();
};

export default reducer;
