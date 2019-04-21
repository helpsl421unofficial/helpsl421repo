import * as actionTypes from "../actions/actionTypes";

const initState = {
  isLoading: false
};
const reducers = (state = initState, action) => {
  // console.log(action.dataArray);
  switch (action.type) {
    case actionTypes.UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducers;
