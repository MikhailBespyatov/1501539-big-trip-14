import AbstractView from './abstract.js';

const createSortTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`;
};

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._sortByDayHandler = this._sortByDayHandler.bind(this);
    this._sortByPriceHandler = this._sortByPriceHandler.bind(this);
    this._sortByTimeHandler =this._sortByTimeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortByTimeHandler(evt) {
    evt.preventDefault();
    this._callback.sortByTime();
  }

  _sortByDayHandler(evt) {
    evt.preventDefault();
    this._callback.sortByDay();
  }

  _sortByPriceHandler(evt) {
    evt.preventDefault();
    this._callback.sortByPrice();
  }

  setSortByTimeHandler(callback) {
    this._callback.sortByTime = callback;
    this.getElement().querySelector('#sort-time').addEventListener('click', this._sortByTimeHandler);
  }

  setSortByDayHandler(callback) {
    this._callback.sortByDay = callback;
    this.getElement().querySelector('#sort-day').addEventListener('click', this._sortByDayHandler);
  }

  setSortByPriceHandler(callback) {
    this._callback.sortByPrice = callback;
    this.getElement().querySelector('#sort-price').addEventListener('click', this._sortByPriceHandler);
  }
}
