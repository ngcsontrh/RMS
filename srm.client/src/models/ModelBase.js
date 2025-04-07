/**
 * @typedef {Object} ModelBase
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 */

/**
 * Base model for entity data objects
 */
const ModelBase = {
  id: null,
  ngayTao: null,
  ngaySua: null
};

export default ModelBase;