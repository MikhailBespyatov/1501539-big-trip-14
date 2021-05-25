import FilterView from '../view/filter.js';
import { remove, render, RenderPosition } from '../util/render.js';
import { UPDATE_TYPE } from '../constant.js';

export default class Filter {
  constructor(filterContainer, pointModel, filterModel) {
    this._filterContainer = filterContainer;
    this._filterComponent = null;
    this._filterModel = filterModel;
    this._pointModel = pointModel;

    this._handleFilterModel = this._handleFilterModel.bind(this);
    this._filterTypeCheckHandler = this._filterTypeCheckHandler.bind(this);
  }

  init() {
    this._filterModel.addObserver(this._handleFilterModel);
    this._pointModel.addObserver(this._handleFilterModel);
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(this._filterModel.getFilter());

    this._filterComponent.setFilterTypeCheckHandler(this._filterTypeCheckHandler);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
    remove(prevFilterComponent);
  }

  _handleFilterModel() {
    this.init();
  }

  _filterTypeCheckHandler(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  }

  destroy() {
    this._filterModel.removeObserver(this._handleFilterModel);
    this._pointModel.removeObserver(this._handleFilterModel);
    remove(this._filterComponent);
    this._filterComponent = null;
  }
}
