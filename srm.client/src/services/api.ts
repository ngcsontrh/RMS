import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

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
        (error: AxiosError) => {
            if (error.response) {
                console.error("API Error:", error.response.data);
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/dang-nhap");
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