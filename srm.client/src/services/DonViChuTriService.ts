import { AxiosError } from "axios";
import api from "./api";
import type { DonViChuTriData, PageData } from "../models/data";
import type { DonViChuTriSearch } from "../models/search";

const endpoint = "/api/don-vi-chu-tri";

export const getDonViChuTris = async (search: DonViChuTriSearch): Promise<PageData<DonViChuTriData>> => {
    try {
        const response = await api.get<PageData<DonViChuTriData>>(endpoint, { params: search });
        return response.data;
    } catch (e) {
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const getDonViChuTri = async (id: number): Promise<DonViChuTriData> => {
    try {
        const response = await api.get<DonViChuTriData>(`${endpoint}/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error(`Không tìm thấy dữ liệu`);
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

export const createDonViChuTri = async (data: DonViChuTriData): Promise<void> => {
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

export const editDonViChuTri = async (id: number, data: DonViChuTriData): Promise<void> => {
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

export const deleteDonViChuTri = async (id: number): Promise<void> => {
    try {
        await api.delete(`${endpoint}/${id}`);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 400) {
            const errors: string[] = e.response?.data || [];
            throw new Error(errors.join("\n"));
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}