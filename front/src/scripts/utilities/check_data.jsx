const checkData = (values, errors, errorsMessages) => {
  let outErrors = {};
  let status = true;

  for (let key in values) {
    if (values[key] === null || values[key].length > 0) {
      outErrors[key] = '';
    }
    else {
      outErrors[key] = errorsMessages[key];
      status = false;
    }
  }

  return {
    errorsResponse: outErrors,
    status
  };
};

export default checkData;

