export const sumBasePrice = (array) => {
  let sum = 0;
  array.map((element) => {
    sum = sum + element.basePrice;
  });
  return sum;
};

export const sumArray = (array) => {
  let sum = 0;
  array.map((element) => {
    sum = sum + element;
  });
  return sum;
};

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getRandomArray = (array) => {
  const newArray = [];
  array.forEach((element) => {
    if (getRandomInteger(0, 1) === 1) {
      newArray.push(element);
    }
  });
  return newArray;
};

export const getRandomItem = (array) => array[getRandomInteger(0, array.length - 1)];

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIndex = (array) => {
  return getRandomInteger(0, array.length - 1);
};

export const msToTime = (duration) => {
  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;

  return hours + ':' + minutes;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const sortDateUp = (a, b) => {
  const dateA = new Date(a.dateItem);
  const dateB = new Date(b.dateItem);
  return dateA - dateB;
};

export const sortDateDown = (a, b) => {
  const dateA = new Date(a.dateItem);
  const dateB = new Date(b.dateItem);
  return dateB - dateA;
};

export const sortPriceUp = (a, b) => {
  return a.basePrice - b.basePrice;
};

export const sortPriceDown = (a, b) => {
  return b.basePrice - a.basePrice;
};

export const sortTimeUp = (a, b) => {
  return a.diffTime - b.diffTime;
};

export const sortTimeDown = (a, b) => {
  return b.diffTime - a.diffTime;
};
