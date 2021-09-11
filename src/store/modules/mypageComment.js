'use strict';
import { getMypageCommentAPI, editMypageAPI } from 'store/apis/comment';
import { dbService } from 'firebase.js';
import { produce } from 'immer';


// Actions
const GET_COMMENT = 'mypageComment/GET_COMMENT';
const EDIT_USERNAME = 'mypageComment/EDIT_USERNAME';
const EDIT_IMG = 'mypageComment/EDIT_IMG';


// Action 생성자
export const getComment = payload => {
  return {
    type : GET_COMMENT,
    payload,
  }
}

export const editCommentUserName = payload => {
  return {
    type : EDIT_USERNAME,
    payload,
  }
}

export const editCommentImg = payload => {
  return {
    type : EDIT_IMG,
    payload,
  }
}


let arr = [];
//thunk
export const mypageCommentMiddleware = (id, type) => async dispatch => {
  try{
    if(type === 'finish'){
      arr = [];
      return;
    }
    const response = await getMypageCommentAPI(id);
    response.forEach(doc => {
      arr.push(doc.data());
    })
    let array = Object.assign([], arr);
    dispatch(getComment(array));
  }catch(error){
    console.log(error);
  }
};

let editObj = {arr: [], value: ''};
export const editMypageThunk = (id, value, type) => async dispatch => {
  try{
    if(type === 'finish'){
      editObj = {arr: [], value: ''};
      return;
    }
    const response = await editMypageAPI(id);
    response.forEach(doc => {
      editObj.arr.push(doc.data());
      editObj.value = value;
    })
    let array = Object.assign([], editObj.arr);
    editObj.arr = array;
    if(type === 'name'){
      dispatch(editCommentUserName(editObj));
    }
    if(type === 'img'){
      dispatch(editCommentImg(editObj));
    }
  }catch(error){
    console.log(error);
  }
};



// Reducer
const initialState = {
  data : [],
};

const reducer = (prevState=initialState, action) => {
  return produce(prevState, (draft) => {
    switch(action.type){
      case GET_COMMENT :
        draft.data = action.payload;
        break;
      case EDIT_USERNAME :
        draft.data = action.payload;
        for(let i=0; i<draft.data.arr.length; i++){
          dbService.collection('comment').doc(draft.data.arr[i].comment_id).update({
            comment_writer: draft.data.value,      
          });
        }
        break;
      case EDIT_IMG:
        draft.data = action.payload;
        for(let i=0; i<draft.data.arr.length; i++){
          dbService.collection('comment').doc(draft.data.arr[i].comment_id).update({
            user_image: draft.data.value,      
          });
        }
        break;
      default :
        return prevState;
    }
  })
};


export default reducer;


