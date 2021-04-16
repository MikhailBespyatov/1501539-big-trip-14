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

export const calculateDifferenceInTime = (firstDate, secondDate) => {
  const getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);
  const different = (getDate(secondDate) - getDate(firstDate));
  let differentRes, hours, minuts;
  if(different > 0) {
    differentRes = different;
    hours = Math.floor((differentRes % 86400000) / 3600000);
    minuts = Math.round(((differentRes % 86400000) % 3600000) / 60000);
  } else {
    differentRes = Math.abs((getDate(firstDate) - getDate(secondDate)));
    hours = Math.floor(24 - (differentRes % 86400000) / 3600000);
    minuts = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
  }
  const result = hours + ':' + minuts;
  return result;
};
