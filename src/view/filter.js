import AbstractView from './abstract.js';
import { FILTER_TYPE } from '../mock/constant.js';

const createFiltersTemplate = (currentFilterType) => {
  return `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio"
    name="trip-filter" value="everything" data-filter-type="${FILTER_TYPE.EVERYTHING}" ${currentFilterType === FILTER_TYPE.EVERYTHING ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio"
    name="trip-filter" value="future" data-filter-type="${FILTER_TYPE.FUTURE}"  ${currentFilterType === FILTER_TYPE.FUTURE ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio"
    name="trip-filter" value="past" data-filter-type="${FILTER_TYPE.PAST}"  ${currentFilterType === FILTER_TYPE.PAST ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class Filters extends AbstractView {
  constructor(currentFilterType) {
    super();
    this._currentFilterType = currentFilterType;
    this._filterTypeCheckHandler = this._filterTypeCheckHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._currentFilterType);
  }

  _filterTypeCheckHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.filterType(evt.target.dataset.filterType);
  }

  setFilterTypeCheckHandler(callback) {
    this._callback.filterType = callback;
    this.getElement().addEventListener('click', this._filterTypeCheckHandler);
  }
}
