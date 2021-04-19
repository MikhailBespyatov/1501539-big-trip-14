import WaybillPresenter from './presenter/waybill.js';
import SiteMenuView from './view/site-menu.js';
import RouteView from './view/route.js';
import CostView from './view/cost.js';
import FiltersView from './view/filter.js';
import RouteAndConstContainerView from './view/route-and-cost-container.js';
import { render, RenderPosition } from './util/render.js';
import { waypoints, offersTotalCost } from './mock/generate-waypoint.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');

render(siteHeaderMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const siteHeaderConteiner = siteHeaderElement.querySelector('.trip-main');
const siteHeaderRouteAndCostElement = new RouteAndConstContainerView().getElement();

render(siteHeaderConteiner, siteHeaderRouteAndCostElement, RenderPosition.AFTERBEGIN);
render(siteHeaderRouteAndCostElement, new RouteView(), RenderPosition.BEFOREEND);
render(siteHeaderRouteAndCostElement, new CostView(waypoints, offersTotalCost), RenderPosition.BEFOREEND);

const siteHeaderFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(siteHeaderFiltersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const siteMainEventsElement = document.querySelector('.trip-events');

const waybillPresenter = new WaybillPresenter(siteMainEventsElement);

waybillPresenter.init(waypoints);

/*const futureButton = document.querySelector('#filter-future');
const pastButton = document.querySelector('#filter-past');
const everythingButton = document.querySelector('#filter-everything');

futureButton.addEventListener('click', () => {
  siteMainEventList.innerHTML = '';
  waypoints.slice(0)
    .filter((waypoint) => waypoint.isFuture)
    .map((element) => renderWaypoint(siteMainEventList, element));
});

pastButton.addEventListener('click', () => {
  siteMainEventList.innerHTML = '';
  waypoints.slice(0)
    .filter((waypoint) => waypoint.isPast)
    .map((element) => renderWaypoint(siteMainEventList, element));
});

everythingButton.addEventListener('click', () => {
  siteMainEventList.innerHTML = '';
  waypoints.slice(0)
    .map((element) => renderWaypoint(siteMainEventList, element));
});*/
