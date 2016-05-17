import AppConfig from '../AppConfig';
function checkResponseError(responses, status) {

  for (let response of responses) {
    status.push(response.status);
    if (response.status < 200 || response.status >= 300) {
      console.warn(response.status, response.statusText);
    }
  }
  return status;
}

export function multipleFetch(urls, initFetch) {
  let status = [];
  return Promise.all(
    urls.map(url => {
      return fetch(AppConfig.apiUrl + url, initFetch);
    })
  )
  .then((response) => {
    return Promise.resolve(response);
  })
  .then((response) => {
    status = checkResponseError(response, status);
    return response;
  })
  .then((response) => Promise.all(response.map(
    (data) => {
      return data.json();
    }
  )))
  .then((response) => {
    let data = {
      data: response,
      status: status
    };

    return data;
  });
}