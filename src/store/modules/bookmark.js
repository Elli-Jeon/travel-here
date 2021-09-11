import { getUserAPI } from 'store/apis/userLike';
import { dbService } from 'firebase.js';
import firebase from "firebase";
const { produce } = require('immer');


// Actions
const GET_USER = 'userLike/GET_USER';
const BOOKMARK  = 'userLike/BOOKMARK';
const NONE_BOOKMARK = 'userLike/NONE_BOOKMARK';

// Action 생성자
export const getUser = (payload) => {
  return {
    type: GET_USER,
    payload,
  }
};

export const bookmark = (payload) => {
  return {
    type: BOOKMARK,
    payload,
  }
};

export const noneBookmark = (payload) => {
  return {
    type: NONE_BOOKMARK,
    payload,
  }
};  

// Reducer
const initialState = {
  data: [],
  post: '',
};


const reducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case GET_USER:
        draft.data = action.payload.user[0];
        draft.post = action.payload.postId;
        break;
      case BOOKMARK:
        draft.data = action.payload.user[0];
        draft.post = action.payload.postId;
        let postIds = '';
        postIds = draft.post;
        dbService.collection('users').doc(draft.data.uid).update({
          user_bookmark_posts: firebase.firestore.FieldValue.arrayUnion(postIds),      
        });
        break;
      case NONE_BOOKMARK:
        draft.data = action.payload.user[0];
        draft.post = action.payload.postId;
        dbService.collection('users').doc(draft.data.uid).update({
          user_bookmark_posts: draft.data.user_bookmark_posts.filter((elem) => elem !== draft.post),      
        });
        break;
      default:
        return prevState;
    }
  });
};

// thunk
export const bookmarkMiddleware = (userId, postId, type) => async dispatch => {
  try{
    const response = await getUserAPI(userId);
    let arr = {user: [], postId};
    response.forEach(doc => {
      arr.user.push(doc.data());
    });
    if(type === 'init'){
      dispatch(getUser(arr));
      return;
    }
    if(type === 'bookmark'){
      dispatch(bookmark(arr));
    }else{
      dispatch(noneBookmark(arr));
    };
  }catch(error){
    console.log(error);
  };
};

export default reducer;


