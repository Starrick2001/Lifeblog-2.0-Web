import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { API_URL } from "./utils";

const getAccessToken = () => {
	return localStorage.getItem("accessToken");
};

let axiosInstance = axios.create({
	baseURL: API_URL
});
// // request interceptor
axiosInstance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// Do something before request is sent
		if (getAccessToken())
			(config.headers as AxiosHeaders).set(
				"Authorization",
				`Bearer ${getAccessToken()}`
			);
		else (config.headers as AxiosHeaders).set("Authorization", null);
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export default axiosInstance;
