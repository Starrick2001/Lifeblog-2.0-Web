import { combineReducers } from "@reduxjs/toolkit";
import authTokenReducer from "./slices/authTokenSlice";
import userDataReducer from "./slices/userDataSlice";

const rootReducer = combineReducers({
	authToken: authTokenReducer,
	userData: userDataReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
