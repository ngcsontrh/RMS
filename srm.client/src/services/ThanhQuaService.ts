import { AxiosError } from "axios";
import api from "./api";
import type { ThanhQuaData, PageData } from "../models/data";
import type { ThanhQuaSearch } from "../models/search";

const endpoint = "/api/thanh-qua";

export const getThanhQuas = async (search: ThanhQuaSearch): Promise<PageData<ThanhQuaData>> => {
    try {
        const response = await api.get<PageData<ThanhQuaData>>(endpoint, { params: search });
        return response.data;
    } catch (e) {
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const getThanhQua = async (id: number): Promise<ThanhQuaData> => {
    try {
        const response = await api.get<ThanhQuaData>(`${endpoint}/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error(`Không tìm thấy dữ liệu`);
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const createThanhQua = async (data: ThanhQuaData): Promise<void> => {
    try {
        await api.post(endpoint, data);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 400) {
            const errors: string[] = e.response?.data || [];
            throw new Error(errors.join("<br />"));
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const editThanhQua = async (id: number, data: ThanhQuaData): Promise<void> => {
    try {
        await api.put(`${endpoint}/${id}`, data);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 400) {
            const errors: string[] = e.response?.data || [];
            throw new Error(errors.join("\n"));
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}