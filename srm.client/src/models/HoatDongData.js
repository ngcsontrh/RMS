import ModelBase from './ModelBase';

/**
 * @typedef {Object} HoatDongData
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 * @property {string} [loaiHoatDongId] - Activity type ID
 * @property {string} [tenLoaiHoatDong] - Activity type name
 * @property {string} [ten] - Title
 * @property {string} [noiDung] - Content
 * @property {string} [ghiChu] - Notes
 * @property {string} [diaChi] - Address
 * @property {number} [kinhPhi] - Budget
 * @property {number} [soTrang] - Number of pages
 * @property {number} [soTiet] - Number of periods
 * @property {string} [fileDinhKem] - Attached file
 * @property {string} [ngayBatDau] - Start date
 * @property {string} [ngayKetThuc] - End date
 * @property {string} [duongDan] - Path/URL
 * @property {string} [chuNhiem] - Leader
 * @property {string} [thanhVienThamGias] - Participating members
 * @property {string} [phanChiaSuDongGop] - Contribution distribution
 */

/**
 * Activity data model
 */
const HoatDongData = {
  ...ModelBase,
  loaiHoatDongId: null,
  tenLoaiHoatDong: null,
  ten: null,
  noiDung: null,
  ghiChu: null,
  diaChi: null,
  kinhPhi: null,
  soTrang: null,
  soTiet: null,
  fileDinhKem: null,
  ngayBatDau: null,
  ngayKetThuc: null,
  duongDan: null,
  chuNhiem: null,
  thanhVienThamGias: null,
  phanChiaSuDongGop: null
};

export default HoatDongData;