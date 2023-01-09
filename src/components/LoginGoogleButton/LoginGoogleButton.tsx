import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

export function LoginGoogleButton() {
	return (
		<GoogleLogin
			onSuccess={(credentialResponse) => {
				console.log(jwtDecode(credentialResponse.credential as string));
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
