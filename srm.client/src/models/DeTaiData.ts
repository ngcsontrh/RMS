import { ModelBase } from './ModelBase';
import dayjs from 'dayjs';

export interface DeTaiData extends ModelBase {
  capDeTaiId?: string;
  tenCapDeTai?: string;
  ten?: string;
  maSo?: string;
  mucTieu?: string;
  noiDung?: string;
  tongKinhPhi?: number;
  ngayBatDau?: dayjs.Dayjs;
  ngayKetThuc?: dayjs.Dayjs;
  kinhPhiHangNam?: number;
  hoSoNghiemThu?: string;
  hoSoSanPham?: string;
  donViChuTriId?: string;
  tenDonViChuTri?: string;
  chuNhiem?: string;
  canBoThamGias?: string[];
  phanChiaSuDongGop?: string;
}