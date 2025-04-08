import dayjs from 'dayjs';

export interface TokenData {
  accessToken?: string;
  refreshToken?: string;
  expiration?: dayjs.Dayjs;
}