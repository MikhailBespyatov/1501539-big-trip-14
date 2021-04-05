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
