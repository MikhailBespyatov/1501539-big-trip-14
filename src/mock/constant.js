const ROUTE_POINT_TYPES = [
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

const TITLES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
];

const OFFERS = [
  {
    id: 'luggage',
    title: 'Add luggage',
    price: 30,
  },
  {
    id: 'comfort',
    title: 'Switch to comfort class',
    price: 100,
  },
  {
    id: 'meal',
    title:'Add meal',
    price: 15,
  },
  {
    id: 'seats',
    title:'Choose seats',
    price: 5,
  },
  {
    id: 'train',
    title:'Travel by train',
    price: 40,
  },
];

const DESTINATION_DESCRIPTIONS = [
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

const PHOTOS = [1, 2, 3, 4, 5];

const SORT_TYPE = {
  DEFAULT: 'default',
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_TASK',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FILTER_TYPE = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};

export { ROUTE_POINT_TYPES, TITLES, OFFERS, DESTINATION_DESCRIPTIONS,
  PHOTOS, SORT_TYPE, USER_ACTION, UPDATE_TYPE, FILTER_TYPE };
