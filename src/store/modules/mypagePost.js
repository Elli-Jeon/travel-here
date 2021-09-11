import { getPostAPI, editMypageImgAPI } from 'store/apis/post';
import { dbService } from 'firebase.js';
const { produce } = require('immer');


// Actions
const GET_POST = 'mypagePost/GET_POST';
const EDIT_IMG = 'mypagePost/EDIT_IMG';
const EDIT_NAME = 'mypagePost/EDIT_NAME';

// Action 생성자
export const getPost = (payload) => {
  return {
    type: GET_POST,
    payload,
  }
};

export const editImg = (payload) => {
  return {
    type: EDIT_IMG,
    payload,
  }
};

export const editName = (payload) => {
  return {
    type: EDIT_NAME,
    payload,
  }
};

// Reducer
const initialState = {
  data: [],
  img: '',
  name: '',
};

const reducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case GET_POST:
        draft.data = action.payload;
        break;
      case EDIT_IMG:
        draft.data = action.payload.arr;
        draft.img = action.payload.img;
        for(let i=0; i<draft.data.length; i++){
          dbService.collection('post').doc(draft.data[i].post_id).update({
            post_profile_img: draft.img,      
          });
        }
        break;
      case EDIT_NAME:
        draft.data = action.payload.arr;
        draft.name = action.payload.name;
        for(let i=0; i<draft.data.length; i++){
          dbService.collection('post').doc(draft.data[i].post_id).update({
            post_writer: draft.name,      
          });
        }
        break;
      default:
        return prevState;
    }
  });
};

// thunk
export const mypagePostMiddleware = (id) => async dispatch => {
  try{
    const response = await getPostAPI(id);
    let arr = [];
    response.forEach(doc => {
      arr.push(doc.data());
    })
    dispatch(getPost(arr));
  }catch(error){
    console.log(error);
  }
}

export const editUserImgThunk = (id, img) => async dispatch => {
  try{
    const response = await editMypageImgAPI(id);
    let arr = {arr: [], img};
    response.forEach(doc => {
      arr.arr.push(doc.data());
    })
    dispatch(editImg(arr));
  }catch(error){
    console.log(error);
  }
}

export const editUserNameThunk = (id, name) => async dispatch => {
  try{
    const response = await editMypageImgAPI(id);
    let arr = {arr: [], name};
    response.forEach(doc => {
      arr.arr.push(doc.data());
    })
    dispatch(editName(arr));
  }catch(error){
    console.log(error);
  }
}

export default reducer;