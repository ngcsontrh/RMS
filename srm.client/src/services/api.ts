import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { ExecuteData, TokenData } from "../models/data";

const api: AxiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

export const configureApiInterceptors = (navigate: (path: string) => void) => {
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error: AxiosError) => {
            if (error.response) {
                console.error("API Error:", error.response.data);

                if (error.response.status === 401) {
                    try {
                        const response = await axios.post<ExecuteData<TokenData>>("/api/user/refresh-token");

                        if (!response.data.success) {
                            throw new Error(response.data.message!);
                        }

                        const newAccessToken = response.data.data?.accessToken;
                        localStorage.setItem("accessToken", newAccessToken!);

                        // Cập nhật lại header cho request tiếp theo
                        if (error.config) {
                            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        }

                        // Thực hiện lại request ban đầu với accessToken mới
                        return axios(error.config!);
                    } catch (refreshError) {
                        console.error("Error refreshing token:", refreshError);
                        localStorage.removeItem("accessToken");
                        navigate("/dang-nhap");
                    }
                } else if (error.response.status === 403) {
                    navigate("/unauthorized");
                }
            } else {
                console.error("Network Error or No Response:", error.message);
            }

            return Promise.reject(error);
        }
    );
};

export default api;