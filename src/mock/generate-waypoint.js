import { getRandomIndex, getRandomInteger, getRandomArray, shuffle } from './util.js';
import { ROUTE_POINT_TYPES, TITLES, OFFERS, DESTINATION_DESCRIPTIONS, PHOTOS } from './constant.js';
import dayjs from 'dayjs';

const generatePointType = () => {
  return ROUTE_POINT_TYPES[getRandomIndex(ROUTE_POINT_TYPES)];
};

const generateTitle = () => {
  return TITLES[getRandomIndex(TITLES)];
};

const generateDate = () => {
  return dayjs().format('MM/DD/YY HH:mm');
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
  return {
    type: generatePointType(),
    title: generateTitle(),
    date: 1,
    dateFrom: generateDate(),
    dateTo: generateDate(),
    basePrice: getRandomInteger(200, 1000),
    orderPrice: getRandomInteger(1, 200),
    offers: getRandomArray(OFFERS),
    destinations: shuffle(DESTINATION_DESCRIPTIONS).slice(getRandomInteger(5, 9)),
    photos: shuffle(PHOTOS).slice(getRandomInteger(0, 4)),
    startTime: generateStartTime(),
    endTime: generateEndTime(),
    isFavorite: Boolean(getRandomInteger()),
  };
};

export const waypoints = new Array(10).fill().map(() => generateWaypoint());
