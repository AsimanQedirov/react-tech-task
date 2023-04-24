import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import api_url from "./config/api";

export const axiosInstance = axios.create({
    baseURL: api_url
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        config.headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//interceptor error handling for API calls
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {

        return Promise.reject(error);
    }
);
