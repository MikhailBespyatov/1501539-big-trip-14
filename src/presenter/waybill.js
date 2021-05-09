import MainEventListView from '../view/main-event-list.js';
import SortView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import WaypointPresenter from './waypoint.js';
import NewWaypointPresenter from './new-waypoint.js';
import { sortDateUp, sortPriceUp, sortTimeUp } from '../util/common.js';
import { render, RenderPosition, remove } from '../util/render.js';
import { SORT_TYPE, USER_ACTION, UPDATE_TYPE, FILTER_TYPE } from '../mock/constant.js';
import { filter } from '../util/filter.js';

export default class Waybill {
  constructor(waybillContainer, pointModel, filterModel) {
    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._waybillContainer = waybillContainer;
    this._waypointPresenter = {};

    this._currentSortType = SORT_TYPE.DAY;

    this._sortComponent = null;
    this._mainEventListComponent = new MainEventListView();
    this._noWaypointComponent = new NoWaypointView();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._waypointModeHandler = this._waypointModeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._newWaypointPresenter = new NewWaypointPresenter(this._mainEventListComponent, this._handleViewAction, this._filterModel);
  }

  init() {
    this._renderWaybill();
  }

  createNewWaypoint() {
    this._currentSortType = SORT_TYPE.PRICE;
    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    this._newWaypointPresenter.init();
  }

  _handleViewAction(actionType, updateType, update) {
    this._newWaypointPresenter.destroy();
    switch(actionType) {
      case USER_ACTION.UPDATE_POINT:
        this._pointModel.updatePoint(updateType, update);
        break;
      case USER_ACTION.ADD_POINT:
        this._pointModel.addPoint(updateType, update);
        break;
      case USER_ACTION.DELETE_POINT:
        this._pointModel.deletePoint(updateType, update);
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UPDATE_TYPE.PATCH:
        this._waypointPresenter[data.id].init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this._clearWaybill();
        this._renderWaybill();
        break;
      case UPDATE_TYPE.MAJOR:
        this._clearWaybill(true);
        this._renderWaybill();
        break;
    }
  }

  _getPoints() {
    const filteredType = this._filterModel.getFilter();
    const points = this._pointModel.getPoints();
    const filteredPoints = filter[filteredType](points);
    switch(this._currentSortType) {
      case SORT_TYPE.DAY:
        return  filteredPoints.sort(sortDateUp);
      case SORT_TYPE.TIME:
        return filteredPoints.sort(sortTimeUp);
      case SORT_TYPE.PRICE:
        return filteredPoints.sort(sortPriceUp);
    }

    return filteredPoints;
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType ) {
      return;
    }

    this._currentSortType = sortType;
    this._clearWaybill();
    this._newWaypointPresenter.destroy();
    this._renderWaybill();
  }

  _waypointModeHandler() {
    Object.values(this._waypointPresenter).forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);

    render(this._waybillContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMainEventList() {
    render(this._waybillContainer, this._mainEventListComponent, RenderPosition.BEFOREEND);
  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._mainEventListComponent, this._handleViewAction, this._waypointModeHandler);
    waypointPresenter.init(waypoint);
    this._waypointPresenter[waypoint.id] = waypointPresenter;
  }

  _renderWaypointsList() {
    this._getPoints().map((point) => this._renderWaypoint(point));
  }

  _renderNoWaypoint() {
    render(this._waybillContainer, this._noWaypointComponent, RenderPosition.BEFOREEND);
  }

  _clearWaybill(resetSortType = false) {
    Object.values(this._waypointPresenter).forEach((presenter) => presenter.destroy());
    this._waypointPresenter = {};
    remove(this._sortComponent);
    remove(this._noWaypointComponent);

    if (resetSortType) {
      this._currentSortType = SORT_TYPE.DAY;
    }
  }

  _renderWaybill() {
    if (this._getPoints().length === 0) {
      this._renderNoWaypoint();
    } else {
      this._renderMainEventList();
      this._renderSort();
      this._renderWaypointsList();
    }
  }
}
