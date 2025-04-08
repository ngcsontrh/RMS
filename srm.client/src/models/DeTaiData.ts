import { ModelBase } from './ModelBase';

export interface DeTaiData extends ModelBase {
  capDeTaiId?: string;
  tenCapDeTai?: string;
  ten?: string;
  maSo?: string;
  mucTieu?: string;
  noiDung?: string;
  tongKinhPhi?: number;
  ngayBatDau?: Date;
  ngayKetThuc?: Date;
  kinhPhiHangNam?: number;
  hoSoNghiemThu?: string;
  hoSoSanPham?: string;
  donViChuTriId?: string;
  tenDonViChuTri?: string;
  chuNhiem?: string;
  canBoThamGias?: string[];
  phanChiaSuDongGop?: string;
}