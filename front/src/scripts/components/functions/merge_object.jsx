let mergeObject = (obj, src) => {
  Object.keys(src).forEach((key) => {
    obj[key] = src[key];
  });
  return obj;
};

export default mergeObject;

