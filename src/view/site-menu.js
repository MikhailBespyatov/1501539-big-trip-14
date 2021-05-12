import AbstractView from './abstract.js';
import { SITE_MENU } from '../mock/constant.js';

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu=${SITE_MENU.TABLE}>Table</a>
  <a class="trip-tabs__btn" href="#" data-menu="${SITE_MENU.STATS}">Stats</a>
</nav>`;
};

export default class SiteMenu extends AbstractView {
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

  setSiteMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }
}
