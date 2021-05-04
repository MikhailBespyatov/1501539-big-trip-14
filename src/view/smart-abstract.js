import AbstractView from './abstract';

export default class Smart extends AbstractView {
  restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  updateData(update, justUpdate) {
    if (!update) {
      return;
    }

    this._datalist = {...this._datalist, ...update};

    if (justUpdate) {
      return;
    }

    this.updateElement();
  }
}
