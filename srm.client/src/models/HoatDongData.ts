import { ModelBase } from './ModelBase';
import { Dayjs } from 'dayjs';

export interface HoatDongData extends ModelBase {
  loaiHoatDongId?: string;
  tenLoaiHoatDong?: string;
  ten?: string;
  noiDung?: string;
  ghiChu?: string;
  diaChi?: string;
  kinhPhi?: number;
  soTrang?: number;
  soTiet?: number;
  fileDinhKem?: string;
  ngayBatDau?: string | Dayjs;
  ngayKetThuc?: string | Dayjs;
  duongDan?: string;
  chuNhiem?: string;
  thanhVienThamGias?: string;
  phanChiaSuDongGop?: string;
}