import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthTokenState = {
	accessToken?: string;
	refreshToken?: string;
};

let initialState: AuthTokenState = {};

const authTokenSlice = createSlice({
	name: "authToken",
	initialState,
	reducers: {
		setAuthToken(state, action: PayloadAction<AuthTokenState>) {
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
		}
	}
});

export const { setAuthToken } = authTokenSlice.actions;

export default authTokenSlice.reducer;
