import { AxiosError } from "axios";
import api from "./api";
import type { TacGiaData, PageData } from "../models/data";
import type { TacGiaSearch } from "../models/search";

const endpoint = "/api/tac-gia";

export const getTacGias = async (search: TacGiaSearch): Promise<PageData<TacGiaData>> => {
    try {
        const response = await api.get<PageData<TacGiaData>>(endpoint, { params: search });
        return response.data;
    } catch (e) {
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const getTacGiaDropDownData = async (): Promise<TacGiaData[]> => {
    try {
        const response = await api.get<TacGiaData[]>(`${endpoint}/dropdown-data`);
        return response.data;
    } catch (e) {
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const getTacGia = async (id: number): Promise<TacGiaData> => {
    try {
        const response = await api.get<TacGiaData>(`${endpoint}/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error(`Không tìm thấy dữ liệu`);
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const createTacGia = async (data: TacGiaData): Promise<void> => {
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

export const editTacGia = async (id: number, data: TacGiaData): Promise<void> => {
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