import PointModel from '../model/point.js';

import randomId from 'random-id';

const getSyncedPoints = (items) => {
  return items.filter(({ success }) => success)
    .map(({ payload }) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const createOffersStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.type]: current,
    });
  }, {});
};

const createDestinationStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.name]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {

    if (Provider._isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointModel.adaptToServer));
          this._store.setPoints(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getPoints());
    return Promise.resolve(storePoints.map(PointModel.adaptToClient));
  }

  getOffers() {

    if (Provider._isOnline()) {
      return this._api.getOffers().then((offers) => {
        this._store.setOffers(createOffersStoreStructure(offers));
        return offers;
      });
    }

    const storeOffers = Object.values(this._store.getOffers());
    return Promise.resolve(storeOffers);
  }

  getDestinations() {

    if (Provider._isOnline()) {
      return this._api.getDestinations().then((destinations) => {
        this._store.setDestinations(createDestinationStoreStructure(destinations));
        return destinations;
      });
    }

    const storedDestinations = Object.values(this._store.getDestinations());
    return Promise.resolve(storedDestinations);
  }

  updatePoint(point) {
    if (Provider._isOnline()) {
      return this._api.updatePoint(point).then((updatedPoint) => {
        this._store.setPoint(updatedPoint.id, PointModel.adaptToServer(updatedPoint));
        return updatedPoint;
      });
    }

    this._store.setPoint(point.id, PointModel.adaptToServer(Object.assign({}, point)));
    return Promise.resolve(point);
  }

  addPoint(point) {
    if (Provider._isOnline()) {
      return this._api.addPoint(point).then((newPoint) => {
        this._store.setPoint(newPoint.id, PointModel.adaptToServer(newPoint));
        return newPoint;
      });
    }

    const localNewPointId = randomId();
    const localNewPoint = Object.assign({}, point, { id: localNewPointId });

    this._store.setPoint(localNewPoint.id, PointModel.adaptToServer(localNewPoint));
    return Promise.resolve(localNewPoint);
  }

  deletePoint(point) {
    if (Provider._isOnline()) {
      return this._api.deletePoint(point).then(() => this._store.removePoint(point.id));
    }

    this._store.removePoint(point.id);
    return Promise.resolve();
  }

  sync() {
    if (Provider._isOnline()) {
      const storePoints = Object.values(this._store.getPoints());

      return this._api.sync(storePoints).then((response) => {
        const createdPoints = getSyncedPoints(response.created);
        const updatedPoints = getSyncedPoints(response.updated);
        const items = createStoreStructure([...createdPoints, ...updatedPoints]);

        this._store.setPoints(items);
        return Object.values(items);
      })
        .then((points) => points.map(PointModel.adaptToClient));
    }

    return Promise.reject(new Error('Sync data failed'));
  }

  static _isOnline() {
    return window.navigator.onLine;
  }
}
