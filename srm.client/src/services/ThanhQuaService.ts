import api from "./api";
import type { ThanhQuaData, PageData, ExecuteData } from "../models/data";
import type { ThanhQuaSearch } from "../models/search";

const endpoint = "/api/thanh-qua";

export const getThanhQuas = async (search: ThanhQuaSearch): Promise<PageData<ThanhQuaData>> => {
    const response = await api.get<ExecuteData<PageData<ThanhQuaData>>>(endpoint, { params: search });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const getThanhQua = async (id: number): Promise<ThanhQuaData> => {
    const response = await api.get<ExecuteData<ThanhQuaData>>(`${endpoint}/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const createThanhQua = async (data: ThanhQuaData): Promise<void> => {
    const response = await api.post<ExecuteData>(endpoint, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const editThanhQua = async (id: number, data: ThanhQuaData): Promise<void> => {
    const response = await api.put<ExecuteData>(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const getThanhQuaDropDownData = async (): Promise<ThanhQuaData[]> => {
    const response = await api.get<ExecuteData<ThanhQuaData[]>>(`${endpoint}/dropdown`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}