import api from "./api";
import type { ExecuteData, NoiDangBaoData, PageData } from "../models/data";
import type { NoiDangBaoSearch } from "../models/search";

const endpoint = "/api/noi-dang-bao";

export const getNoiDangBaos = async (search: NoiDangBaoSearch): Promise<PageData<NoiDangBaoData>> => {
    const response = await api.get<ExecuteData<PageData<NoiDangBaoData>>>(endpoint, { params: search });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const getNoiDangBao = async (id: number): Promise<NoiDangBaoData> => {
    const response = await api.get<ExecuteData<NoiDangBaoData>>(`${endpoint}/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const createNoiDangBao = async (data: NoiDangBaoData): Promise<void> => {
    const response = await api.post<ExecuteData>(endpoint, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const editNoiDangBao = async (id: number, data: NoiDangBaoData): Promise<void> => {
    const response = await api.put<ExecuteData>(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const getNoiDangBaoDropDownData = async (): Promise<NoiDangBaoData[]> => {
    const response = await api.get<ExecuteData<NoiDangBaoData[]>>(`${endpoint}/dropdown-data`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}