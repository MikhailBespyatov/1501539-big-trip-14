import { render, RenderPosition, remove } from '../util/render.js';
import { SITE_MENU, UPDATE_TYPE, FILTER_TYPE } from '../mock/constant.js';
import FilterPresenter from './filter.js';
import WaybillPresenter from './waybill.js';
import SiteMenuView from '../view/site-menu.js';
import NewButtonView from '../view/new-button.js';
import StatsView from '../view/stats.js';

export default class MainMenu {
  constructor(filterContainer, waybillContainer, siteMenuContainer, statsContainer,
    newButtonContainer, pointModel, filterModel) {
    this._filterContainer = filterContainer;
    this._waybillContainer = waybillContainer;
    this._siteMenuContainer = siteMenuContainer;
    this._statsContainer = statsContainer;
    this._newButtonContainer = newButtonContainer;

    this._pointModel = pointModel;
    this._filterModel = filterModel;

    this._filterPresenter = null;
    this._waybillPresenter = null;

    this._newButtonComponent = new NewButtonView();
    this._siteMenuComponent = new SiteMenuView();
    this._statsComponent = null;

    this._mainMenuClickHandler = this._mainMenuClickHandler.bind(this);
  }

  init() {
    this._waybillPresenter = new WaybillPresenter(this._waybillContainer, this._pointModel, this._filterModel);
    this._filterPresenter = new FilterPresenter(this._filterContainer, this._filterModel, this._pointModel);

    this._newButtonComponent.setClickHandler(this._mainMenuClickHandler);
    this._siteMenuComponent.setSiteMenuHandler(this._mainMenuClickHandler);
    render(this._siteMenuContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._newButtonContainer, this._newButtonComponent, RenderPosition.BEFOREEND);

    this._filterPresenter.init();
    this._waybillPresenter.init();
  }

  _mainMenuClickHandler(menuItem) {
    switch (menuItem) {
      case SITE_MENU.STATS:
        if (!this._siteMenuComponent.checkActiveState(SITE_MENU.STATS)) {
          this._filterPresenter.destroy();
          this._waybillPresenter.destroy();
          this._siteMenuComponent.setActiveState(SITE_MENU.STATS);
          this._siteMenuComponent.removeActiveState(SITE_MENU.TABLE);
          this._statsComponent = new StatsView(this._pointModel);
          render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
        }
        break;
      case SITE_MENU.TABLE:
        if (!this._siteMenuComponent.checkActiveState(SITE_MENU.TABLE)) {
          remove(this._statsComponent);
          this._filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
          this._waybillPresenter.destroy();
          this._waybillPresenter.init();
          this._filterPresenter.init();
          this._siteMenuComponent.setActiveState(SITE_MENU.TABLE);
          this._siteMenuComponent.removeActiveState(SITE_MENU.STATS);
        }
        break;
      case SITE_MENU.NEW:
        remove(this._statsComponent);
        this._waybillPresenter.createNewWaypoint();
        this._newButtonComponent.setDisabled(true);
        this._siteMenuComponent.removeActiveState(SITE_MENU.STATS);
        if (!this._siteMenuComponent.checkActiveState(SITE_MENU.TABLE)) {
          this._siteMenuComponent.setActiveState(SITE_MENU.TABLE);
        }
    }
  }
}
