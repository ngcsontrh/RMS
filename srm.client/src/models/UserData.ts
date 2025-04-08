import { ModelBase } from './ModelBase';
import dayjs from 'dayjs';

export interface UserData extends ModelBase {
  username?: string;
  email?: string;
  soDienThoai?: string;
  hoTen?: string;
  maVienChuc?: string;
  gioiTinh?: string;
  donViId?: string;
  tenDonVi?: string;
  ngaySinh?: dayjs.Dayjs;
  danToc?: string;
  chucDanh?: string;
  chuyenNganh?: string;
  hocVi?: string;
  truongDH?: string;
  role?: string;
}