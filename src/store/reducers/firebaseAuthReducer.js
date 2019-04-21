import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAdminAuthenticated: false,
  currentAdmin: [],
  isUserAuthenticated: false,
  currentUser: []
};

const reducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.ADMIN_USER_LOGGED:
      return {
        ...state,
        isAdminAuthenticated: action.dataArray
      };
    case actionTypes.SET_CURRENT_ADMIN:
      return {
        ...state,
        currentAdmin: action.dataArray
      };
    case actionTypes.USER_LOGGED:
      return {
        ...state,
        isUserAuthenticated: action.dataArray
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.dataArray
      };
    default:
      return state;
  }
};

export default reducer;
