import AbstractView from './abstract.js';

const createMainEventListTemplate = () => {
  return `<ul class="trip-events__list">
  </ul>`;
};

export default class MainEventList extends AbstractView {
  getTemplate() {
    return createMainEventListTemplate();
  }
}
