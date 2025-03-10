import { AxiosError } from "axios";
import api from "./api";
import type { DeTaiData, PageData } from "../models/data";
import type { DeTaiSearch } from "../models/search";

const endpoint = "/api/de-tai";

export const getDeTais = async (search: DeTaiSearch): Promise<PageData<DeTaiData>> => {
    try {
        const response = await api.get<PageData<DeTaiData>>(endpoint, { params: search });
        return response.data;
    } catch (e) {
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const getDetai = async (id: number): Promise<DeTaiData> => {
    try {
        const response = await api.get<DeTaiData>(`${endpoint}/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error(`Không tìm thấy dữ liệu`);
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const createDeTai = async (data: DeTaiData): Promise<void> => {
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

export const editDeTai = async (id: number, data: DeTaiData): Promise<void> => {
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