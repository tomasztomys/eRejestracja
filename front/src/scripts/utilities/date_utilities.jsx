const getDaysInMonth = (month, year) => {
  let date = new Date(year, month, 1);
  let days = [];

  while(date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getNextDays = (startDate, numberOfDays) => {
  let date = startDate;
  let days = [];

  while(days.length <= numberOfDays) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const pad = (n) => {
  return n < 10 ? '0' + n : n;
};

const timezoneOffset = (offset) => {
 let sign = '';

  if (offset === 0) {
    return 'Z';
  }
  sign = (offset > 0) ? '-' : '+';
  offset = Math.abs(offset);

  return sign + pad(Math.floor(offset / 60)) + ':' + pad(offset % 60);
};

const convertToRfc3339 = (date) => {
  return date.getFullYear() + '-' +
    pad(date.getMonth() + 1) + '-' +
    pad(date.getDate()) + 'T' +
    pad(date.getHours()) + ':' +
    pad(date.getMinutes()) + ':' +
    pad(date.getSeconds()) +
    timezoneOffset(date.getTimezoneOffset());
};

export {
  getDaysInMonth,
  convertToRfc3339,
  getNextDays
};