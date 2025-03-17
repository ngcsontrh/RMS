import api from "./api";
import type { DeTaiData, ExecuteData, PageData } from "../models/data";
import type { DeTaiSearch } from "../models/search";

const endpoint = "/api/de-tai";

export const getDeTais = async (search: DeTaiSearch): Promise<PageData<DeTaiData>> => {
    const response = await api.get<ExecuteData<PageData<DeTaiData>>>(endpoint, { params: search });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const getDetai = async (id: number): Promise<DeTaiData> => {
    const response = await api.get<ExecuteData<DeTaiData>>(`${endpoint}/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const createDeTai = async (data: DeTaiData): Promise<void> => {
    const response = await api.post<ExecuteData>(endpoint, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const editDeTai = async (id: number, data: DeTaiData): Promise<void> => {
    console.log(data);
    const response = await api.put<ExecuteData>(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}