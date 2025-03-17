import api from "./api";
import type { CongBoData, ExecuteData, PageData } from "../models/data";
import type { CongBoSearch } from "../models/search";

const endpoint = "/api/cong-bo";

export const getCongBos = async (search: CongBoSearch): Promise<PageData<CongBoData>> => {
    const response = await api.get<ExecuteData<PageData<CongBoData>>>(endpoint, { params: search });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const getCongBo = async (id: number): Promise<CongBoData> => {
    const response = await api.get<ExecuteData<CongBoData>>(`${endpoint}/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const createCongBo = async (data: CongBoData): Promise<void> => {
    const response = await api.post<ExecuteData>(endpoint, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const editCongBo = async (id: number, data: CongBoData): Promise<void> => {
    const response = await api.put<ExecuteData>(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}