import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../utils/utils";

type UserDataState = {
	userData?: IUser;
};

let initialState: UserDataState = {};

if (localStorage.getItem("userData")) {
	const userData: IUser = JSON.parse(
		localStorage.getItem("userData") as string
	);
	initialState.userData = userData;
}

const userDataSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		setUserData(state, action: PayloadAction<IUser | undefined>) {
			if (action.payload) {
				const { id, email, name, familyName, givenName, picture } =
					action.payload;

				state.userData = {
					id,
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
