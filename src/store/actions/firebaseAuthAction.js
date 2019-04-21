import firebase from "../firebase/firebase";
import * as actionTypes from "./actionTypes";
import {
  uiStartLoading,
  uiStopLoading,
  uiSetStatus,
  uiSetLoading,
  setModalTrigger
} from "./index";

export const authenticationFirebase = authData => {
  return dispatch => {
    dispatch(uiStartLoading()); // loading spinner
    dispatch(uiSetStatus(false)); // set no status
    dispatch(uiSetLoading("auth", true)); // full screen loading - auth
    if (authData.mode === "email") {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
          // if auth is for USER
          if (authData.authMode === "user") {
            //   login with email and PW
            firebase
              .auth()
              .signInWithEmailAndPassword(authData.email, authData.password)
              .then(res => {
                console.log(res);
                // if Email ais verified
                if (res.user.emailVerified) {
                  // stop spinner load
                  dispatch(uiStopLoading());
                  // close the modal
                  dispatch(
                    setModalTrigger({
                      modal: "login",
                      trigger: false
                    })
                  );
                  // Set current user email
                  dispatch(
                    setCurrentUserData({ userName: "", email: authData.email })
                  );
                } else {
                  let user = res.user;
                  // resend password verification
                  firebase.auth().signOut();
                  dispatch(
                    uiSetStatus({
                      successful: false,
                      message:
                        "Verify Your Email First (Password Verification Email Sent AGAIN)"
                    })
                  );
                  //   alert("Verify Your Email First");
                  user.sendEmailVerification().then(function() {
                    dispatch(uiStopLoading());
                    //   alert("Your Password Verification Email Sent AGAIN");
                  });
                }
                dispatch(uiSetLoading("auth", false));
              })
              .catch(error => {
                console.log(error);
                dispatch(
                  uiSetStatus({
                    successful: false,
                    message: error.message
                  })
                );
                dispatch(uiSetLoading("auth", false));
                dispatch(uiStopLoading());
              });
          } else {
            return firebase
              .auth()
              .signInWithEmailAndPassword(authData.email, authData.password)
              .then(res => {
                firebase
                  .database()
                  .ref("users")
                  .orderByChild("email")
                  .equalTo(authData.email)
                  .once("value")
                  .then(res => {
                    let parseRes = res.toJSON();
                    let isAdmin = false;
                    for (let key in parseRes) {
                      if (parseRes[key].role === "admin") {
                        isAdmin = true;
                      }
                    }
                    if (isAdmin) {
                      dispatch(
                        setReducer(actionTypes.SET_CURRENT_ADMIN, authData)
                      );
                      dispatch(setReducer(actionTypes.ADMIN_USER_LOGGED, true));
                      dispatch(uiStopLoading());
                    } else {
                      console.log("Not an Admin user");
                      firebase
                        .auth()
                        .signOut()
                        .then(function() {
                          // Sign-out successful.
                          dispatch(
                            uiSetStatus({
                              successful: false,
                              message: "User is not an Admin"
                            })
                          );
                          dispatch(uiStopLoading());
                        })
                        .catch(function(error) {
                          // An error happened.
                          console.log("error");
                          dispatch(uiStopLoading());
                          dispatch(
                            uiSetStatus({
                              successful: false,
                              message: "Something went wrong"
                            })
                          );
                        });
                    }
                  });
              })
              .catch(function(error) {
                dispatch(
                  uiSetStatus({
                    successful: false,
                    message: error.message
                  })
                );
                dispatch(uiStopLoading());
                // console.log(error);
              });
          }
        })
        .catch(function(error) {
          dispatch(
            uiSetStatus({
              successful: false,
              message: error.message
            })
          );
          dispatch(uiStopLoading());
          // console.log(error);
        });
    } else if (authData.mode === "signUp") {
      if (authData.authMode === "user") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(authData.email, authData.password)
          .then(userNew => {
            console.log(userNew);
            // send password verify email
            dispatch(sendPasswordVerificationEmail(userNew));

            // Add User to DB
            firebase
              .database()
              .ref("users")
              .push({
                email: userNew.user.email,
                role: "user",
                name: userNew.user.displayName
                  ? userNew.user.displayName
                  : userNew.user.email,
                verified: false
              })
              .then(res => {
                console.log(res);

                // Logout from signUp User
                firebase.auth().signOut();
              })
              .catch(error => {
                console.log(error.message);
              });
          })
          .catch(function(error) {
            console.log(error.message);
            dispatch(
              uiSetStatus({
                successful: false,
                message: error.message
              })
            );
            dispatch(uiSetLoading("auth", false));
            dispatch(uiStopLoading());

            setTimeout(() => {
              dispatch(uiSetStatus(false));
            }, 3000);
          });
      } else {
        // ==== admin
      }
    } else if (authData.mode === "resetPW") {
      firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(res => {
          firebase
            .auth()
            .currentUser.updatePassword(authData.passwordNew)
            .then(() => {
              dispatch(uiStopLoading());
              dispatch(
                uiSetStatus({
                  successful: true,
                  message: "Password Changed"
                })
              );
              setTimeout(() => {
                dispatch(uiSetStatus(false));
              }, 2000);
            })
            .catch(function(error) {
              dispatch(uiStopLoading());
              dispatch(
                uiSetStatus({
                  successful: false,
                  message: "Failed :" + error.message
                })
              );
            });
        })
        .catch(function(error) {
          dispatch(uiStopLoading());
          dispatch(
            uiSetStatus({
              successful: false,
              message: "Failed :" + error.message
            })
          );
        });
    } else if (authData.mode === "pwEmail") {
      firebase
        .auth()
        .sendPasswordResetEmail(authData.email)
        .then(res => {
          dispatch(uiStopLoading());
          dispatch(
            uiSetStatus({
              successful: true,
              message: "Password Email Sent"
            })
          );
          setTimeout(() => {
            dispatch(uiSetStatus(false));
          }, 1500);
        })
        .catch(function(error) {
          dispatch(uiStopLoading());
          dispatch(
            uiSetStatus({
              successful: false,
              message: "Failed :" + error.message
            })
          );
          setTimeout(() => {
            dispatch(uiSetStatus(false));
          }, 3000);
        });
    } else if (authData.mode === "facebook" || authData.mode === "gmail") {
      let provider = null;
      if (authData.mode === "facebook") {
        provider = new firebase.auth.FacebookAuthProvider();
      } else if (authData.mode === "gmail") {
        provider = new firebase.auth.GoogleAuthProvider();
      }

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var user = result.user;
          // console.log(result);
          // console.log(user);
          //  ==== ADD USER TO FIREBASE DB ====
          firebase
            .database()
            .ref("users")
            .orderByChild("email")
            .equalTo(user.email)
            .on("value", function(snapshot) {
              let parseRes = snapshot.toJSON();
              // console.log(parseRes);
              if (parseRes === null) {
                firebase
                  .database()
                  .ref("users")
                  .push({
                    email: user.email,
                    role: "user",
                    name: user.displayName
                  })
                  .then(res => {
                    console.log(res);
                    dispatch(
                      setModalTrigger({
                        modal: "login",
                        trigger: false
                      })
                    );
                    dispatch(
                      setModalTrigger({
                        modal: "signUp",
                        trigger: false
                      })
                    );
                    dispatch(setCurrentUserData({ email: user.email }));
                  });
              } else {
                dispatch(
                  setModalTrigger({
                    modal: "login",
                    trigger: false
                  })
                );
                dispatch(
                  setModalTrigger({
                    modal: "signUp",
                    trigger: false
                  })
                );
                dispatch(setCurrentUserData({ email: user.email }));
              }
            });
        })
        .catch(function(error) {
          dispatch(
            uiSetStatus({
              successful: false,
              message: error.message
            })
          );
          dispatch(uiSetLoading("auth", false));
          dispatch(uiStopLoading());

          console.log(error);
        });
    }
  };
};

