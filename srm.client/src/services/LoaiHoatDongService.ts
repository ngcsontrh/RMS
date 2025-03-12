import { AxiosError } from "axios";
import api from "./api";
import type { LoaiHoatDongData, PageData } from "../models/data";
import type { LoaiHoatDongSearch } from "../models/search";

const endpoint = "/api/loai-hoat-dong";

// 📌 Lấy danh sách loại hoạt động có phân trang & tìm kiếm
export const getLoaiHoatDongs = async (search: LoaiHoatDongSearch): Promise<PageData<LoaiHoatDongData>> => {
    try {
        const response = await api.get<PageData<LoaiHoatDongData>>(endpoint, { params: search });
        return response.data;
    } catch (e) {
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

// 📌 Lấy một loại hoạt động theo ID
export const getLoaiHoatDong = async (id: number): Promise<LoaiHoatDongData> => {
    try {
        const response = await api.get<LoaiHoatDongData>(`${endpoint}/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error(`Không tìm thấy dữ liệu`);
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

// 📌 Tạo mới một loại hoạt động
export const createLoaiHoatDong = async (data: LoaiHoatDongData): Promise<void> => {
    try {
        await api.post(endpoint, data);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 400) {
            const errors: string[] = e.response?.data || [];
            throw new Error(errors.join("<br />"));
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

// 📌 Chỉnh sửa một loại hoạt động
export const editLoaiHoatDong = async (id: number, data: LoaiHoatDongData): Promise<void> => {
    try {
        await api.put(`${endpoint}/${id}`, data);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 400) {
            const errors: string[] = e.response?.data || [];
            throw new Error(errors.join("\n"));
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}

// 📌 Xóa một loại hoạt động
export const deleteLoaiHoatDong = async (id: number): Promise<void> => {
    try {
        await api.delete(`${endpoint}/${id}`);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error("Không tìm thấy loại hoạt động để xóa");
        }
        throw new Error("Xảy ra lỗi trong quá trình xử lý");
    }
}
