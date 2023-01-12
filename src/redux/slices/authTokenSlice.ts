import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthTokenState = {
	accessToken?: string;
};

let initialState: AuthTokenState = {};

if (localStorage.getItem("accessToken"))
	initialState.accessToken = localStorage.getItem("accessToken") as string;

const authTokenSlice = createSlice({
	name: "authToken",
	initialState,
	reducers: {
		setAuthToken(state, action: PayloadAction<string | undefined>) {
			const accessToken = action.payload;

			state.accessToken = accessToken;
			if (accessToken) localStorage.setItem("accessToken", accessToken);
			else localStorage.removeItem("accessToken");
		}
	}
});

export const { setAuthToken } = authTokenSlice.actions;

export default authTokenSlice.reducer;
