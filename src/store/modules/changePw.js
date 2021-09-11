import { passwordChange } from 'store/apis/changePw';
import firebase from 'firebase';

const { produce } = require('immer');

// Actions
const PASSWORD_CHANGE = 'changePw/PASSWORD_CHANGE';

// Action 생성자
export const pwChange = (payload) => {
  return {
    type: PASSWORD_CHANGE,
    payload,
  };
};

// Reducer
const initialState = {
  data: [],
  password: '',
};

const reducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case PASSWORD_CHANGE:
        draft.data = action.payload;
        break;
      default:
        return prevState;
    }
  });
};

// thunk
export const userMiddleware = (password) => async (dispatch) => {
  try{
    const response = await getPassword(password)
  
    // [START auth_update_password]
    const user = firebase.auth().currentUser;
    const newPassword = getASecureRandomPassword();
  
    user
      .updatePassword(newPassword)
      .then(() => {
        setPassword('');
        console.log('Update successful');
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setPasswordError(err.message);
            break;
          default:
            return;
        }
      })
    }
};

export default reducer;
