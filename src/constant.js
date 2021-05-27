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

export const TRANSPORT = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
];

export const SortType = {
  DEFAULT: 'default',
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_TASK',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
  NONE: 'NONE',
};

export const SiteMenu = {
  TABLE: 'TABLE',
  STATS: 'STATS',
  NEW: 'NEW',
};

export const TypeToEmoji = {
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

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ERROR: 'ERROR',
};
