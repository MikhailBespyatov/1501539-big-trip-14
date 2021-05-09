import { sumBasePrice } from '../util/common.js';
import AbstractView from './abstract.js';

const createCostTemplate = (basePrice) => {
  const fullPrice = sumBasePrice(basePrice);
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullPrice}</span>
</p>`;
};

export default class Cost extends AbstractView {
  constructor(basePrice) {
    super();
    this._basePrice = basePrice;
  }

  getTemplate() {
    return createCostTemplate(this._basePrice);
  }
}
