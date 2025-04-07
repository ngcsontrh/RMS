import ModelBase from './ModelBase';

/**
 * @typedef {Object} DeTaiData
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 * @property {string} [capDeTaiId] - Research level ID
 * @property {string} [tenCapDeTai] - Research level name
 * @property {string} [ten] - Title
 * @property {string} [maSo] - Code number
 * @property {string} [mucTieu] - Objective
 * @property {string} [noiDung] - Content
 * @property {number} [tongKinhPhi] - Total budget
 * @property {string} [ngayBatDau] - Start date
 * @property {string} [ngayKetThuc] - End date
 * @property {number} [kinhPhiHangNam] - Annual budget
 * @property {string} [hoSoNghiemThu] - Acceptance documents
 * @property {string} [hoSoSanPham] - Product documents
 * @property {string} [donViChuTriId] - Leading organization ID
 * @property {string} [tenDonViChuTri] - Leading organization name
 * @property {string} [chuNhiem] - Project leader
 * @property {string[]} [canBoThamGias] - Participating staff
 * @property {string} [phanChiaSuDongGop] - Contribution distribution
 */

/**
 * Research project data model
 */
const DeTaiData = {
  ...ModelBase,
  capDeTaiId: null,
  tenCapDeTai: null,
  ten: null,
  maSo: null,
  mucTieu: null,
  noiDung: null,
  tongKinhPhi: null,
  ngayBatDau: null,
  ngayKetThuc: null,
  kinhPhiHangNam: null,
  hoSoNghiemThu: null,
  hoSoSanPham: null,
  donViChuTriId: null,
  tenDonViChuTri: null,
  chuNhiem: null,
  canBoThamGias: [],
  phanChiaSuDongGop: null
};

export default DeTaiData;