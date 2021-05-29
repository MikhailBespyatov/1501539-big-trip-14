import dayjs from 'dayjs';

const sumBasePrice = (points) => {
  let sum = 0;
  points.map((point) => {
    sum = sum + point.basePrice;
  });
  return sum;
};

const sumOffersPrice = (points) => {
  let sum = 0;
  points.map((point) => {
    point.offers.map((offer) => sum = sum + offer.price);
  });

  return sum;
};

const msToTime = (duration) => {
  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  let days = parseInt(duration / (1000 * 60 * 60 * 24));

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  days = (days < 10) ? '0' + days : days;

  return `${days < 1 ? '' : days + 'D'} ${hours < 1 ? '' : hours + 'H'} ${minutes + 'M'}`;
};

const sortDateUp = (a, b) => {
  const dateA = new Date(a.dateStart);
  const dateB = new Date(b.dateStart);
  return dateA - dateB;
};

const sortDateDown = (a, b) => {
  const dateA = new Date(a.dateStart);
  const dateB = new Date(b.dateStart);
  return dateB - dateA;
};

const getDiffTime = (start, end) => {
  return dayjs(end).diff(dayjs(start));
};

const sortPriceUp = (a, b) => {
  return a.basePrice - b.basePrice;
};

const sortPriceDown = (a, b) => {
  return b.basePrice - a.basePrice;
};

const sortTimeUp = (a, b) => {
  return getDiffTime(a.dateStart, a.dateEnd) - getDiffTime(b.dateStart, b.dateEnd);
};

const sortTimeDown = (a, b) => {
  return getDiffTime(b.dateStart, b.dateEnd) - getDiffTime(a.dateStart, a.dateEnd);
};

const capitalizeFirstLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

const getDateFormFormat = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};

const getDateWaypoint = (date) => {
  return dayjs(date).format('HH:mm');
};

const getDate = (date) => {
  return dayjs(date).format('MMMM D');
};

const getMounth = (date) => {
  return dayjs(date).format('MMM');
};

export {
  sumBasePrice, sumOffersPrice, msToTime, sortDateUp, sortDateDown, getDiffTime, sortPriceUp,
  sortPriceDown, sortTimeUp, sortTimeDown, capitalizeFirstLetter, getDateFormFormat, getDateWaypoint,
  getDate, getMounth
};
