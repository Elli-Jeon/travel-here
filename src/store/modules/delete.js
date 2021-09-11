import { commentDelAPI } from 'store/apis/delete';
import { userLikeDelAPI } from 'store/apis/delete';
import { userBookmarkDelAPI } from 'store/apis/delete';
import { userComDelAPI } from 'store/apis/delete';
import { dbService } from 'firebase.js';
import firebase from 'firebase';
const { produce } = require('immer');


// Actions
const COMMENT_DEL = 'delete/COMMENT_DEL';
const USERCOMMENT_DEL = 'delete/USERCOMMENT_DEL';
const USERLIKE_DEL = 'delete/USERLIKE_DEL';
const USERBOOKMARK_DEL = 'delete/USERBOOKMARK_DEL';


// Action 생성자
export const commentDelete = (payload) => {
  return {
    type : COMMENT_DEL,
    payload,
  }
}

export const userComDelete = (payload) => {
  return {
    type : USERCOMMENT_DEL,
    payload,
  }
}

export const userLikeDelete = (payload) => {
  return {
    type : USERLIKE_DEL,
    payload,
  }
}

export const userBookmarkDelete = (payload) => {
  return {
    type : USERBOOKMARK_DEL,
    payload,
  }
}


// thunk
export const commentDelThunk = (id) => async dispatch => {
  try{
    const response = await commentDelAPI(id);
    const payload = [];
    response.forEach(doc => {
      payload.push(doc.data());
    })
    dispatch(commentDelete(payload));
  }catch(error){
    console.log(error);
  }
}

let com = {data: [], id: ''};
export const userComDelThunk = (id) => async dispatch => {
  try{
    const response = await userComDelAPI(id);
    // const obj = {data: [], id};
    // response.forEach(doc => {
      //   obj.data.push(doc.data());
      // })
    com.id = id;
    response.forEach(doc => {
      com.data.push(doc.data());
    })
    let array = Object.assign([], com.data);
    com.data = array;
    dispatch(userComDelete(com));
  }catch(error){
    console.log(error);
  }
}

export const userLikeDelThunk = (id) => async dispatch => {
  try{
    const response = await userLikeDelAPI(id);
    const obj = {data: [], id};
    response.forEach(doc => {
      obj.data.push(doc.data());
    })
    dispatch(userLikeDelete(obj));
  }catch(error){
    console.log(error);
  }
}

export const userBookmarkDelThunk = (id) => async dispatch => {
  try{
    const response = await userBookmarkDelAPI(id);
    const obj = {data: [], id};
    response.forEach(doc => {
      obj.data.push(doc.data());
    })
    dispatch(userBookmarkDelete(obj));
  }catch(error){
    console.log(error);
  }
}

// Reducer
const initialState = {
  data : [],
  id: '',
};

let getCom = [];
export const getComId = (arr) => {
  if(getCom.length === 2){
    getCom = [];
  }
  getCom.push(arr);
  return getCom;
}

let count = -1;
let arr = [];
const reducer = (prevState=initialState, action) => {
  return produce(prevState, (draft) => {
    switch(action.type){
      case COMMENT_DEL :
        draft.data = action.payload;
        for(let i=0; i<draft.data.length;i++){
          dbService.collection('comment').doc(draft.data[i].comment_id).delete();
          arr.push(draft.data[i].comment_id);
        }
        getComId(arr);
        break;
      case USERCOMMENT_DEL :
        count+=1;
        draft.id = action.payload.id;
        draft.data = action.payload.data[count];
        draft.data.uid = action.payload.data[count].uid;

        dbService.collection('users').doc(draft.data.uid).update({
          user_write_comments: firebase.firestore.FieldValue.arrayRemove(draft.id),
        });

        if(count === draft.data.length-1){
          count = -1;
        }
        break;
      case USERLIKE_DEL :
        draft.id = action.payload.id;
        for(let i=0; i<action.payload.data.length;i++){
          draft.data = action.payload.data[i];
          dbService.collection('users').doc(draft.data.uid).update({
            user_like_posts: firebase.firestore.FieldValue.arrayRemove(draft.id),
          });
        }
        break;
      case USERBOOKMARK_DEL :
        draft.id = action.payload.id;
        for(let i=0; i<action.payload.data.length;i++){
          draft.data = action.payload.data[i];
          dbService.collection('users').doc(draft.data.uid).update({
            user_bookmark_posts: firebase.firestore.FieldValue.arrayRemove(draft.id),
          });
        }
        break;
      default :
          return prevState;
    }
  })
}

export default reducer;