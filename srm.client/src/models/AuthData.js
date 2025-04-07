/**
 * @typedef {Object} AuthData
 * @property {string} id - Unique identifier
 * @property {string} username - User's username
 * @property {string[]} roles - List of user roles
 */

/**
 * Authentication data model
 */
const AuthData = {
  id: '',
  username: '',
  roles: []
};

export default AuthData;