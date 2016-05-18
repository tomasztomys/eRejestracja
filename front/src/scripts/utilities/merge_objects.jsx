const mergeObjects = (...objects) => {
  let obj = {};

  objects.forEach((src) => {
    Object.keys(src).forEach((key) => {
      obj[key] = src[key];
    });
  });
  console.log(obj);
  return obj;
};

export default mergeObjects;

