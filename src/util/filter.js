import { FilterType } from '../constant.js';
import dayjs from 'dayjs';

const isPast = (day) => {
  return dayjs().isAfter(day, 'd');
};

const isFuture = (day) => {
  return dayjs().isBefore(day, 'd');
};

const isToday = (date) => {
  return (new Date().getDate() === new Date(date).getDate());
};

export const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => (isFuture(waypoint.dateEnd)) || isToday(waypoint.dateStart)),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => isPast(waypoint.dateStart)),
};
