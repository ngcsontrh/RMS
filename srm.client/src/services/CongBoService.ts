import { AxiosError } from "axios";
import api from "./api";
import type { CongBoData, PageData } from "../models/data";
import type { CongBoSearch } from "../models/search";

const endpoint = "/api/cong-bo";

export const getCongBos = async (search: CongBoSearch): Promise<PageData<CongBoData>> => {
    try {
        const response = await api.get<PageData<CongBoData>>(endpoint, { params: search });
        return response.data;
    } catch (e) {
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const getCongBo = async (id: number): Promise<CongBoData> => {
    try {
        const response = await api.get<CongBoData>(`${endpoint}/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error(`Không tìm thấy dữ liệu`);
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const createCongBo = async (data: CongBoData): Promise<void> => {
    try {
        await api.post(endpoint, data);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 400) {
            const errors: string[] = e.response?.data || [];
            throw new Error(errors.join("\n"));
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const editCongBo = async (id: number, data: CongBoData): Promise<void> => {
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