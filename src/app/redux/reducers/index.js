import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

import auth from "./auth";
import redirect from "./redirect";

export default combineReducers({
  auth,
  redirect,
  loadingBar: loadingBarReducer,
});
