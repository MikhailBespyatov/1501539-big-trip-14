import AbstractView from './abstract.js';

const createNoPointTemplate = () => {
  return `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <p class="trip-events__msg">Click New Event to create your first point</p>
  </section>`;
};

export default class NoPoint extends AbstractView {
  getTemplate() {
    return createNoPointTemplate();
  }
}
