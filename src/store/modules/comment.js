import { getCommentAPI } from 'store/apis/comment';
const { produce } = require('immer');

// Actions
const COMMENT_ADD = 'comment/COMMENT_ADD';
const COMMENT_EDIT = 'comment/COMMENT_EDIT';
const COMMENT_ERROR = 'comment/COMMENT_ERROR';
const COMMENT_DELETE = 'comment/COMMENT_DELETE';

// Action 생성자
export const commentAdd = payload => {
  return {
    type : COMMENT_ADD,
    payload,
  }
}
export const commentEdit = payload => {
  return {
    type : COMMENT_EDIT,
    payload,
  }
}
export const commentError = error => {
  return {
    type : COMMENT_ERROR,
    payload : error
  }
}
export const commentDelete = () => {
  return {
    type : COMMENT_DELETE,
  }
}


// thunk
export const commentMiddleware = (id) => async dispatch => {
  try{
    const response = await getCommentAPI(id);
    const payload = [];
    response.forEach(doc => {
      payload.push(doc.data());
    })
    dispatch(commentAdd(payload));
  }catch(error){
    dispatch(commentError(error));
    console.log(error);
  }
}

// Reducer
const initialState = {
  error : null,
  data : [],
};

const reducer = (prevState=initialState, action) => {
  return produce(prevState, (draft) => {
    switch(action.type){
      case COMMENT_ADD :
        draft.data = action.payload;
        break;
      case COMMENT_EDIT :
        draft.data = action.payload;
        break;
      case COMMENT_ERROR :
        draft.data = action.payload;
        break;
      case COMMENT_DELETE :
        draft.data = [];
        break;
      default :
        return prevState;
    }
  })
}

export default reducer;


