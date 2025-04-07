import ModelBase from './ModelBase';

/**
 * @typedef {Object} CapDeTaiData
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 * @property {string} [ten] - Name of the research level
 */

/**
 * Research level/category data model
 */
const CapDeTaiData = {
  ...ModelBase,
  ten: null
};

export default CapDeTaiData;