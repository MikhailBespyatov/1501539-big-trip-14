import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomInteger, getRandomArray, shuffle, msToTime } from '../util/common.js';
import { OFFERS, DESTINATION_DESCRIPTIONS, PHOTOS } from './constant.js';
import {
  generatePointType, generateTitle, generateStartTime, generateEndTime,
  generateDay, isPast, isFuture
} from '../util/waypoint.js';

const WAYPOINT_COUNT = 10;

export const generateWaypoint = () => {
  const day = generateDay();
  const startTime = generateStartTime();
  const endTime = generateEndTime();
  return {
    id: nanoid(),
    type: generatePointType(),
    title: generateTitle(),
    dateItem: day.format('MMMM D'),
    dateEdit: day.format('DD/MM/YY'),
    basePrice: getRandomInteger(200, 1000),
    offers: getRandomArray(OFFERS),
    destinations: shuffle(DESTINATION_DESCRIPTIONS).slice(getRandomInteger(5, 10)),
    photos: shuffle(PHOTOS).slice(getRandomInteger(0, 4)),
    startTime,
    endTime,
    diffTime: dayjs(endTime.dataTime).diff(dayjs(startTime.dataTime)),
    stopTime: msToTime(dayjs(endTime.dataTime).diff(dayjs(startTime.dataTime))),
    isFavorite: Boolean(getRandomInteger()),
    isPast: isPast(day),
    isFuture: isFuture(day),
  };
};

export const waypoints = new Array(WAYPOINT_COUNT).fill().map(() => generateWaypoint());

export const offersTotalCost = waypoints.slice(0).map((element) => {
  let sum = 0;
  element.offers.map((el) => {
    sum = sum + el.price;
  });
  return sum;
});
