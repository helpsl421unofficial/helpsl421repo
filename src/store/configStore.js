import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import firebaseDatabaseReducer from "../store/reducers/firebaseDatabaseReducer";
import uiReducer from "../store/reducers/uiReducer";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  firebaseDatabase: firebaseDatabaseReducer,
  ui: uiReducer
});

const configStore = () => {
  // return createStore(rootReducer, compose(applyMiddleware(thunk)));
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configStore;
