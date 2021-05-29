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

const TRANSPORT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
];

const SortType = {
  DEFAULT: 'default',
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_TASK',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
  NONE: 'NONE',
};

const SiteMenu = {
  TABLE: 'TABLE',
  STATS: 'STATS',
  NEW: 'NEW',
};

const TypeToEmoji = {
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

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ERROR: 'ERROR',
};

export {
  ROUTE_POINT_TYPES, TRANSPORT_TYPES, SortType, UserAction, UpdateType, FilterType,
  SiteMenu, TypeToEmoji, State
};
