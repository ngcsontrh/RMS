import { AxiosError } from "axios";
import api from "./api";
import type { CapDeTaiData, PageData } from "../models/data";
import type { CapDeTaiSearch } from "../models/search";

const endpoint = "/api/cap-de-tai";

export const getCapDeTais = async (search: CapDeTaiSearch): Promise<PageData<CapDeTaiData>> => {
    try {
        const response = await api.get<PageData<CapDeTaiData>>(endpoint, { params: search });
        return response.data;
    } catch (e) {
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const getCapDeTai = async (id: number): Promise<CapDeTaiData> => {
    try {
        const response = await api.get<CapDeTaiData>(`${endpoint}/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error(`Không tìm thấy dữ liệu`);
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const createCapDeTai = async (data: CapDeTaiData): Promise<void> => {
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

export const editCapDeTai = async (id: number, data: CapDeTaiData): Promise<void> => {
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