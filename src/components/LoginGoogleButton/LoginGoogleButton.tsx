import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../redux/slices/authTokenSlice";
import { setUserData } from "../../redux/slices/userDataSlice";
import { GetUserDataFromAccessToken } from "../../services/user.service";
import { API_URL } from "../../utils/utils";

export function LoginGoogleButton() {
	const dispatch = useDispatch();

	const loginSuccessHandler = (credentialResponse: CredentialResponse) => {
		axios
			.post(API_URL + "/auth", {
				credential: credentialResponse.credential
			})
			.then(async (result) => {
				dispatch(setAuthToken(result.data.accessToken));
				dispatch(setUserData(await GetUserDataFromAccessToken()));
			});
	};

	return (
		<GoogleLogin
			onSuccess={(credentialResponse) => {
				loginSuccessHandler(credentialResponse);
			}}
			onError={() => {
				console.log("Login Failed");
			}}
			type="icon"
			shape="circle"
			theme="outline"
			useOneTap
			cancel_on_tap_outside={false}
		/>
	);
}
