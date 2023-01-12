import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetUserDataFromAccessToken } from "../../services/user.service";
import { IUserData } from "../../utils/utils";

type UserDataState = {
	userData?: IUserData;
};

let initialState: UserDataState = {};

if (localStorage.getItem("accessToken")) {
	const accessToken = localStorage.getItem("accessToken") as string;
	const userData: any = GetUserDataFromAccessToken(accessToken);
	initialState.userData = {
		email: userData.email,
		familyName: userData.familyName,
		givenName: userData.givenName,
		name: userData.name,
		picture: userData.picture
	};
}

const userDataSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		setUserData(state, action: PayloadAction<IUserData | undefined>) {
			if (action.payload) {
				const { email, name, familyName, givenName, picture } = action.payload;

				state.userData = {
					email,
					name,
					familyName,
					givenName,
					picture
				};
				localStorage.setItem("userData", JSON.stringify(state.userData));
			} else {
				state.userData = undefined;
				localStorage.removeItem("userData");
			}
		}
	}
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
