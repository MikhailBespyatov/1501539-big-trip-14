import AbstractView from './abstract';

const createRouteAndCostContainerTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
  </section>`;
};

export default class RouteAndConstContainer extends AbstractView {
  getTemplate() {
    return createRouteAndCostContainerTemplate();
  }
}
