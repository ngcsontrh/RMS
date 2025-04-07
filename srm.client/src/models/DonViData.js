import ModelBase from './ModelBase';

/**
 * @typedef {Object} DonViData
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 * @property {string} [ten] - Name of the organization unit
 */

/**
 * Organization unit data model
 */
const DonViData = {
  ...ModelBase,
  ten: null
};

export default DonViData;