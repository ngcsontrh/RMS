import type { TacGiaJson } from '../json';

export interface HoatDongData {
    id?: number | null;
    loaiHoatDongId?: number | null;
    tenLoaiHoatDong?: string | null;
    ten?: string | null;
    noiDung?: string | null;
    ghiChu?: string | null;
    diaChi?: string | null;
    kinhPhi?: number | null;
    soTrang?: number | null;
    soTiet?: number | null;
    fileDinhKem?: string | null;
    ngayBatDau?: Date | null;
    ngayKetThuc?: Date | null;
    duongDan?: string | null;
    chuNhiem?: TacGiaJson | null;
    thanhVienThamGias?: TacGiaJson[] | null;
    phanChiaSuDongGop?: string | null;
}