import MainEventListView from '../view/main-event-list.js';
import SortView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import WaypointPresenter from './waypoint.js';
import { updateItem } from '../util/common.js';
import { sortDateDown, sortDateUp, sortPriceUp, sortPriceDown, sortTimeUp, sortTimeDown } from '../util/common.js';
import { render, RenderPosition } from '../util/render.js';

export default class Waybill {
  constructor(waybillContainer) {
    this._waybillContainer = waybillContainer;
    this._waypointPresenter = {};

    this._sortDateFlag = false;
    this._sortPriceFlag = false;
    this._sortTimeFlag = false;

    this._sortComponent = new SortView;
    this._mainEventListComponent = new MainEventListView();
    this._noWaypointComponent = new NoWaypointView();
    this._waypointChangeHandler = this._waypointChangeHandler.bind(this);
    this._waypointModeHandler = this._waypointModeHandler.bind(this);
    this._sortByDayHandler = this._sortByDayHandler.bind(this);
    this._sortByPriceHandler = this._sortByPriceHandler.bind(this);
    this._sortByTimeHandler = this._sortByTimeHandler.bind(this);
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();
    this._renderWaybill();
  }

  _sortingCondition(sortFlag, sortUpCallback, sortDownCallback) {
    switch (sortFlag) {
      case true:
        this._waypoints.sort(sortUpCallback);
        break;
      case false:
        this._waypoints.sort(sortDownCallback);
        break;
    }
  }

  _sortByDayHandler() {
    this._sortDateFlag = !this._sortDateFlag;
    this._sortingCondition(this._sortDateFlag, sortDateUp, sortDateDown);
    this._clearWaypoinstList();
    this._renderWaypointsList();
  }

  _sortByPriceHandler() {
    this._sortPriceFlag = !this._sortPriceFlag;
    this._sortingCondition(this._sortPriceFlag, sortPriceUp, sortPriceDown);
    this._clearWaypoinstList();
    this._renderWaypointsList();
  }

  _sortByTimeHandler() {
    this._sortTimeFlag = !this._sortTimeFlag;
    this._sortingCondition(this._sortTimeFlag, sortTimeUp, sortTimeDown);
    this._clearWaypoinstList();
    this._renderWaypointsList();
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
    this._sortComponent.setSortByDayHandler(this._sortByDayHandler);
    this._sortComponent.setSortByPriceHandler(this._sortByPriceHandler);
    this._sortComponent.setSortByTimeHandler(this._sortByTimeHandler);
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
