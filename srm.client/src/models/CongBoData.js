import ModelBase from './ModelBase';

/**
 * @typedef {Object} CongBoData
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 * @property {string} [noiDangBaoId] - ID of the publication venue
 * @property {string} [tenNoiDangBao] - Name of the publication venue
 * @property {string} [linkMinhChungTapChi] - Link to journal verification
 * @property {string} [ten] - Title
 * @property {string} [diaDiem] - Location
 * @property {string} [tenTapChi] - Journal name
 * @property {string} [nhaXuatBan] - Publisher
 * @property {string} [fileMinhChungBaiBao] - Article verification file
 * @property {string} [linkBaiBao] - Link to the article
 * @property {string} [ngayGuiDang] - Date of submission
 * @property {string} [ngayCongBo] - Date of publication
 * @property {number} [chiSoTacDong] - Impact factor
 * @property {number} [ky] - Issue number
 * @property {number} [tap] - Volume
 * @property {string} [trang] - Pages
 * @property {number} [diemHoiDong] - Council score
 * @property {string} [tenHoiDong] - Council name
 * @property {string} [loaiQ] - Q-type classification
 * @property {number} [thanhQuaId] - Achievement ID
 * @property {string} [linkMinhChungLoaiQ] - Link to Q-type verification
 * @property {string} [tacGiaChinh] - Main author
 * @property {string} [tacGiaLienHe] - Corresponding author
 * @property {string} [dongTacGias] - Co-authors
 * @property {string} [loaiHoTroChiPhi] - Type of cost support
 * @property {string} [phanChiaSuDongGop] - Contribution distribution
 */

/**
 * Publication data model
 */
const CongBoData = {
  ...ModelBase,
  noiDangBaoId: null,
  tenNoiDangBao: null,
  linkMinhChungTapChi: null,
  ten: null,
  diaDiem: null,
  tenTapChi: null,
  nhaXuatBan: null,
  fileMinhChungBaiBao: null,
  linkBaiBao: null,
  ngayGuiDang: null,
  ngayCongBo: null,
  chiSoTacDong: null,
  ky: null,
  tap: null,
  trang: null,
  diemHoiDong: null,
  tenHoiDong: null,
  loaiQ: null,
  thanhQuaId: null,
  linkMinhChungLoaiQ: null,
  tacGiaChinh: null,
  tacGiaLienHe: null,
  dongTacGias: null,
  loaiHoTroChiPhi: null,
  phanChiaSuDongGop: null
};

export default CongBoData;