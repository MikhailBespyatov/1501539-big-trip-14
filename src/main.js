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

const pointModel = new PointsModel();
pointModel.setPoints(waypoints);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');

render(siteHeaderMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const siteHeaderConteiner = siteHeaderElement.querySelector('.trip-main');
const siteHeaderRouteAndCostElement = new RouteAndConstContainerView().getElement();

render(siteHeaderConteiner, siteHeaderRouteAndCostElement, RenderPosition.AFTERBEGIN);
render(siteHeaderRouteAndCostElement, new RouteView(), RenderPosition.BEFOREEND);


const siteHeaderFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(siteHeaderFiltersElement, filterModel, pointModel);
const siteMainEventsElement = document.querySelector('.trip-events');
const waybillPresenter = new WaybillPresenter(siteMainEventsElement, pointModel, filterModel);
const costPresenter = new CostPresenter(siteHeaderRouteAndCostElement, pointModel, filterModel);

document.querySelector('.trip-main__event-add-btn')
  .addEventListener('click', (evt) => {
    evt.preventDefault();
    waybillPresenter.createNewWaypoint();
  });

costPresenter.init();
filterPresenter.init();
waybillPresenter.init();
