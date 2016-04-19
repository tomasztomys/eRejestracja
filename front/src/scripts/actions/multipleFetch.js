import AppConfig from '../AppConfig';
function checkResponseError (responses) {
  for (var response of responses) {
    if (response.status < 200 || response.status >= 300) {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}

export function multipleFetch(urls, initFetch) {

  return Promise.all(
    urls.map(url => {
      return fetch(AppConfig.apiUrl + url, initFetch);
    })
  )
  .then(response => {
    return Promise.resolve(response);
  })
  .then( response => {
    checkResponseError(response);
    return response;
  })
  .then(response => Promise.all(response.map(
    function(data) {
      return data.json();
    }
  )))
  .catch(error =>{ console.error(error.message) });
}