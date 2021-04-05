import { createSiteMenuTemplate } from './view/site-menu.js';
import { createRouteTemplate } from './view/route.js';
import { createFiltersTemplate } from './view/filter.js';
import { createSortTemplate } from './view/sort.js';
import { createEditFormTemplate } from './view/edit-form.js';
import { createListItemTemplate } from './view/waypoint.js';
import { createCostTemplate } from './view/cost.js';
import { waypoints } from './mock/generate-waypoint.js';


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');

render(siteHeaderMenuElement, createSiteMenuTemplate(), 'beforeend');

const siteHeaderControls = siteHeaderElement.querySelector('.trip-main__trip-controls');
const siteHeaderConteiner = siteHeaderElement.querySelector('.trip-main');
const siteHeaderRouteAndCostElement = document.createElement('section');
siteHeaderRouteAndCostElement.classList.add('trip-main__trip-info', 'trip-info');
siteHeaderConteiner.insertBefore(siteHeaderRouteAndCostElement, siteHeaderControls);

render(siteHeaderRouteAndCostElement, createRouteTemplate(), 'afterbegin');
render(siteHeaderRouteAndCostElement, createCostTemplate(), 'beforeend');

const siteHeaderFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(siteHeaderFiltersElement, createFiltersTemplate(), 'beforeend');

const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');

render(siteMainEventsElement, createSortTemplate(), 'beforeend');

const siteMainEventList = document.createElement('ul');
siteMainEventList.classList.add('trip-events__list');

siteMainEventsElement.appendChild(siteMainEventList);

render(siteMainEventList, createEditFormTemplate(waypoints[0]), 'afterbegin');

for (let i = 1; i < waypoints.length; i++) {
  render(siteMainEventList, createListItemTemplate(waypoints[i]), 'beforeend');
}
