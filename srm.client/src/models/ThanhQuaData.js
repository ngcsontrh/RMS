import ModelBase from './ModelBase';

/**
 * @typedef {Object} ThanhQuaData
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 * @property {string} [ten] - Name of the achievement
 */

/**
 * Achievement data model
 */
const ThanhQuaData = {
  ...ModelBase,
  ten: null
};

export default ThanhQuaData;