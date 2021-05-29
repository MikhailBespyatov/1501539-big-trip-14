import he from 'he';
import dayjs from 'dayjs';
import Smart from './smart-abstract.js';
import { capitalizeFirstLetter, getDateFormFormat } from '../util/common.js';
import flatpickr from 'flatpickr';
import { TRANSPORT_TYPES } from '../constant.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const blanc = {
  id: null,
  type: 'taxi',
  destination: {
    name: '',
    pictures: [],
    description: '',
  },
  dateStart: dayjs().toDate(),
  dateEnd: dayjs().toDate(),
  basePrice: 0,
  offers: [],
  isFavorite: false,
};

const createOfferTemplate = (desiredOffers, dataOffers) => {
  return `${desiredOffers.map((offer) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').join('-').toLowerCase()}-1" type="checkbox"
  name="event-offer-${offer.title.split(' ').join('-').toLowerCase()}" value="${offer.title}" ${getCheckedFlag(offer, dataOffers) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-${offer.title.split(' ').join('-').toLowerCase()}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div> `).join('')}`;
};

const createEventTypeItemTemplate = (types) => {
  return `<div class="event__type-item">
    <input id="event-type-${types.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${types.type}">
    <label class="event__type-label  event__type-label--${types.type}" for="event-type-${types.type}-1">${capitalizeFirstLetter(types.type)}</label>
  </div>`;
};

const findOffer = (data, types) => {
  return types.find((it) => it.type === data.type).offers;
};

const getCheckedFlag = (desiredOffers, dataOffers) => {
  return dataOffers.some((it) => it.title === desiredOffers.title);
};

const createEditFormTemplate = (types, destinations, datalist = blanc) => {

  const { basePrice, dateStart, dateEnd,
    type, offers, destination, isDisabled, isSaving, isDeleting } = datalist;

  const allOffersType = findOffer(datalist, types);

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
        ${type} ${TRANSPORT_TYPES.includes(type) ? 'to' : 'in'}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinations.map((it) => `<option value="${it.name}"></option>`).join('')}
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

      <button class="event__save-btn  btn  btn--blue" type="submit" ${!destination.name || isDisabled ? 'disabled' : ''}>
      ${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${!datalist.id ? 'Cansel' : !isDeleting ? 'Delete' : 'Deleting...'}</button>
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

     ${destination.description ? `<section class="event__section  event__section--destination">
     <h3 class="event__section-title  event__section-title--destination">Destination</h3>
     <p class="event__destination-description">${destination.description}</p>

     <div class="event__photos-container">
       <div class="event__photos-tape">
       ${destination.pictures.map((element) => `<img class="event__photo" src="${element.src}" alt="${element.description}">`).join('')}
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
    this._datePicker = {
      start: null,
      end: null,
    };
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._rollupClickHandler = this._rollupClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._titleInputHandler = this._titleInputHandler.bind(this);
    this._offerChekedHandler = this._offerChekedHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offerChekedHandler = this._offerChekedHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._dateChangeHandler = this._dateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatePicker();
  }

  getTemplate() {
    return createEditFormTemplate(this._types, this._cities, this._datalist);
  }

  removeElement() {
    super.removeElement();

    Object.values(this._datePicker)
      .forEach((oneDatepicker) => {
        if (oneDatepicker) {
          oneDatepicker.destroy();
          oneDatepicker = null;
        }
      });
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

  _setDatePicker() {
    const datePicker = Object.entries(this._datePicker);

    for (const onePick of datePicker) {
      const onePickKeys = onePick[0];
      let onePickValues = onePick[1];

      if (onePickValues) {
        onePickValues.destroy();
        onePickValues = null;
      }

      this._datePicker[onePickKeys] = flatpickr(
        this.getElement().querySelector(`#event-${onePickKeys}-time-1`),
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          defaultDate: this._datalist[`date${capitalizeFirstLetter(onePickKeys)}`],
          minDate: onePickKeys === 'end' ? this._datalist.dateStart : null,
          maxDate: onePickKeys === 'start' ? this._datalist.dateEnd : null,
          onChange: (evt) => this._dateChangeHandler(evt, `date${capitalizeFirstLetter(onePickKeys)}`),
        },
      );
    }
  }

  _dateChangeHandler([selectedDate], keyDate) {
    this.updateData({
      [`${keyDate}`]: selectedDate,
    }, true);

    this._datePicker.start.set('maxDate', this._datalist.dateEnd);
    this._datePicker.end.set('minDate', this._datalist.dateStart);
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
    const findCity = this._cities.find((it) => it.name === evtValue);
    const destination = findCity ? findCity : { name: evtValue };
    const isRender = !this._cities.some((it) => it.name === evtValue);
    this.updateData({
      destination,
    }, isRender);
    if (this._cities.some((it) => it.name === evtValue)) {
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
    const offers = findOffer(this._datalist, this._types).filter((offer) => checkedTitles.includes(offer.title));
    this.updateData({ offers: offers }, true);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.canselDeleteClick();
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

  restoreHandlers() {
    this._setInnerHandlers();
    this.setRollupClickHandler(this._callback.rollupClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this._setDatePicker();
    this.setCanselDeleteClickHandler(this._callback.canselDeleteClick);
  }

  reset(waypoint) {
    this.updateData(EditForm.parseWaypointToData(waypoint));
  }

  static parseWaypointToData(waypoint) {
    return {
      ...waypoint,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseDataToWaypoint(data) {
    data = { ...data };

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
