import { sumBasePrice, sumArray } from '../mock/util.js';
import { createElement } from '../mock/util.js';

const createCostTemplate = (basePrice, offersCost) => {
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${sumBasePrice(basePrice) + sumArray(offersCost)}</span>
</p>`;
};

export default class Cost {
  constructor(basePrice, offersCost) {
    this._basePrice = basePrice;
    this._offersCost = offersCost;
    this._element = null;
  }

  getTemplate() {
    return createCostTemplate(this._basePrice, this._offersCost);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
