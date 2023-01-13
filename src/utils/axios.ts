import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
let axiosInstance = axios.create();
if (accessToken) {
	axiosInstance = axios.create({
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
}

export default axiosInstance;
