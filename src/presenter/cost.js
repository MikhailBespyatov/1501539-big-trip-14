import CostView from '../view/cost.js';
import { remove, render, RenderPosition } from '../util/render.js';
import { filter } from '../util/filter.js';

export default class Cost {
  constructor(container, pointModel, filterModel) {
    this._costContainer = container;
    this._costComponent = null;
    this._pointModel = pointModel;
    this._filterModel = filterModel;

    this._handleCostModel = this._handleCostModel.bind(this);

    this._filterModel.addObserver(this._handleCostModel);
    this._pointModel.addObserver(this._handleCostModel);
  }

  init() {
    const filteredType = this._filterModel.getFilter();
    const points = this._pointModel.getPoints();
    const filteredPoints = filter[filteredType](points);
    const prevCostComponent = this._costComponent;
    this._costComponent = new CostView(filteredPoints);

    if (prevCostComponent === 0) {
      render(this._costContainer, this._costComponent, RenderPosition.BEFOREEND);
      return;
    }

    remove(prevCostComponent);
    render(this._costContainer, this._costComponent, RenderPosition.BEFOREEND);
  }

  _handleCostModel() {
    this.init();
  }
}
