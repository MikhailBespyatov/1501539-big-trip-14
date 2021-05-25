export const ROUTE_POINT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Transport',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

export const TITLES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
];

export const OFFERS = [{
  title: 'Add luggage',
  price: 30,
},
{
  title: 'Switch to comfort class',
  price: 100,
},
{
  title: 'Add meal',
  price: 15,
},
{
  title: 'Choose seats',
  price: 5,
},
{
  title: 'Travel by train',
  price: 40,
},
];

export const DESTINATION_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export const PHOTOS = [1, 2, 3, 4, 5];

export const SORT_TYPE = {
  DEFAULT: 'default',
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_TASK',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FILTER_TYPE = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
  NONE: 'NONE',
};

export const SITE_MENU = {
  TABLE: 'TABLE',
  STATS: 'STATS',
  NEW: 'NEW',
};

export const typeToEmoji = {
  'TAXI': '🚕',
  'BUS': '🚌',
  'TRAIN': '🚂',
  'SHIP': '🛳',
  'TRANSPORT': '🚊',
  'DRIVE': '🚗',
  'FLIGHT': '✈️',
  'CHECK-IN': '🏨',
  'SIGHTSEEING': '🏛',
  'RESTAURANT': '🍴',
};

export const STATE = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ERROR: 'ERROR',
};
