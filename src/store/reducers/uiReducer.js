// import * as actionTypes from "../actions/actionTypes";

const initState = {
  isLoading: false,
  status: false,
  authChecking: true,
  isModalOpen: false,
  timerDate: { dateTime: new Date().getTime() },
  loginModalActive: false,
  signUpModalActive: false,
  paypalModalActive: false
};
const reducers = (state = initState, action) => {
  // console.log(action.dataArray);
  switch (action.type) {
    //   case actionTypes.UI_START_LOADING:
    //     return {
    //       ...state,
    //       isLoading: true
    //     };
    //   case actionTypes.UI_STOP_LOADING:
    //     return {
    //       ...state,
    //       isLoading: false
    //     };
    //   case actionTypes.UI_SET_STATUS:
    //     return {
    //       ...state,
    //       status: action.dataArray
    //     };
    //   case actionTypes.UI_SET_AUTH_CHECKING:
    //     return {
    //       ...state,
    //       authChecking: action.dataArray
    //     };
    //   case actionTypes.UI_SET_MODAL_STATUS:
    //     return {
    //       ...state,
    //       isModalOpen: action.dataArray
    //     };
    //   case actionTypes.UI_SET_EXAM_START_TIME:
    //     return {
    //       ...state,
    //       timerDate: action.dataArray
    //     };
    //   case actionTypes.UI_SET_LOGIN_MODAL:
    //     return {
    //       ...state,
    //       loginModalActive: action.dataArray
    //     };
    //   case actionTypes.UI_SET_SIGNUP_MODAL:
    //     return {
    //       ...state,
    //       signUpModalActive: action.dataArray
    //     };
    //   case actionTypes.UI_SET_PAYPAL_MODAL:
    //     return {
    //       ...state,
    //       paypalModalActive: action.dataArray
    //     };
    default:
      return state;
  }
};

export default reducers;
