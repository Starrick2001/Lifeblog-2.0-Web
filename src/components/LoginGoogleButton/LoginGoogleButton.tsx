import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL } from "../../utils/utils";

type LoginSuccessRequest = {
	email: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
};

export function LoginGoogleButton() {
	const loginSuccessHandler = (credentialResponse: CredentialResponse) => {
		const reqBody: LoginSuccessRequest = jwtDecode(
			credentialResponse.credential as string
		);

		axios
			.post(API_URL + "/auth", {
				email: reqBody.email,
				name: reqBody.name,
				givenName: reqBody.given_name,
				familyName: reqBody.family_name,
				picture: reqBody.picture
			})
			.then((result) => {
				console.log(result);
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
			auto_select
		/>
	);
}
