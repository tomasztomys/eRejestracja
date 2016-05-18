const mergeObjects = (...objects) => {
  let obj = {};

  objects.forEach((src) => {
    Object.keys(src).forEach((key) => {
      obj[key] = src[key];
    });
  });
  return obj;
};

export default mergeObjects;

