import MainEventListView from './view/main-event-list.js';
import SiteMenuView from './view/site-menu.js';
import RouteView from './view/route.js';
import CostView from './view/cost.js';
import FiltersView from './view/filter.js';
import SortView from './view/sort.js';
import NoWaypointView from './view/no-waypoint.js';
import EditFormView from './view/edit-form.js';
import ListItemView from './view/waypoint.js';
import RouteAndConstContainerView from './view/route-and-cost-container.js';
import { render, RenderPosition, replace } from './util/render.js';
import { waypoints, offersTotalCost } from './mock/generate-waypoint.js';

const renderWaypoint = (container, datalist) => {
  const waypointComponent = new ListItemView(datalist);
  const waypointEditComponent = new EditFormView(datalist);

  const replaceItemToEdit = () => {
    replace(waypointEditComponent, waypointComponent);
  };

  const replaceEditToItem = () => {
    replace(waypointComponent, waypointEditComponent);
  };

  const onEscKeydown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      replaceEditToItem();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  waypointComponent.setRollupClickHandler(() => {
    replaceItemToEdit();
    document.addEventListener('keydown', onEscKeydown);
  });

  waypointEditComponent.setFormSubmitHandler(() => {
    replaceEditToItem();
    document.removeEventListener('keydown', onEscKeydown);
  });

  waypointEditComponent.setRollupClickHandler(() => {
    replaceEditToItem();
    document.removeEventListener('keydown', onEscKeydown);
  });

  render(container, waypointComponent, RenderPosition.BEFOREEND);
};


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

const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');

render(siteMainEventsElement, new SortView(), RenderPosition.BEFOREEND);

const siteMainEventList = new MainEventListView().getElement();

render(siteMainEventsElement, siteMainEventList, RenderPosition.BEFOREEND);

if (waypoints.length === 0) {
  siteMainElement.innerHTML = '';
  render(siteMainElement, new NoWaypointView(), RenderPosition.BEFOREEND);
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
