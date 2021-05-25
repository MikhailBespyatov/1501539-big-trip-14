import { FILTER_TYPE } from '../constant.js';
import { isPast, isFuture } from '../util/waypoint.js';

export const filter = {
  [FILTER_TYPE.EVERYTHING]: (waypoints) => waypoints,
  [FILTER_TYPE.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isFuture(waypoint.dateStart)),
  [FILTER_TYPE.PAST]: (waypoints) => waypoints.filter((waypoint) => isPast(waypoint.dateEnd)),
};
