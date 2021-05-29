import { render, RenderPosition, remove } from '../util/render.js';
import { SiteMenu, UpdateType, FilterType } from '../constant.js';
import FilterPresenter from './filter.js';
import WaybillPresenter from './waybill.js';
import SiteMenuView from '../view/site-menu.js';
import NewButtonView from '../view/new-button.js';
import StatsView from '../view/stats.js';

export default class MainMenu {
  constructor(filterContainer, waybillContainer, siteMenuContainer, statsContainer,
    newButtonContainer, pointModel, filterModel, offersModel, destinationsModel, api) {
    this._filterContainer = filterContainer;
    this._waybillContainer = waybillContainer;
    this._siteMenuContainer = siteMenuContainer;
    this._statsContainer = statsContainer;
    this._newButtonContainer = newButtonContainer;
    this._api = api;

    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._filterPresenter = null;
    this._waybillPresenter = null;

    this._newButtonComponent = new NewButtonView();
    this._siteMenuComponent = new SiteMenuView();
    this._statsComponent = null;

    this._pointModelAction = this._pointModelAction.bind(this);

    this._mainMenuClickHandler = this._mainMenuClickHandler.bind(this);
  }

  init() {
    this._waybillPresenter = new WaybillPresenter(this._waybillContainer, this._pointModel, this._filterModel,
      this._offersModel, this._destinationsModel, this._api);
    this._filterPresenter = new FilterPresenter(this._filterContainer, this._pointModel, this._filterModel);

    this._newButtonComponent.setClickHandler(this._mainMenuClickHandler);
    this._siteMenuComponent.setSiteMenuHandler(this._mainMenuClickHandler);
    render(this._siteMenuContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._newButtonContainer, this._newButtonComponent, RenderPosition.BEFOREEND);

    this.setNewButtonDisabledMode(true);
    this._filterPresenter.init();
    this._waybillPresenter.init();
  }

  _pointModelAction() {
    this.init();
  }

  _mainMenuClickHandler(menuItem) {
    switch (menuItem) {
      case SiteMenu.STATS:
        if (!this._siteMenuComponent.checkActiveState(SiteMenu.STATS)) {
          this._waybillPresenter.destroy();
          this._filterPresenter.destroy();
          this._siteMenuComponent.setActiveState(SiteMenu.STATS);
          this._siteMenuComponent.removeActiveState(SiteMenu.TABLE);
          this._statsComponent = new StatsView(this._pointModel);
          render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
        }
        break;
      case SiteMenu.TABLE:
        if (!this._siteMenuComponent.checkActiveState(SiteMenu.TABLE)) {
          remove(this._statsComponent);
          this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
          this._waybillPresenter.destroy();
          this._waybillPresenter.init();
          this._siteMenuComponent.setActiveState(SiteMenu.TABLE);
          this._siteMenuComponent.removeActiveState(SiteMenu.STATS);
        }
        break;
      case SiteMenu.NEW:
        if (!this._siteMenuComponent.checkActiveState(SiteMenu.TABLE)) {
          this._siteMenuComponent.removeActiveState(SiteMenu.STATS);
          remove(this._statsComponent);
          this._siteMenuComponent.setActiveState(SiteMenu.TABLE);
        }
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        this._waybillPresenter.createNewWaypoint();
        this._newButtonComponent.setDisabled(true);
    }
  }

  setNewButtonDisabledMode(boolean) {
    this._newButtonComponent.setDisabled(boolean);
  }
}
