import { sumBasePrice, sumArray } from '../util/common.js';
import AbstractView from './abstract.js';

const createCostTemplate = (basePrice, offersCost) => {
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${sumBasePrice(basePrice) + sumArray(offersCost)}</span>
</p>`;
};

export default class Cost extends AbstractView {
  constructor(basePrice, offersCost) {
    super();
    this._basePrice = basePrice;
    this._offersCost = offersCost;
  }

  getTemplate() {
    return createCostTemplate(this._basePrice, this._offersCost);
  }
}
