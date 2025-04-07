import ModelBase from './ModelBase';

/**
 * @typedef {Object} LoaiHoatDongData
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 * @property {string} [ten] - Name of the activity type
 */

/**
 * Activity type data model
 */
const LoaiHoatDongData = {
  ...ModelBase,
  ten: null
};

export default LoaiHoatDongData;