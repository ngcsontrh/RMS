import ModelBase from './ModelBase';

/**
 * @typedef {Object} UserData
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 * @property {string} [username] - Username
 * @property {string} [email] - Email address
 * @property {string} [soDienThoai] - Phone number
 * @property {string} [hoTen] - Full name
 * @property {string} [maVienChuc] - Officer code
 * @property {string} [gioiTinh] - Gender
 * @property {string} [donViId] - Organization unit ID
 * @property {string} [tenDonVi] - Organization unit name
 * @property {string} [ngaySinh] - Birth date
 * @property {string} [danToc] - Ethnicity
 * @property {string} [chucDanh] - Title/Position
 * @property {string} [chuyenNganh] - Specialization
 * @property {string} [hocVi] - Academic degree
 * @property {string} [truongDH] - University
 * @property {string} [role] - User role
 */

/**
 * User data model
 */
const UserData = {
  ...ModelBase,
  username: null,
  email: null,
  soDienThoai: null,
  hoTen: null,
  maVienChuc: null,
  gioiTinh: null,
  donViId: null,
  tenDonVi: null,
  ngaySinh: null,
  danToc: null,
  chucDanh: null,
  chuyenNganh: null,
  hocVi: null,
  truongDH: null,
  role: null
};

export default UserData;