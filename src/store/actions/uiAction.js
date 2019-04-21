import * as actionTypes from "./actionTypes";

export const uiStartLoading = () => {
  return {
    type: actionTypes.UI_START_LOADING
  };
};
export const uiStopLoading = () => {
  return {
    type: actionTypes.UI_STOP_LOADING
  };
};

export const uiSetStatus = statusData => {
  // console.log(statusData);
  let data = false;
  if (statusData) {
    data = {
      successful: statusData.successful,
      message: statusData.message
    };
  }
  // console.log(data);
  return {
    type: actionTypes.UI_SET_STATUS,
    dataArray: data
  };
};

export const uiSetLoading = (type, data) => {
  if (type === "auth") {
    type = actionTypes.UI_SET_AUTH_CHECKING;
  } else if (type === "users") {
    type = actionTypes.UI_SET_USERS_LOADING;
  }
  return {
    type: type,
    dataArray: data
  };
};

export const uiIsModalOpen = data => {
  return {
    type: actionTypes.UI_SET_MODAL_STATUS,
    dataArray: data
  };
};
export const setExamTime = dateTime => {
  return {
    type: actionTypes.UI_SET_EXAM_START_TIME,
    dataArray: dateTime
  };
};

export const setModalTrigger = data => {
  let type = "";
  if (data.modal === "login") {
    type = actionTypes.UI_SET_LOGIN_MODAL;
  } else if (data.modal === "signUp") {
    type = actionTypes.UI_SET_SIGNUP_MODAL;
  } else if (data.modal === "paypal") {
    type = actionTypes.UI_SET_PAYPAL_MODAL;
  }
  return {
    type: type,
    dataArray: data.trigger
  };
};
