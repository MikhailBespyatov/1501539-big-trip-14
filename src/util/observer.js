export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers.filter((existObserver) => existObserver !== observer);
  }

  _notify(event, playload) {
    this._observers.forEach((observer) => observer(event, playload));
  }
}
