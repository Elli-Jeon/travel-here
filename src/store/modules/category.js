import { dbService } from "firebase.js";

const initPhoto =
  "https://firebasestorage.googleapis.com/v0/b/travel-here-36a2e.appspot.com/o/HlCc4DymorVti0MHAKahOG2TDEv2%2F2148e2a6-0ee1-4adb-927c-873bb956c872?alt=media&token=26e06540-1638-4abc-ab51-6ae1506082f2";

//actions
const GET_CATEGORY_START = "category/GET_CATEGORY_START";
const GET_CATEGORY_SUCCESS = "category/GETCATEGORY_SUCCESS";
const GET_CATEGORY_FAIL = "category/GET_CATEGORY_FAIL";

//action constructor
export function getCategoryStart() {
  return {
    type: GET_CATEGORY_START,
  };
}

export function getCategorySuccess(data) {
  return {
    type: GET_CATEGORY_SUCCESS,
    data,
  };
}

export function getCategoryFail(error) {
  return {
    type: GET_CATEGORY_FAIL,
    error,
  };
}

// initial
const initialState = {
  loading: false,
  data: [],
  error: null,
};

// reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
} // redux-thunk
export function getCategoryThunk() {
  return async (dispatch, getState) => {
    try {
      dispatch(getCategoryStart());
      const res = await dbService.collection("post").get();
      let resArray = [
        {
          region: "asia",
          photo: initPhoto,
        },
        {
          region: "north_america",
          photo: initPhoto,
        },
        {
          region: "south_america",
          photo: initPhoto,
        },
        {
          region: "africa",
          photo: initPhoto,
        },
        {
          region: "europe",
          photo: initPhoto,
        },
        {
          region: "oceania",
          photo: initPhoto,
        },
      ];
      res.forEach((res) => {
        if (res.data().post_photo.length > 0) {
          const random = Math.floor(
            Math.random() * res.data().post_photo.length
          );
          for (let i = 0; i < resArray.length; i++) {
            if (resArray[i].region === res.data().post_region) {
              resArray[i].photo = res.data().post_photo[random];
            }
          }
        }
      });
      dispatch(getCategorySuccess(resArray));
    } catch (e) {
      dispatch(getCategoryFail(e));
    }
  };
}