// Sign Out
export const signOutFirebase = (history, currentPath) => {
  return dispatch => {
    dispatch(uiStartLoading());
    firebase
      .auth()
      .signOut()
      .then(function() {
        window.location.reload(); // Refresh Page

        dispatch(uiStopLoading());
        // Sign-out successful.
        // Admin
        dispatch(setReducer(actionTypes.SET_CURRENT_ADMIN, null));
        dispatch(setReducer(actionTypes.ADMIN_USER_LOGGED, false));
        // user
        dispatch(setReducer(actionTypes.SET_CURRENT_USER, null));
        dispatch(setReducer(actionTypes.USER_LOGGED, false));

        dispatch(uiSetLoading("auth", true));
        // history.push(currentPath);
      })
      .catch(function(error) {
        // An error happened.
        console.log("error" + error);
        dispatch(uiStopLoading());
        dispatch(
          uiSetStatus({
            successful: false,
            message: "Something went wrong" + error
          })
        );
      });
  };
};

export const authCheckState = postData => {
  // console.log(postData);
  return dispatch => {
    dispatch(uiSetLoading("auth", true));
    if (postData.authMode === "user") {
      /*
       * USER ===== ****
       */
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dispatch(setCurrentUserData(user));
          // console.log(user);
          // dispatch(setReducer(actionTypes.SET_CURRENT_USER, user));
          dispatch(setReducer(actionTypes.USER_LOGGED, true));
        } else {
          dispatch(setReducer(actionTypes.SET_CURRENT_USER, null));
          dispatch(setReducer(actionTypes.USER_LOGGED, false));
          dispatch(uiSetLoading("auth", false));
        }
      });
    } else {
      /*
       * ADMIN ===== ****
       */
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase
            .database()
            .ref("users")
            .orderByChild("email")
            .equalTo(user.email)
            .once("value")
            .then(res => {
              // console.log(res.toJSON());

              let parseRes = res.toJSON();
              let isAdmin = false;
              for (let key in parseRes) {
                if (parseRes[key].role === "admin") {
                  isAdmin = true;
                }
              }
              if (isAdmin) {
                dispatch(setReducer(actionTypes.SET_CURRENT_ADMIN, user));
                dispatch(setReducer(actionTypes.ADMIN_USER_LOGGED, true));
                dispatch(uiSetLoading("auth", false));
              } else {
                console.log("Not an Admin user");
                firebase
                  .auth()
                  .signOut()
                  .then(function() {
                    // Sign-out successful.
                    dispatch(setReducer(actionTypes.SET_CURRENT_ADMIN, null));
                    dispatch(setReducer(actionTypes.ADMIN_USER_LOGGED, false));
                    dispatch(uiSetLoading("auth", false));
                  })
                  .catch(function(error) {
                    // An error happened.
                    console.log(error);
                    console.log("error");
                  });
              }
            });
        } else {
          console.log("No login user found");
          dispatch(setReducer(actionTypes.SET_CURRENT_ADMIN, null));
          dispatch(setReducer(actionTypes.ADMIN_USER_LOGGED, false));
          dispatch(uiSetLoading("auth", false));
          // No user is signed in.
        }
      });
    }
  };
};

