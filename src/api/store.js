const Key = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

export default class Store {
  constructor(key, storage) {
    this._storeKey = key;
    this._storage = storage;
  }

  getPoints() {
    return this._getItems()[Key.POINTS];
  }

  getOffers() {
    return this._getItems()[Key.OFFERS];
  }

  getDestinations() {
    return this._getItems()[Key.DESTINATIONS];
  }

  setPoint(id, point) {
    const storedPoints = this.getPoints();

    this.setPoints(Object.assign({}, storedPoints, {
      [id]: point,
    }));
  }

  removePoint(id) {
    const storedPoints = this.getPoints();

    delete storedPoints[id];

    this.setPoints(storedPoints);
  }

  setPoints(points) {
    this._setItem(Key.POINTS, points);
  }

  setOffers(offers) {
    this._setItem(Key.OFFERS, offers);
  }

  setDestinations(destinations) {
    this._setItem(Key.DESTINATIONS, destinations);
  }

  _setItem(key, value) {
    const store = this._getItems();

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(
        Object.assign(
          {},
          store,
          {
            [key]: value,
          }),
      ),
    );
  }

  _getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }
}
