import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.dataArray
      };

    default:
      return state;
  }
};

export default reducer;
