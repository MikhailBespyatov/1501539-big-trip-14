import MainEventListView from '../view/main-event-list.js';
import SortView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import WaypointPresenter from './waypoint.js';
import { updateItem } from '../util/common.js';
import { render, RenderPosition } from '../util/render.js';

export default class Waybill {
  constructor(waybillContainer) {
    this._waybillContainer = waybillContainer;
    this._waypointPresenter = {};

    this._sortComponent = new SortView;
    this._mainEventListComponent = new MainEventListView();
    this._noWaypointComponent = new NoWaypointView();
    this._waypointChangeHandler = this._waypointChangeHandler.bind(this);
    this._waypointModeHandler = this._waypointModeHandler.bind(this);
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();
    this._renderWaybill();
  }

  _waypointChangeHandler(updatedWaypoint) {
    this._waypoints = updateItem(this._waypoints, updatedWaypoint);
    this._waypointPresenter[updatedWaypoint.id].init(updatedWaypoint);
  }

  _waypointModeHandler() {
    Object.values(this._waypointPresenter).forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._waybillContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMainEventList() {
    render(this._waybillContainer, this._mainEventListComponent, RenderPosition.BEFOREEND);
  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._mainEventListComponent, this._waypointChangeHandler, this._waypointModeHandler);
    waypointPresenter.init(waypoint);
    this._waypointPresenter[waypoint.id] = waypointPresenter;
  }

  _renderWaypointsList() {
    this._waypoints.map((waypoint) => this._renderWaypoint(waypoint));
  }

  _renderNoWaypoint() {
    render(this._waybillContainer, this._noWaypointComponent, RenderPosition.BEFOREEND);
  }

  _clearWaypoinstList() {
    Object.values(this._waypointPresenter).forEach((presenter) => presenter.destroy());
    this._waypointPresenter = {};
  }

  _renderWaybill() {
    if (this._waypoints.length === 0) {
      this._renderNoWaypoint();
    } else {
      this._renderSort();
      this._renderMainEventList();
      this._renderWaypointsList();
    }
  }
}
