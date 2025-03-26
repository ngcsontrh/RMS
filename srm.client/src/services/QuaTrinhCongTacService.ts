import api from "./api";
import type { QuaTrinhCongTacData, ExecuteData } from "../models/data";

const endpoint = "/api/qua-trinh-cong-tac";

export const getQuaTrinhCongTac = async (userId: number): Promise<QuaTrinhCongTacData> => {
    const response = await api.get<ExecuteData<QuaTrinhCongTacData>>(`${endpoint}/info`, { params: { userId } });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const createQuaTrinhCongTac = async (data: QuaTrinhCongTacData): Promise<void> => {
    const response = await api.post<ExecuteData>(`${endpoint}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

export const editQuaTrinhCongTac = async (id: number, data: QuaTrinhCongTacData): Promise<void> => {
    const response = await api.put<ExecuteData>(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}