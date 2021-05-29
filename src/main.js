import RouteAndConstContainerView from './view/route-and-cost-container.js';
import { render, RenderPosition } from './util/render.js';
import PointModel from './model/point.js';
import FilterModel from './model/filter.js';
import CostPresenter from './presenter/cost.js';
import MainMenuPresenter from './presenter/main-menu.js';
import Api from './api/api.js';
import OffersModel from './model/offer.js';
import DestinationModel from './model/destination.js';
import { UpdateType } from './constant.js';
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
const siteHeaderContainerElement = siteHeaderElement.querySelector('.trip-main');
const siteMainEventsElement = document.querySelector('.trip-events');
const siteHeaderFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pageBodyContainerElement = document.querySelector('.page-body__page-main  .page-body__container');


const pointModel = new PointModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationModel();

const siteHeaderRouteAndCostElement = new RouteAndConstContainerView().getElement();

render(siteHeaderContainerElement, siteHeaderRouteAndCostElement, RenderPosition.AFTERBEGIN);

const costPresenter = new CostPresenter(siteHeaderRouteAndCostElement, pointModel, filterModel);
const routePresenter = new RoutePresenter(siteHeaderRouteAndCostElement, pointModel, filterModel);
const mainMenuPresenter = new MainMenuPresenter(siteHeaderFiltersElement, siteMainEventsElement, siteHeaderMenuElement,
  pageBodyContainerElement, siteHeaderContainerElement, pointModel, filterModel, offersModel, destinationsModel, api);

costPresenter.init();
routePresenter.init();
mainMenuPresenter.init();

Promise.all([
  api.getPoints(),
  api.getDestinations(),
  api.getOffers(),
]).then((values) => {
  const [points, destinations, offers] = values;
  destinationsModel.setDestinations(destinations);
  offersModel.setOffers(offers);
  pointModel.setPoints(UpdateType.INIT, points);

  mainMenuPresenter.setNewButtonDisabledMode(false);
}).catch(() => {
  pointModel.setPoints(UpdateType.INIT, []);
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
