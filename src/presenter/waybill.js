import MainEventListView from '../view/main-event-list.js';
import SortView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import WaypointPresenter from './waypoint.js';
import NewWaypointPresenter from './new-waypoint.js';
import { sortDateUp, sortPriceUp, sortTimeUp } from '../util/common.js';
import { render, RenderPosition, remove } from '../util/render.js';
import { SORT_TYPE, USER_ACTION, UPDATE_TYPE, STATE } from '../constant.js';
import { filter } from '../util/filter.js';
import LoadingView from '../view/loading.js';
import NewButtonView from '../view/new-button.js';


export default class Waybill {
  constructor(waybillContainer, pointModel, filterModel, offerModel, destinationModel, api) {
    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._waybillContainer = waybillContainer;
    this._waypointPresenter = {};
    this._newWaypointPresenter = null;
    this._isLoading = true;
    this._api = api;

    this._offerModel = offerModel;
    this._destinationModel = destinationModel;

    this._currentSortType = SORT_TYPE.DAY;

    this._sortComponent = null;
    this._mainEventListComponent = new MainEventListView();
    this._noWaypointComponent = new NoWaypointView();
    this._loadingComponent = new LoadingView();
    this._newButtonComponent = new NewButtonView();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._waypointModeHandler = this._waypointModeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderWaybill();
  }

  destroy() {
    if (this._newWaypointPresenter !== null) {
      this._newWaypointPresenter.destroy();
    }
    this._clearWaybill(true);
    remove(this._mainEventListComponent);
    this._pointModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createNewWaypoint() {
    this._newWaypointPresenter = new NewWaypointPresenter(this._mainEventListComponent,
      this._handleViewAction, this._filterModel, this._offerModel, this._destinationModel);
    this._newWaypointPresenter.init();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this._waypointPresenter[update.id].setViewState(STATE.SAVING);
        this._api.updatePoint(update).then((response) => {
          this._pointModel.updatePoint(updateType, response);
          this._waypointPresenter[update.id].resetView();
        }).catch(() => {
          this._waypointPresenter[update.id].setViewState(STATE.ERROR);
        });
        break;
      case USER_ACTION.ADD_POINT:
        this._newWaypointPresenter.setSaving();
        this._api.addPoint(update).then((response) => {
          this._pointModel.addPoint(updateType, response);
          this._newWaypointPresenter.destroy();
        }).catch(() => {
          this._newWaypointPresenter.setError();
        });
        break;
      case USER_ACTION.DELETE_POINT:
        this._waypointPresenter[update.id].setViewState(STATE.DELETING);
        this._api.deletePoint(update).then(() => {
          this._pointModel.deletePoint(updateType, update);
        }).catch(() => {
          this._waypointPresenter[update.id].setViewState(STATE.ERROR);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
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
      case UPDATE_TYPE.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._clearWaybill();
        this._renderWaybill();
        this._newButtonComponent.setDisabled(false);
        break;
    }
  }

  _getPoints() {
    const filteredType = this._filterModel.getFilter();
    const points = this._pointModel.getPoints();
    const filteredPoints = filter[filteredType](points);
    switch (this._currentSortType) {
      case SORT_TYPE.DAY:
        return filteredPoints.sort(sortDateUp);
      case SORT_TYPE.TIME:
        return filteredPoints.sort(sortTimeUp);
      case SORT_TYPE.PRICE:
        return filteredPoints.sort(sortPriceUp);
    }

    return filteredPoints;
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearWaybill();
    if (this._newWaypointPresenter !== null) {
      this._newWaypointPresenter.destroy();
    }
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
    const waypointPresenter = new WaypointPresenter(this._mainEventListComponent, this._handleViewAction, this._waypointModeHandler,
      this._offerModel, this._destinationModel);
    waypointPresenter.init(waypoint);
    this._waypointPresenter[waypoint.id] = waypointPresenter;
  }

  _renderWaypointsList() {
    this._getPoints().map((point) => this._renderWaypoint(point));
  }

  _renderNoWaypoint() {
    render(this._waybillContainer, this._noWaypointComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._waybillContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _clearWaybill(resetSortType = false) {
    Object.values(this._waypointPresenter).forEach((presenter) => presenter.destroy());
    this._waypointPresenter = {};
    remove(this._sortComponent);
    remove(this._noWaypointComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SORT_TYPE.DAY;
    }
  }

  _renderWaybill() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getPoints().length === 0) {
      this._renderMainEventList();
      this._renderNoWaypoint();
    } else {
      this._renderMainEventList();
      this._renderSort();
      this._renderWaypointsList();
    }
  }
}
