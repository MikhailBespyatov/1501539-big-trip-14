import he from 'he';
import Smart from './smart-abstract.js';
import { ucFirst, getDateFormFormat } from '../util/common.js';
import { blanc, cities } from '../mock/generate-waypoint.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createOfferTemplate = (desiredOffers, dataOffers) => {
  return `${desiredOffers.map((offer) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox"
  name="event-offer-${offer.id}" value="${offer.id}" ${getCheckedFlag(offer, dataOffers) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-${offer.id}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div> `).join('')}`;
};

const createEventTypeItemTemplate = (types) => {
  return `<div class="event__type-item">
    <input id="event-type-${types.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${types.type}">
    <label class="event__type-label  event__type-label--${types.type}" for="event-type-${types.type}-1">${ucFirst(types.type)}</label>
  </div>`;
};

const findOffer = (data, types) => {
  return types.find((it) => it.type === data.type.toLowerCase()).offers;
};

const findDestination = (data, cities) => {
  return cities.find((it) => it.title === data.title);
};

const getCheckedFlag = (desiredOffers, dataOffers) => {
  return dataOffers.some((it) => it.id === desiredOffers.id);
};

const createEditFormTemplate = (types, сities, datalist = blanc) => {

  const { basePrice, dateStart, dateEnd,
    type, offers, title } = datalist;

  const allOffersType = findOffer(datalist, types);
  const allDestinations = findDestination(datalist, сities);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${types.map((it) => createEventTypeItemTemplate(it)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(title)}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${cities.map((it) => `<option value="${it.title}"></option>`).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateFormFormat(dateStart)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateFormFormat(dateEnd)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${datalist.id ? 'Delete' : 'Cansel'}</button>
      ${datalist.id ? `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>` : ''}
    </header>
    <section class="event__details">
      ${allOffersType.length === 0 ? '' : `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${createOfferTemplate(allOffersType, offers)}
      </div>
    </section>`}

     ${allDestinations ? `<section class="event__section  event__section--destination">
     <h3 class="event__section-title  event__section-title--destination">Destination</h3>
     <p class="event__destination-description">${allDestinations.destinations.map((element) => element).join(' ')}</p>

     <div class="event__photos-container">
       <div class="event__photos-tape">
       ${allDestinations.photos.map((element) => `<img class="event__photo" src="img/photos/${element}.jpg" alt="Event photo">`).join('')}
       </div>
     </div>
   </section>` : ''}
    </section>
  </form>
</li>`;
};

export default class EditForm extends Smart {
  constructor(types, cities, datalist = blanc) {
    super();
    this._datalist = EditForm.parseWaypointToData(datalist);
    this._types = types;
    this._cities = cities;
    this._pickerStart = null;
    this._pickerEnd = null;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._rollupClickHandler = this._rollupClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._titleInputHandler = this._titleInputHandler.bind(this);
    this._offerChekedHandler = this._offerChekedHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offerChekedHandler = this._offerChekedHandler.bind(this);
    this._pickerStartChangeHandler = this._pickerStartChangeHandler.bind(this);
    this._pickerEndChangeHandler = this._pickerEndChangeHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setPickerStart();
    this._setPickerEnd();
  }

  getTemplate() {
    return createEditFormTemplate(this._types, this._cities, this._datalist);
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('[name="event-type"]').
      forEach((element) => element.addEventListener('change', this._typeChangeHandler));
    this.getElement().querySelector('#event-destination-1')
      .addEventListener('input', this._titleInputHandler);
    this.getElement().querySelectorAll('.event__offer-selector')
      .forEach((element) => element.addEventListener('click', this._offerChekedHandler));
    this.getElement().querySelector('#event-price-1').addEventListener('input', this._priceInputHandler);
    this.getElement().querySelectorAll('.event__offer-checkbox')
      .forEach((it) => it.addEventListener('click', this._offerChekedHandler));
  }

  _setPickerStart() {
    if (this._pickerStart) {
      this._pickerStart.destroy();
      this._pickerStart = null;
    }
    this._pickerStart = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._datalist.dateStart,
        onChange: this._pickerStartChangeHandler,
      },
    );
  }

  _setPickerEnd() {
    if (this._pickerEnd) {
      this._pickerEnd.destroy();
      this._pickerEnd = null;
    }

    this._pickerEnd = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._datalist.dateEnd,
        onChange: this._pickerEndChangeHandler,
      },
    );
  }

  _pickerStartChangeHandler([userDate]) {
    this.updateData({ dateStart: userDate });
  }

  _pickerEndChangeHandler([userDate]) {
    this.updateData({ dateEnd: userDate });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditForm.parseDataToWaypoint(this._datalist));
  }

  _rollupClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    const targetValue = evt.target.value;
    const findType = this._types.find((it) => it.type === targetValue);
    this.updateData({ type: findType.type });
  }

  _titleInputHandler(evt) {
    evt.preventDefault();
    const evtValue = evt.target.value;
    const findCity = this._cities.find((it) => it.title === evtValue);
    const destination = findCity ? findCity : { title: evtValue };
    const isRender = !this._cities.some((it) => it.title === evtValue);
    this.updateData({
      title: evtValue, destinations: destination.destinations,
      photos: destination.photos,
    }, isRender);

    if (this._cities.some((it) => it.title === evtValue)) {
      this.getElement().querySelector('.event__save-btn').disabled = false;
    } else {
      this.getElement().querySelector('.event__save-btn').disabled = true;
    }
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({ basePrice: parseInt(evt.target.value) }, true);
  }

  _offerChekedHandler() {
    const checkedTitles = Array.from(this.getElement().querySelectorAll('.event__offer-checkbox'))
      .filter((element) => element.checked).map((it) => it.value);
    const offers = findOffer(this._datalist, this._types).filter((offer) => checkedTitles.includes(offer.id));
    this.updateData({ offers: offers }, true);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.canselDeleteClick();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setRollupClickHandler(this._callback.rollupClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this._setPickerStart();
    this._setPickerEnd();
    this.setCanselDeleteClickHandler(this._callback.canselDeleteClick);
  }

  reset(waypoint) {
    this.updateData(EditForm.parseWaypointToData(waypoint));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    if (this.getElement().querySelector('.event__rollup-btn')) {
      this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupClickHandler);
    }
  }

  setCanselDeleteClickHandler(callback) {
    this._callback.canselDeleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
  }

  static parseWaypointToData(waypoint) {
    return {
      ...waypoint,
    };
  }

  static parseDataToWaypoint(data) {
    data = { ...data };

    return data;
  }

  removeElement() {
    super.removeElement();

    if (this._pickerStart) {
      this._pickerStart.destroy();
      this._pickerStart = null;
    }

    if (this._pickerEnd) {
      this._pickerEnd.destroy();
      this._pickerEnd = null;
    }
  }
}
