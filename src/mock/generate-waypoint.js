import { nanoid } from 'nanoid';
import { getRandomInteger, getRandomArray, shuffle } from '../util/common.js';
import { OFFERS, DESTINATION_DESCRIPTIONS, PHOTOS } from './constant.js';
import {
  generatePointType, generateTitle, generateDay, isPast, isFuture
} from '../util/waypoint.js';

const WAYPOINT_COUNT = 10;

export const generateWaypoint = () => {
  const day = generateDay();
  return {
    id: nanoid(),
    type: generatePointType(),
    title: generateTitle(),
    dateStart: day.toDate(),
    dateEnd: day.add(getRandomInteger(12, 24), 'h').add(getRandomInteger(1, 59), 'm').toDate(),
    dateItem: day.format('MMMM D'),
    dateEdit: day.format('DD/MM/YY'),
    basePrice: getRandomInteger(200, 1000),
    offers: getRandomArray(OFFERS),
    destinations: shuffle(DESTINATION_DESCRIPTIONS).slice(getRandomInteger(5, 10)),
    photos: shuffle(PHOTOS).slice(getRandomInteger(0, 4)),
    isFavorite: Boolean(getRandomInteger()),
    isPast: isPast(day),
    isFuture: isFuture(day),
  };
};

export const types = [
  {
    type: 'taxi',
    offers: getRandomArray(OFFERS),
  },
  {
    type: 'bus',
    offers: getRandomArray(OFFERS),
  },
  {
    type: 'train',
    offers: getRandomArray(OFFERS),
  },
  {
    type: 'ship',
    offers: getRandomArray(OFFERS),
  },
  {
    type: 'transport',
    offers: getRandomArray(OFFERS),
  },
  {
    type: 'drive',
    offers: getRandomArray(OFFERS),
  },
  {
    type: 'flight',
    offers: getRandomArray(OFFERS),
  },
  {
    type: 'check-in',
    offers: getRandomArray(OFFERS),
  },
  {
    type: 'sightseeing',
    offers: getRandomArray(OFFERS),
  },
  {
    type: 'restaurant',
    offers: getRandomArray(OFFERS),
  },
];

export const cities = [
  {
    title: 'Amsterdam',
    photos: shuffle(PHOTOS).slice(getRandomInteger(0, 4)),
    destinations: shuffle(DESTINATION_DESCRIPTIONS).slice(getRandomInteger(5, 10)),
  },
  {
    title: 'Chamonix',
    photos: shuffle(PHOTOS).slice(getRandomInteger(0, 4)),
    destinations: shuffle(DESTINATION_DESCRIPTIONS).slice(getRandomInteger(5, 10)),
  },
  {
    title: 'Geneva',
    photos: shuffle(PHOTOS).slice(getRandomInteger(0, 4)),
    destinations: shuffle(DESTINATION_DESCRIPTIONS).slice(getRandomInteger(5, 10)),
  },
];

export const waypoints = new Array(WAYPOINT_COUNT).fill().map(() => generateWaypoint());

export const offersTotalCost = waypoints.slice(0).map((element) => {
  let sum = 0;
  element.offers.map((el) => {
    sum = sum + el.price;
  });
  return sum;
});
