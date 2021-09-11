import { getLikeAPI } from 'store/apis/postLike';
import { dbService } from 'firebase.js';
import { commentDelAPI } from 'store/apis/delete';
const { produce } = require('immer');


// Actions
const GET_VIEW = 'mypagePost/GET_VIEW';
const PLUS_VIEW = 'mypagePost/PLUS_VIEW';

// Action 생성자
export const getView = (payload) => {
  return {
    type: GET_VIEW,
    payload,
  }
};

export const plusView = (payload) => {
  return {
    type: PLUS_VIEW,
    payload,
  }
};

// Reducer
const initialState = {
  view: 1,
};

const reducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case GET_VIEW:
        draft.view = action.payload.num;
        dbService.collection('post').doc(action.payload.id).update({
          post_view: draft.view,
        });
        dbService.collection('comment').doc(action.payload.comId).update({
          post_view: draft.view,
        });
        break;
      case PLUS_VIEW:
        draft.view = action.payload.num+1;
        dbService.collection('post').doc(action.payload.id).update({
          post_view: draft.view,
        });
        dbService.collection('comment').doc(action.payload.comId).update({
          post_view: draft.view,
        });
        break;
      default:
        return prevState;
    }
  });
};

// thunk
export const viewMiddleware = (id, type) => async dispatch => {
  try{
    const response = await getLikeAPI(id);
    const com = await commentDelAPI(id);
    let obj = {num: 0, id, comId: ''};
    response.forEach(doc => {
      obj.num = doc.data().post_view;
    })
    com.forEach(doc => {
      obj.comId = doc.data().comment_id;
    })
    if(type === 'view'){
      dispatch(plusView(obj));
      return;
    }
    if(type === 'init'){
      dispatch(getView(obj));
    }
  }catch(error){
    console.log(error);
  }
}


export default reducer;


