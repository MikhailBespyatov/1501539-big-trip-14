import { remove, render, RenderPosition } from '../util/render.js';
import RouteView from '../view/route.js';
import { filter } from '../util/filter.js';
import { sortDateUp } from '../util/common.js';

export default class Route {
  constructor(container, pointModel, filterModel) {
    this._container = container;
    this._pointModel = pointModel;
    this._filterModel = filterModel;

    this._routeComponent = null;

    this._handleRouteModel = this._handleRouteModel.bind(this);

    this._filterModel.addObserver(this._handleRouteModel);
    this._pointModel.addObserver(this._handleRouteModel);
  }

  init() {
    const filteredType = this._filterModel.getFilter();
    const points = this._pointModel.getPoints();
    const filteredPoints = filter[filteredType](points).sort(sortDateUp);

    if (filteredPoints.length === 0) {
      return;
    }

    const prevRouteComponent = this._routeComponent;
    this._routeComponent = new RouteView(filteredPoints);

    if (prevRouteComponent === null) {
      render(this._container, this._routeComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    remove(prevRouteComponent);
    render(this._container, this._routeComponent, RenderPosition.AFTERBEGIN);
  }

  _handleRouteModel() {
    this.init();
  }

}
