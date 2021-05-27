import AbstractView from './abstract.js';
import { getMounth } from '../util/common.js';

const createRouteTemplate = (points) => {
  const firstTitle = points[0].destination.name;
  const middleIndex = Math.floor(points.length / 2);
  const middleTitle = points[middleIndex].destination.name;

  const lastTitle = points[points.length - 1].destination.name;
  const firstDate = new Date(points[0].dateStart).getDate();
  const lastDate = new Date(points[points.length - 1].dateEnd).getDate();
  const monthStart = getMounth(points[0].dateStart);
  const monthEnd = getMounth(points[points.length - 1].dateEnd);


  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${firstTitle} ${points.length > 3 ? '&mdash; ...'  : points.length === 3 ? `&mdash; ${middleTitle}` : ''}
    &mdash; ${lastTitle}</h1>
    <p class="trip-info__dates">${monthStart} ${firstDate}&nbsp;&mdash;&nbsp;${monthEnd} ${lastDate}</p>
  </div>`;
};

export default class Route extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createRouteTemplate(this._points);
  }
}
