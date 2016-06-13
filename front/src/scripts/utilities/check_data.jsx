const checkData = (values, errors, errorsMessages) => {
  let outErrors = {};
  let status = true;

  for (let key in values) {
    if (values[key].length > 0) {
      outErrors[key] = '';
    }
    else {
      outErrors[key] = errorsMessages[key];
      if (status) {
        status = false;
      }
    }
  }

  return {
    errorsResponse: outErrors,
    status
  };
};

const checkValidations = (validations, errors, errorsMessages) => {
  let outErrors = {};
  let status = true;

  for (let key in validations) {
    if (validations[key]) {
      outErrors[key] = '';
    }
    else {
      outErrors[key] = errorsMessages[key];
      if (status) {
        status = false;
      }
    }
  }

  return {
    errors: outErrors,
    status
  };
};


export {
  checkValidations,
  checkData
}

