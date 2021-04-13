import { waypoints, offersTotalCost } from './mock/generate-waypoint.js';
import SiteMenuView from './view/site-menu.js';
import RouteView from './view/route.js';
import CostView from './view/cost.js';
import FiltersView from './view/filter.js';
import SortView from './view/sort.js';
import NoWaypointView from './view/no-waypoint.js';
import EditFormView from './view/edit-form.js';
import ListItemView from './view/waypoint.js';
import { render, RenderPosition } from './mock/util.js';

const renderWaypoint = (container, datalist) => {
  const waypointComponent = new ListItemView(datalist);
  const waypointEditComponent = new EditFormView(datalist);

  const replaceItemToEdit = () => {
    container.replaceChild(waypointEditComponent.getElement(), waypointComponent.getElement());
  };

  const replaceEditToItem = () => {
    container.replaceChild(waypointComponent.getElement(), waypointEditComponent.getElement());
  };

  const onEscKeydown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      replaceEditToItem();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  waypointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceItemToEdit();
    document.addEventListener('keydown', onEscKeydown);
  });

  waypointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToItem();
    document.removeEventListener('keydown', onEscKeydown);
  });

  waypointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEditToItem();
    document.removeEventListener('keydown', onEscKeydown);
  });

  render(container, waypointComponent.getElement(), RenderPosition.BEFOREEND);
};


const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');

render(siteHeaderMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const siteHeaderControls = siteHeaderElement.querySelector('.trip-main__trip-controls');
const siteHeaderConteiner = siteHeaderElement.querySelector('.trip-main');
const siteHeaderRouteAndCostElement = document.createElement('section');
siteHeaderRouteAndCostElement.classList.add('trip-main__trip-info', 'trip-info');
siteHeaderConteiner.insertBefore(siteHeaderRouteAndCostElement, siteHeaderControls);

render(siteHeaderRouteAndCostElement, new RouteView().getElement(), RenderPosition.BEFOREEND);
render(siteHeaderRouteAndCostElement, new CostView(waypoints, offersTotalCost).getElement(), RenderPosition.BEFOREEND);

const siteHeaderFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(siteHeaderFiltersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');

render(siteMainEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const siteMainEventList = document.createElement('ul');
siteMainEventList.classList.add('trip-events__list');
siteMainEventsElement.appendChild(siteMainEventList);

if (waypoints.length === 0) {
  siteMainElement.innerHTML = '';
  render(siteMainElement, new NoWaypointView().getElement(), RenderPosition.BEFOREEND);
} else {
  waypoints.map((element) => renderWaypoint(siteMainEventList, element));
}

const futureButton = document.querySelector('#filter-future');
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
});
