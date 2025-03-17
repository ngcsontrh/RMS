import api from "./api";
import type { DonViData, PageData, ExecuteData } from "../models/data";
import type { DonViSearch } from "../models/search";

const endpoint = "/api/don-vi";

export const getDonVis = async (search: DonViSearch): Promise<PageData<DonViData>> => {
    const response = await api.get<ExecuteData<PageData<DonViData>>>(endpoint, { params: search });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
};

export const getDonVi = async (id: number): Promise<DonViData> => {
    const response = await api.get<ExecuteData<DonViData>>(`${endpoint}/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const createDonVi = async (data: DonViData): Promise<void> => {
    const response = await api.post<ExecuteData>(endpoint, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const editDonVi = async (id: number, data: DonViData): Promise<void> => {
    const response = await api.put<ExecuteData>(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}