export const setCurrentUserData = user => {
  return dispatch => {
    console.log(user);
    firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(user.email)
      .on("value", function(snapshot) {
        let parseRes = snapshot.toJSON();
        console.log(parseRes);
        for (let key in parseRes) {
          let userData = { ...parseRes[key], id: key };
          dispatch(setReducer(actionTypes.SET_CURRENT_USER, userData));
          dispatch(uiSetLoading("auth", false));
        }
      });
  };
};

export const sendPasswordVerificationEmail = userNew => {
  return dispatch => {
    userNew.user
      .sendEmailVerification()
      .then(function() {
        // Email sent.

        dispatch(
          uiSetStatus({
            successful: true,
            message: "Password Verification Email Sent"
          })
        );
        dispatch(uiStopLoading());
        dispatch(uiSetLoading("auth", false));

        setTimeout(() => {
          dispatch(
            setModalTrigger({
              modal: "signUp",
              trigger: false
            })
          );
          dispatch(uiSetStatus(false));
        }, 2000);
      })
      .catch(function(error) {
        dispatch(
          uiSetStatus({
            successful: false,
            message: error.message
          })
        );
        dispatch(uiSetLoading("auth", false));
        dispatch(uiStopLoading());

        console.log(error);
      });
  };
};

export const setReducer = (type, dataArray) => {
  return { type, dataArray };
};
