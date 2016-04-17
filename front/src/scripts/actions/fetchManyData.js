import AppConfig from '../AppConfig';

export function fetchManyData(dispatch, action, urls, method = 'GET', body = {}, token) {

  token = token || AppConfig.apiToken;
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', 'Cityglobe ' + token);

  var initFetch = {
    method: method,
    headers: headers,
    mode: 'cors'
  };
  
  if(method === 'POST') initFetch.body = body;

  function checkResponseError (responses) {
    for (var response of responses) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  }

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
  .then(function(data){
     dispatch(action(data));
  })
  .catch(error =>{ console.error(error.message) });
}
