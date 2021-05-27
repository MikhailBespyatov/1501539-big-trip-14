import AbstractView from './abstract.js';
import { FilterType } from '../constant.js';
import { filter } from '../util/filter.js';

const filteredPoints = (filteredType, points) => {
  return filter[filteredType](points);
};

const createFiltersTemplate = (currentFilterType, points) => {
  return `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio"
    name="trip-filter" value="everything" data-filter-type="${FilterType.EVERYTHING}" ${currentFilterType === FilterType.EVERYTHING ? 'checked' : ''}
    ${filteredPoints(FilterType.EVERYTHING, points).length === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio"
    name="trip-filter" value="future" data-filter-type="${FilterType.FUTURE}"  ${currentFilterType === FilterType.FUTURE ? 'checked' : ''}
    ${filteredPoints(FilterType.FUTURE, points).length === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio"
    name="trip-filter" value="past" data-filter-type="${FilterType.PAST}"  ${currentFilterType === FilterType.PAST ? 'checked' : ''}
    ${filteredPoints(FilterType.PAST, points).length === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class Filters extends AbstractView {
  constructor(currentFilterType, pointModel) {
    super();
    this._currentFilterType = currentFilterType;
    this._filterTypeCheckHandler = this._filterTypeCheckHandler.bind(this);
    this._points = pointModel.getPoints();
  }

  getTemplate() {
    return createFiltersTemplate(this._currentFilterType, this._points);
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
