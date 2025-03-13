import { AxiosError } from "axios";
import api from "./api";
import type { NoiDangBaoData, PageData } from "../models/data";
import type { NoiDangBaoSearch } from "../models/search";

const endpoint = "/api/noi-dang-bao";

export const getNoiDangBaos = async (search: NoiDangBaoSearch): Promise<PageData<NoiDangBaoData>> => {
    try {
        const response = await api.get<PageData<NoiDangBaoData>>(endpoint, { params: search });
        return response.data;
    } catch (e) {
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const getNoiDangBao = async (id: number): Promise<NoiDangBaoData> => {
    try {
        const response = await api.get<NoiDangBaoData>(`${endpoint}/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error(`Không tìm thấy dữ liệu`);
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const createNoiDangBao = async (data: NoiDangBaoData): Promise<void> => {
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

export const editNoiDangBao = async (id: number, data: NoiDangBaoData): Promise<void> => {
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
