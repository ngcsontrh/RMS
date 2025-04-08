import { ModelBase } from './ModelBase';

export interface UserData extends ModelBase {
  username?: string;
  email?: string;
  soDienThoai?: string;
  hoTen?: string;
  maVienChuc?: string;
  gioiTinh?: string;
  donViId?: string;
  tenDonVi?: string;
  ngaySinh?: Date;
  danToc?: string;
  chucDanh?: string;
  chuyenNganh?: string;
  hocVi?: string;
  truongDH?: string;
  role?: string;
}