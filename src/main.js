import RouteAndConstContainerView from './view/route-and-cost-container.js';
import { render, RenderPosition } from './util/render.js';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import CostPresenter from './presenter/cost.js';
import MainMenuPresenter from './presenter/main-menu.js';
import Api from './api/api.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import FilterPresenter from './presenter/filter.js';
import { UPDATE_TYPE } from './constant.js';
import RoutePresenter from './presenter/route.js';
import Provider from './api/provider.js';
import Store from './api/store.js';

const AUTHORIZATION = 'Basic jaksdja1sdkaj';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const STORE_PREFIX = 'big-trip-localstorage';
const STORE_VER = 'N1';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const store = new Store(STORE_NAME, window.localStorage);
const apiBase = new Api(END_POINT, AUTHORIZATION);
const api = new Provider(apiBase, store);


const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteHeaderConteiner = siteHeaderElement.querySelector('.trip-main');
const siteMainEventsElement = document.querySelector('.trip-events');
const siteHeaderFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pageBodyContainer = document.querySelector('.page-body__page-main  .page-body__container');


const pointModel = new PointsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const siteHeaderRouteAndCostElement = new RouteAndConstContainerView().getElement();

render(siteHeaderConteiner, siteHeaderRouteAndCostElement, RenderPosition.AFTERBEGIN);

const costPresenter = new CostPresenter(siteHeaderRouteAndCostElement, pointModel, filterModel);
const routePresenter = new RoutePresenter(siteHeaderRouteAndCostElement, pointModel, filterModel);
const mainMenuPresenter = new MainMenuPresenter(siteHeaderFiltersElement, siteMainEventsElement, siteHeaderMenuElement,
  pageBodyContainer, siteHeaderConteiner, pointModel, filterModel, offersModel, destinationsModel, api);
const filterPresenter = new FilterPresenter(siteHeaderFiltersElement, pointModel, filterModel);

routePresenter.init();
costPresenter.init();
mainMenuPresenter.init();

Promise.all([
  api.getPoints(),
  api.getDestinations(),
  api.getOffers(),
]).then((values) => {
  const [points, destinations, offers] = values;
  destinationsModel.setDestinations(destinations);
  offersModel.setOffers(offers);
  pointModel.setPoints(UPDATE_TYPE.INIT, points);

  filterPresenter.init();
  mainMenuPresenter.setNewButtonDisabledMode(false);
});

window.addEventListener('load', () => {
  navigator.serviceWorker.register('sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  api.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
