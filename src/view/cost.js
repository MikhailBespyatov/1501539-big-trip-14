import { sumBasePrice, sumOffersPrice } from '../util/common.js';
import AbstractView from './abstract.js';

const createCostTemplate = (points) => {
  const basePrice = sumBasePrice(points);
  const offersPrice = sumOffersPrice(points);
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePrice + offersPrice}</span>
</p>`;
};

export default class Cost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createCostTemplate(this._points);
  }
}
