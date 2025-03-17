import { AxiosError } from "axios";
import api from "./api";
import type { TacGiaData, PageData, ExecuteData } from "../models/data";
import type { TacGiaSearch } from "../models/search";

const endpoint = "/api/tac-gia";

export const getTacGias = async (search: TacGiaSearch): Promise<PageData<TacGiaData>> => {
    const response = await api.get<ExecuteData<PageData<TacGiaData>>>(endpoint, { params: search });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const getTacGiaDropDownData = async (): Promise<TacGiaData[]> => {
    const response = await api.get<ExecuteData<TacGiaData[]>>(`${endpoint}/dropdown-data`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const getTacGia = async (id: number): Promise<TacGiaData> => {
    const response = await api.get<ExecuteData<TacGiaData>>(`${endpoint}/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const createTacGia = async (data: TacGiaData): Promise<void> => {
    const response = await api.post<ExecuteData>(endpoint, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const editTacGia = async (id: number, data: TacGiaData): Promise<void> => {
    const response = await api.put<ExecuteData>(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}