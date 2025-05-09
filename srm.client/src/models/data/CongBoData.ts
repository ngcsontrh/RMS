import type { TacGiaJson } from '../json';

export interface CongBoData {
    id?: number | null;
    noiDangBaoId?: number | null;
    tenNoiDangBao?: string | null;
    linkMinhChungTapChi?: string | null;
    ten?: string | null;
    diaDiem?: string | null;
    tenTapChi?: string | null;
    nhaXuatBan?: string | null;
    fileMinhChungBaiBao?: string | null;
    linkBaiBao?: string | null;
    ngayGuiDang?: Date | null;
    ngayCongBo?: Date | null;
    chiSoTacDong?: number | null;
    ky?: number | null;
    tap?: number | null;
    trang?: string | null;
    diemHoiDong?: number | null;
    tenHoiDong?: string | null;
    loaiQ?: string | null;
    thanhQuaId?: number | null;
    tenThanhQua?: string | null;
    linkMinhChungLoaiQ?: string | null;
    tacGiaChinh?: TacGiaJson | null;
    tacGiaLienHe?: TacGiaJson | null;
    dongTacGias?: TacGiaJson[] | null;
    loaiHoTroChiPhi?: string | null;
    phanChiaSuDongGop?: string | null;
}