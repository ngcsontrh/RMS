import { AxiosError } from "axios";
import api from "./api";
import type { ExecuteData, LoaiHoatDongData, PageData } from "../models/data";
import type { LoaiHoatDongSearch } from "../models/search";

const endpoint = "/api/loai-hoat-dong";

// 📌 Lấy danh sách loại hoạt động có phân trang & tìm kiếm
export const getLoaiHoatDongs = async (search: LoaiHoatDongSearch): Promise<PageData<LoaiHoatDongData>> => {
    const response = await api.get<ExecuteData<PageData<LoaiHoatDongData>>>(endpoint, { params: search });
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

// 📌 Lấy một loại hoạt động theo ID
export const getLoaiHoatDong = async (id: number): Promise<LoaiHoatDongData> => {
    const response = await api.get<ExecuteData<LoaiHoatDongData>>(`${endpoint}/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
    return response.data.data!;
}

// 📌 Tạo mới một loại hoạt động
export const createLoaiHoatDong = async (data: LoaiHoatDongData): Promise<void> => {
    const response = await api.post<ExecuteData>(endpoint, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

// 📌 Chỉnh sửa một loại hoạt động
export const editLoaiHoatDong = async (id: number, data: LoaiHoatDongData): Promise<void> => {
    const response = await api.put(`${endpoint}/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}

// 📌 Xóa một loại hoạt động
export const deleteLoaiHoatDong = async (id: number): Promise<void> => {
    const response = await api.delete<ExecuteData>(`${endpoint}/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message!);
    }
}
