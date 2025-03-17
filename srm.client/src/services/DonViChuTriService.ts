import api from "./api";
import type { DonViChuTriData, ExecuteData, PageData } from "../models/data";
import type { DonViChuTriSearch } from "../models/search";

const endpoint = "/api/don-vi-chu-tri";

export const getDonViChuTris = async (search: DonViChuTriSearch): Promise<PageData<DonViChuTriData>> => {
    const response = await api.get<ExecuteData<PageData<DonViChuTriData>>>(endpoint, { params: search });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const getDonViChuTri = async (id: number): Promise<DonViChuTriData> => {
    const response = await api.get<ExecuteData<DonViChuTriData>>(`${endpoint}/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const createDonViChuTri = async (data: DonViChuTriData): Promise<void> => {
    const response = await api.post<ExecuteData>(endpoint, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const editDonViChuTri = async (id: number, data: DonViChuTriData): Promise<void> => {
    const response = await api.put(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}