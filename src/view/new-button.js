import AbstractView from './abstract';
import { SITE_MENU } from '../mock/constant.js';

const createNewButtonTemplate = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" data-menu=${SITE_MENU.NEW}>New event</button>`;
};

export default class NewButton extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createNewButtonTemplate();
  }

  setDisabled(boolean) {
    this.getElement().disabled = boolean;
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.clickHandler(evt.target.dataset.menu);
  }

  setClickHandler(callback) {
    this._callback.clickHandler = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
