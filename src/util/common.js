import dayjs from 'dayjs';

export const sumBasePrice = (array) => {
  let sum = 0;
  array.map((element) => {
    sum = sum + element.basePrice;
  });
  return sum;
};

export const sumOffersPrice = (array) => {
  let sum = 0;
  array.map((element) => {
    element.offers.map((offer) => sum = sum + offer.price);
  });

  return sum;
};

export const msToTime = (duration) => {
  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  let days = parseInt(duration / (1000 * 60 * 60 * 24));

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  days = (days < 10) ? '0' + days : days;

  return `${days < 1 ? '' : days + 'D'} ${hours < 1 ? '' : hours + 'H'} ${minutes + 'M'}`;
};

export const sortDateUp = (a, b) => {
  const dateA = new Date(a.dateStart);
  const dateB = new Date(b.dateStart);
  return dateA - dateB;
};

export const sortDateDown = (a, b) => {
  const dateA = new Date(a.dateStart);
  const dateB = new Date(b.dateStart);
  return dateB - dateA;
};

export const getDiffTime = (start, end) => {
  return dayjs(end).diff(dayjs(start));
};

export const sortPriceUp = (a, b) => {
  return a.basePrice - b.basePrice;
};

export const sortPriceDown = (a, b) => {
  return b.basePrice - a.basePrice;
};

export const sortTimeUp = (a, b) => {
  return getDiffTime(a.dateStart, a.dateEnd) - getDiffTime(b.dateStart, b.dateEnd);
};

export const sortTimeDown = (a, b) => {
  return getDiffTime(b.dateStart, b.dateEnd) - getDiffTime(a.dateStart, a.dateEnd);
};

export const ucFirst = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

export const getDateFormFormat = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};

export const getDateWaypoint = (date) => {
  return dayjs(date).format('HH:mm');
};

export const getDate = (date) => {
  return dayjs(date).format('MMMM D');
};

export const getMounth = (date) => {
  return dayjs(date).format('MMM');
};
