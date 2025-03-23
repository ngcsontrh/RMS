import api from "./api";
import type { CapDeTaiData, PageData, ExecuteData } from "../models/data";
import type { CapDeTaiSearch } from "../models/search";

const endpoint = "/api/cap-de-tai";

export const getCapDeTais = async (search: CapDeTaiSearch): Promise<PageData<CapDeTaiData>> => {
    const response = await api.get<ExecuteData<PageData<CapDeTaiData>>>(endpoint, { params: search });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
};

export const getCapDeTaiDropdown = async (): Promise<CapDeTaiData[]> => {
    const response = await api.get<ExecuteData<CapDeTaiData[]>>(`${endpoint}/dropdown`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const getCapDeTai = async (id: number): Promise<CapDeTaiData> => {
    const response = await api.get<ExecuteData<CapDeTaiData>>(`${endpoint}/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const createCapDeTai = async (data: CapDeTaiData): Promise<void> => {
    const response = await api.post<ExecuteData>(endpoint, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const editCapDeTai = async (id: number, data: CapDeTaiData): Promise<void> => {
    const response = await api.put<ExecuteData>(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}