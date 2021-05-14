import EditFormView from '../view/edit-form.js';
import { render, RenderPosition, remove } from '../util/render.js';
import { nanoid } from 'nanoid';
import { USER_ACTION, UPDATE_TYPE } from '../mock/constant.js';
import { types, cities } from '../mock/generate-waypoint.js';


export default class NewWaypoint {
  constructor(container, changeData, filterModel) {
    this._container = container,
    this._changeData = changeData,
    this._waypointEditComponent = null;
    this._types = types;
    this._cities = cities;
    this._filterModel = filterModel;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._canselClickHandler = this._canselClickHandler.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._handleNewAction = this._handleNewAction.bind(this);

    this._filterModel.addObserver(this._handleNewAction);
  }

  init() {
    if (this._waypointEditComponent !== null) {
      return;
    }

    this._waypointEditComponent = new EditFormView(this._types, this._cities);
    this._waypointEditComponent.setCanselDeleteClickHandler(this._canselClickHandler);
    this._waypointEditComponent.setFormSubmitHandler(this._formSubmitHandler);

    render(this._container, this._waypointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._onEscKeydown);
  }

  _formSubmitHandler(update) {
    this._changeData(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MINOR,
      { ...update, id: nanoid() });
    this.destroy();
  }

  _canselClickHandler() {
    this.destroy();
  }

  _editRollupClickHandler() {
    this.destroy();
  }

  _onEscKeydown(evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  }

  destroy() {
    if (this._waypointEditComponent === null) {
      return;
    }
    remove(this._waypointEditComponent);
    this._waypointEditComponent = null;
    document.removeEventListener('keydown', this._onEscKeydown);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  _handleNewAction() {
    this.destroy();
  }
}
