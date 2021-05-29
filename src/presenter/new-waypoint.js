import EditFormView from '../view/edit-form.js';
import { render, RenderPosition, remove } from '../util/render.js';
import { UserAction, UpdateType } from '../constant.js';


export default class NewWaypoint {
  constructor(container, changeData, filterModel, types, cities) {
    this._container = container,
    this._changeData = changeData,
    this._waypointEditComponent = null;
    this._types = types.getOffers();
    this._cities = cities.getDestinations();
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
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { ...update });
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

  _handleNewAction() {
    this.destroy();
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

  setSaving() {
    this._waypointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setError() {
    const resetFormState = () => {
      this._waypointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._waypointEditComponent.shake(resetFormState);
  }
}
