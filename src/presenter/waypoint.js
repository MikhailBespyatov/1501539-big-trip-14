import EditFormView from '../view/edit-form.js';
import WaypointView from '../view/waypoint.js';
import { render, RenderPosition, replace, remove } from '../util/render.js';
import { types, cities } from '../mock/generate-waypoint.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Waypoint {
  constructor(waypointContainer, changeData, changeMode) {
    this._waypointContainer = waypointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._waypointComponent = null;
    this._waypointEditComponent = null;

    this._mode = Mode.DEFAULT;

    this._waypointRollupClickHandler = this._waypointRollupClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editRollupClickHandler = this._editRollupClickHandler.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;
    this._types = types;
    this._cities = cities;

    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointEditComponent = this._waypointEditComponent;

    this._waypointComponent = new WaypointView(waypoint);
    this._waypointEditComponent = new EditFormView(waypoint, this._types, this._cities);

    this._waypointComponent.setRollupClickHandler(this._waypointRollupClickHandler);
    this._waypointEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._waypointEditComponent.setRollupClickHandler(this._editRollupClickHandler);
    this._waypointComponent.setFavoriteClick(this._favoriteClickHandler);

    if (prevWaypointComponent === null || prevWaypointEditComponent === null) {
      render(this._waypointContainer, this._waypointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._waypointComponent, prevWaypointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._waypointEditComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);
  }

  destroy() {
    remove(this._waypointComponent);
    remove(this._waypointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToItem();
    }
  }

  _replaceItemToEdit() {
    replace(this._waypointEditComponent, this._waypointComponent);
    document.addEventListener('keydown', this._onEscKeydown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditToItem() {
    replace(this._waypointComponent, this._waypointEditComponent);
    document.removeEventListener('keydown', this._onEscKeydown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeydown(evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this._waypointEditComponent.reset(this._waypoint);
      this._replaceEditToItem();
      document.removeEventListener('keydown', this._onEscKeydown);
    }
  }

  _waypointRollupClickHandler() {
    this._replaceItemToEdit();
  }

  _formSubmitHandler(waypoint) {
    this._changeData(waypoint);
    this._replaceEditToItem();
  }

  _editRollupClickHandler() {
    this._waypointEditComponent.reset(this._waypoint);
    this._replaceEditToItem();
  }

  _favoriteClickHandler() {
    this._changeData({ ...this._waypoint, isFavorite: !this._waypoint.isFavorite });
  }
}
