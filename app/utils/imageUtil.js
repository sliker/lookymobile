export const createUniqueName = () => {
  const date = new Date();

  return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
};

export const getRandomNumber = () => {
  return Math.floor(Math.random() * (500 - 1) + 1);
};

export const createFolderId = () => {
  return createUniqueName() + '_' + getRandomNumber();
};
