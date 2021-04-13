import { getRandomIndex, getRandomInteger, getRandomArray, shuffle } from './util.js';
import { ROUTE_POINT_TYPES, TITLES, OFFERS, DESTINATION_DESCRIPTIONS, PHOTOS } from './constant.js';
import dayjs from 'dayjs';

const generatePointType = () => {
  return ROUTE_POINT_TYPES[getRandomIndex(ROUTE_POINT_TYPES)];
};

const generateTitle = () => {
  return TITLES[getRandomIndex(TITLES)];
};

const generateStartTime = () => {
  const time = dayjs().add(getRandomInteger(0, 11), 'h').add(getRandomInteger(1, 59), 'm');

  return {
    dataTime: time.format('YYYY-MM-DDTHH:mm'),
    visibleTime: time.format('HH:mm'),
  };
};

const generateEndTime = () => {
  const time = dayjs().add(getRandomInteger(12, 24), 'h').add(getRandomInteger(1, 59), 'm');

  return {
    dataTime: time.format('YYYY-MM-DDTHH:mm'),
    visibleTime: time.format('HH:mm'),
  };
};

const generateDay = () => {
  const dayGap = 7;
  const time = dayjs().add(getRandomInteger(-dayGap, dayGap), 'd');
  return time;
};

const isPast = (day) => {
  return dayjs().isAfter(day, 'd');
};

const isFuture = (day) => {
  return dayjs().isBefore(day, 'd');
};

export const calculateDifferenceInTime = (firstDate, secondDate) => {
  const getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);
  const different = (getDate(secondDate) - getDate(firstDate));
  let differentRes, hours, minuts;
  if(different > 0) {
    differentRes = different;
    hours = Math.floor((differentRes % 86400000) / 3600000);
    minuts = Math.round(((differentRes % 86400000) % 3600000) / 60000);
  } else {
    differentRes = Math.abs((getDate(firstDate) - getDate(secondDate)));
    hours = Math.floor(24 - (differentRes % 86400000) / 3600000);
    minuts = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
  }
  const result = hours + ':' + minuts;
  return result;
};

export const generateWaypoint = () => {
  const day = generateDay();

  return {
    type: generatePointType(),
    title: generateTitle(),
    dateItem: day.format('MMMM D'),
    dateEdit: day.format('DD/MM/YY'),
    basePrice: getRandomInteger(200, 1000),
    offers: getRandomArray(OFFERS),
    destinations: shuffle(DESTINATION_DESCRIPTIONS).slice(getRandomInteger(5, 10)),
    photos: shuffle(PHOTOS).slice(getRandomInteger(0, 4)),
    startTime: generateStartTime(),
    endTime: generateEndTime(),
    isFavorite: Boolean(getRandomInteger()),
    isPast: isPast(day),
    isFuture: isFuture(day),
  };
};

export const waypoints = new Array(10).fill().map(() => generateWaypoint());

export const offersTotalCost = waypoints.slice(0).map((element) => {
  let sum = 0;
  element.offers.map((el) => {
    sum = sum + el.price;
  });
  return sum;
});
