import { nanoid } from 'nanoid';
import { getRandomInteger, getRandomArray, shuffle } from '../util/common.js';
import { OFFERS, DESTINATION_DESCRIPTIONS, PHOTOS } from './constant.js';
import {
  generatePointType, generateTitle, generateStartTime, generateEndTime,
  generateDay, isPast, isFuture
} from '../util/waypoint.js';

const WAYPOINT_COUNT = 2;

export const generateWaypoint = () => {
  const day = generateDay();

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
    startTime: generateStartTime(),
    endTime: generateEndTime(),
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
