import { getBookmarkAPI } from 'store/apis/post';
const { produce } = require('immer');


// Actions
const GET_BOOKMARK = 'mypageBookmark/GET_BOOKMARK';

// Action 생성자
export const getBookmark = (payload) => {
  return {
    type: GET_BOOKMARK,
    payload,
  }
};

// Reducer
const initialState = {
  data: [],
  loading: false,
};

const reducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case GET_BOOKMARK:
        draft.data = action.payload;
        draft.loading = true;
        break;
      default:
        return prevState;
    }
  });
};



let arr = [];
// thunk
export const mypageBookmarkMiddleware = (id, type) => async dispatch => {
  try{
    const response = await getBookmarkAPI(id);
    response.forEach(doc => {
      arr.push(doc.data());
    })
    let array = Object.assign([], arr);
    dispatch(getBookmark(array));
    if(type === 'finish'){
      arr = [];
    }
  }catch(error){
    console.log(error);
  }
}

export default reducer;


