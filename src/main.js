import WaybillPresenter from './presenter/waybill.js';
import SiteMenuView from './view/site-menu.js';
import RouteView from './view/route.js';
import RouteAndConstContainerView from './view/route-and-cost-container.js';
import { render, RenderPosition } from './util/render.js';
import { waypoints } from './mock/generate-waypoint.js';
import PointsModel from './model/point.js';
import FilterPresenter from './presenter/filter.js';
import FilterModel from './model/filter.js';
import CostPresenter from './presenter/cost.js';
import { SITE_MENU, UPDATE_TYPE, FILTER_TYPE } from './mock/constant.js';
import StatsView from './view/stats.js';

const pointModel = new PointsModel();
pointModel.setPoints(waypoints);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteMenuComponent = new SiteMenuView();

render(siteHeaderMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);

const siteHeaderConteiner = siteHeaderElement.querySelector('.trip-main');
const siteHeaderRouteAndCostElement = new RouteAndConstContainerView().getElement();

render(siteHeaderConteiner, siteHeaderRouteAndCostElement, RenderPosition.AFTERBEGIN);
render(siteHeaderRouteAndCostElement, new RouteView(), RenderPosition.BEFOREEND);


const siteHeaderFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(siteHeaderFiltersElement, filterModel, pointModel);
const siteMainEventsElement = document.querySelector('.trip-events');
const waybillPresenter = new WaybillPresenter(siteMainEventsElement, pointModel, filterModel);
const costPresenter = new CostPresenter(siteHeaderRouteAndCostElement, pointModel, filterModel);

const pageBodyContainer = document.querySelector('.page-body__page-main  .page-body__container');
const table = siteMenuComponent.getElement().querySelector(`[data-menu=${SITE_MENU.TABLE}]`);
const stats = siteMenuComponent.getElement().querySelector(`[data-menu=${SITE_MENU.STATS}]`);
const statsComponent = new StatsView(pointModel.getPoints());
statsComponent.getElement().style.paddingLeft = '80px';
render(pageBodyContainer, statsComponent, RenderPosition.BEFOREEND);

const siteMenuClickHandler = (menuItem) => {
  switch (menuItem) {
    case SITE_MENU.STATS:
      if (!stats.classList.contains('trip-tabs__btn--active')) {
        filterPresenter.destroy();
        waybillPresenter.destroy();
        stats.classList.add('trip-tabs__btn--active');
        table.classList.remove('trip-tabs__btn--active');
        newButton.disabled = false;
        statsComponent.getElement().classList.remove('visually-hidden');
      }
      break;
    case SITE_MENU.TABLE:
      if (!table.classList.contains('trip-tabs__btn--active')) {
        statsComponent.getElement().classList.add('visually-hidden');
        filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
        waybillPresenter.destroy();
        waybillPresenter.init();
        filterPresenter.init();
        table.classList.add('trip-tabs__btn--active');
        stats.classList.remove('trip-tabs__btn--active');
      }
      break;
  }
};

siteMenuComponent.setSiteMenuHandler(siteMenuClickHandler);

const newButton = document.querySelector('.trip-main__event-add-btn');

newButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  waybillPresenter.createNewWaypoint();
  newButton.disabled = true;
  stats.classList.remove('trip-tabs__btn--active');
  if (!table.classList.contains('trip-tabs__btn--active')) {
    table.classList.add('trip-tabs__btn--active');
  }
});

costPresenter.init();
filterPresenter.init();
waybillPresenter.init();
