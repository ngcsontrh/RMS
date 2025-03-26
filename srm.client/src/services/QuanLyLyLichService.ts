import api from "./api";
import type { LyLichKhoaHocData, ExecuteData } from "../models/data";

const endpoint = "/api/ly-lich-khoa-hoc";

export const getLyLichKhoaHoc = async (userId: number): Promise<LyLichKhoaHocData> => {
    const response = await api.get<ExecuteData<LyLichKhoaHocData>>(`${endpoint}/info`, { params: { userId } });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

export const editLyLichKhoaHoc = async (id: number, data: LyLichKhoaHocData): Promise<void> => {
    const response = await api.put<ExecuteData>(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}
