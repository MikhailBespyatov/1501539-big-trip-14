import dayjs from 'dayjs';
import { getRandomIndex, getRandomInteger } from './common.js';
import { ROUTE_POINT_TYPES, TITLES } from '../mock/constant.js';

export const generatePointType = () => {
  return ROUTE_POINT_TYPES[getRandomIndex(ROUTE_POINT_TYPES)];
};

export const generateTitle = () => {
  return TITLES[getRandomIndex(TITLES)];
};

export const generateStartTime = () => {
  const time = dayjs().add(getRandomInteger(0, 11), 'h').add(getRandomInteger(1, 59), 'm');

  return {
    dataTime: time.format('YYYY-MM-DDTHH:mm'),
    visibleTime: time.format('HH:mm'),
  };
};

export const generateEndTime = () => {
  const time = dayjs().add(getRandomInteger(12, 24), 'h').add(getRandomInteger(1, 59), 'm');

  return {
    dataTime: time.format('YYYY-MM-DDTHH:mm'),
    visibleTime: time.format('HH:mm'),
  };
};

export const generateDay = () => {
  const dayGap = 7;
  const time = dayjs().add(getRandomInteger(-dayGap, dayGap), 'd');
  return time;
};

export const isPast = (day) => {
  return dayjs().isAfter(day, 'd');
};

export const isFuture = (day) => {
  return dayjs().isBefore(day, 'd');
};
