import AbstractView from './abstract.js';
import { SiteMenu } from '../constant.js';

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu=${SiteMenu.TABLE}>Table</a>
  <a class="trip-tabs__btn" href="#" data-menu="${SiteMenu.STATS}">Stats</a>
</nav>`;
};

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._siteMenuHandler = this._siteMenuHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _siteMenuHandler(evt) {
    evt.preventDefault();
    this._callback.siteMenuHandler(evt.target.dataset.menu);
  }

  setSiteMenuHandler(callback) {
    this._callback.siteMenuHandler = callback;
    this.getElement().addEventListener('click', this._siteMenuHandler);
  }

  checkActiveState(menuItem) {
    const item = this.getElement().querySelector(`[data-menu=${menuItem}]`);

    return item.classList.contains('trip-tabs__btn--active');
  }

  setActiveState(menuItem) {
    const item = this.getElement().querySelector(`[data-menu=${menuItem}]`);

    if (!this.checkActiveState(menuItem)) {
      item.classList.add('trip-tabs__btn--active');
    }
  }

  removeActiveState(menuItem) {
    const item = this.getElement().querySelector(`[data-menu=${menuItem}]`);

    if (this.checkActiveState(menuItem)) {
      item.classList.remove('trip-tabs__btn--active');
    }
  }
}
