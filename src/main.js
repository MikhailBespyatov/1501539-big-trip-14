import RouteView from './view/route.js';
import RouteAndConstContainerView from './view/route-and-cost-container.js';
import { render, RenderPosition } from './util/render.js';
import { waypoints } from './mock/generate-waypoint.js';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import CostPresenter from './presenter/cost.js';
import MainMenuPresenter from './presenter/main-menu.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteHeaderConteiner = siteHeaderElement.querySelector('.trip-main');
const siteMainEventsElement = document.querySelector('.trip-events');
const siteHeaderFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pageBodyContainer = document.querySelector('.page-body__page-main  .page-body__container');

const filterModel = new FilterModel();
const pointModel = new PointsModel();
pointModel.setPoints(waypoints);


const siteHeaderRouteAndCostElement = new RouteAndConstContainerView().getElement();
const costPresenter = new CostPresenter(siteHeaderRouteAndCostElement, pointModel, filterModel);
const mainMenuPresenter = new MainMenuPresenter(siteHeaderFiltersElement, siteMainEventsElement, siteHeaderMenuElement,
  pageBodyContainer, siteHeaderConteiner, pointModel, filterModel);

render(siteHeaderConteiner, siteHeaderRouteAndCostElement, RenderPosition.AFTERBEGIN);
render(siteHeaderRouteAndCostElement, new RouteView(), RenderPosition.BEFOREEND);

costPresenter.init();
mainMenuPresenter.init();
