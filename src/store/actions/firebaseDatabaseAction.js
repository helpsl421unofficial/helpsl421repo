import firebase from "../firebase/firebase";
import * as actionTypes from "./actionTypes";
import {
  uiStartLoading,
  uiStopLoading,
  uiSetLoading,
  uiSetStatus,
  setModalTrigger
} from "./index";

export const addNewPost = postData => {
  return dispatch => {
    // console.log(postData.data.image);
    let uploadImages = firebase.functions().httpsCallable("storeImages");
    uploadImages(JSON.stringify({ image: postData.data.image }))
      .then(function(result) {
        // Update images column with Image URL
        // console.log(result);
        // image = result.data.imageUrl;

        firebase
          .database()
          .ref("/posts")
          .push({
            title: postData.data.title,
            con1: postData.data.con1,
            con2: postData.data.con2,
            image: result.data.imageUrl,
            desc: postData.data.desc,
            reportFlags: 0,
            status: false,
            addedDate: Date.parse(Date())
          })
          .then(res => {
            // console.log(res);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const getDataFirebase = () => {
  // console.log(getData);
  return dispatch => {
    firebase
      .database()
      .ref("/posts")
      .on(
        "value",
        function(snapshot) {
          let parseRes = snapshot.toJSON();
          let dataArray = [];

          for (let key in parseRes) {
            // console.log(parseRes[key]);
            dataArray.push({
              // ...parseRes[key],
              id: key,
              title: parseRes[key].title,
              con1: parseRes[key].con1,
              con2: parseRes[key].con2,
              desc: parseRes[key].desc,
              src: parseRes[key].image,
              // reportFlags: parseRes[key].reportFlags,
              // status: parseRes[key].status,
              // addedDate: parseRes[key].addedDate,
              width: 4,
              height: 3
            });
          }

          console.log(dataArray);
          dispatch(setReducer(actionTypes.SET_POSTS, dataArray));
        },
        function(error) {
          console.log(error);
        }
      );
  };
};

export const setReducer = (type, dataArray) => {
  return { type, dataArray };
};
