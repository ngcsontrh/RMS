import { ModelBase } from './ModelBase';

export interface CongBoData extends ModelBase {
  noiDangBaoId?: string;
  tenNoiDangBao?: string;
  linkMinhChungTapChi?: string;
  ten?: string;
  diaDiem?: string;
  tenTapChi?: string;
  nhaXuatBan?: string;
  fileMinhChungBaiBao?: string;
  linkBaiBao?: string;
  ngayGuiDang?: Date;
  ngayCongBo?: Date;
  chiSoTacDong?: number;
  ky?: number;
  tap?: number;
  trang?: string;
  diemHoiDong?: number;
  tenHoiDong?: string;
  loaiQ?: string;
  thanhQuaId?: string;
  linkMinhChungLoaiQ?: string;
  tacGiaChinh?: string;
  tacGiaLienHe?: string;
  dongTacGias?: string;
  loaiHoTroChiPhi?: string;
  phanChiaSuDongGop?: string;
}