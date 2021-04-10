import EditFormView from '../view/edit-form.js';
import ListItemView from '../view/waypoint.js';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIndex = (array) => {
  return getRandomInteger(0, array.length -1);
};

export const getRandomItem = (array) => array[getRandomInteger(0, array.length - 1)];

export const getRandomArray = (array) => {
  const newArray = [];
  array.forEach((element) => {
    if (getRandomInteger(0, 1) === 1) {
      newArray.push(element);
    }
  });
  return newArray;
};

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const sumBasePrice = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum = sum + array[i].basePrice;
  }
  return sum;
};

export const sumArray = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum = sum + array[i];
  }
  return sum;
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderWaypoint = (container, datalist) => {
  const waypointComponent = new ListItemView(datalist);
  const waypointEditComponent = new EditFormView(datalist);

  const replaceItemToEdit = () => {
    container.replaceChild(waypointEditComponent.getElement(), waypointComponent.getElement());
  };

  const replaceEditToItem = () => {
    container.replaceChild(waypointComponent.getElement(), waypointEditComponent.getElement());
  };

  waypointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceItemToEdit();
  });

  waypointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToItem();
  });

  waypointEditComponent.getElement().querySelector('.event__reset-btn').addEventListener('click', () => {
    replaceEditToItem();
  });

  render(container, waypointComponent.getElement(), RenderPosition.BEFOREEND);
};


export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};
