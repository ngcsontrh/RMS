import ModelBase from './ModelBase';

/**
 * @typedef {Object} DonViChuTriData
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 * @property {string} [ten] - Name of the leading organization
 */

/**
 * Leading organization data model
 */
const DonViChuTriData = {
  ...ModelBase,
  ten: null
};

export default DonViChuTriData;