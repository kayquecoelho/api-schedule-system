import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export default function formatDate(date: string) {
  return dayjs(date, 'DD-MM-YYYY').utc().format();
}
