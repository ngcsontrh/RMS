import dayjs from 'dayjs';

export interface ModelBase {
  id?: string;
  ngayTao?: dayjs.Dayjs;
  ngaySua?: dayjs.Dayjs;
}