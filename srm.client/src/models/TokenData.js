/**
 * @typedef {Object} TokenData
 * @property {string} [accessToken] - JWT access token
 * @property {string} [refreshToken] - JWT refresh token
 * @property {string} [expiration] - Token expiration date
 */

/**
 * Authentication token data model
 */
const TokenData = {
  accessToken: null,
  refreshToken: null,
  expiration: null
};

export default TokenData;