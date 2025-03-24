import api from "./api";
import type { LyLichKhoaHocData, PageData, ExecuteData } from "../models/data";
import type { LyLichKhoaHocSearch } from "../models/search";

const endpoint = "/api/don-vi";

export const getLyLichKhoaHoc = async (id: number): Promise<LyLichKhoaHocData> => {
    const response = await api.get<ExecuteData<LyLichKhoaHocData>>(`${endpoint}/${id}`);
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