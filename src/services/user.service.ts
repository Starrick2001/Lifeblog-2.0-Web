import jwtDecode from "jwt-decode";

export function GetUserDataFromAccessToken(accessToken: string) {
  return jwtDecode(accessToken)
}