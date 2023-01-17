import axios from "../utils/axios";
import { API_URL, IUser } from "../utils/utils";

export async function GetUserDataFromAccessToken(): Promise<IUser | undefined> {
	try {
		return (await axios.get<IUser>(`/auth`)).data;
	} catch (err) {
		console.log(err);
	}
}

export async function UpdateUserData(
	id: string,
	familyName: string,
	givenName: string,
	picture: string
) {
	try {
		await axios.patch(`${API_URL}/user/${id}`, {
			familyName,
			givenName,
			picture
		});
	} catch (err) {
		console.log(err);
	}
}
