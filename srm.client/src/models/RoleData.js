import ModelBase from './ModelBase';

/**
 * @typedef {Object} RoleData
 * @property {string} [id] - Unique identifier
 * @property {string} [ngayTao] - Creation date
 * @property {string} [ngaySua] - Modification date
 * @property {string} [name] - Role name
 */

/**
 * Role data model
 */
const RoleData = {
  ...ModelBase,
  name: null
};

export default RoleData;