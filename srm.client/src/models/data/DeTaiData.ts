import { TacGiaJson } from '../json/TacGiaJson';

export interface DeTaiData {
    id?: number | null;
    capDeTaiId?: number | null;
    tenCapDeTai?: string | null;
    ten?: string | null;
    maSo?: string | null;
    mucTieu?: string | null;
    noiDung?: string | null;
    tongKinhPhi?: number | null;
    ngayBatDau?: Date | null;
    ngayKetThuc?: Date | null;
    kinhPhiHangNam?: number | null;
    hoSoNghiemThu?: string | null;
    hoSoSanPham?: string | null;
    donViChuTriId?: number | null;
    tenDonViChuTri?: string | null;
    chuNhiem?: TacGiaJson | null;
    canBoThamGias?: TacGiaJson[] | null;
    phanChiaSuDongGop?: string | null;
}