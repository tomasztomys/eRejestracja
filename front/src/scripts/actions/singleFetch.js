import AppConfig from '../AppConfig';

function FetchError(response) {
  this.name = 'Fetch error';
  this.message = response;
}
FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;

export function singleFetchWithError(url, initFetch) {
  let status = '';

  return fetch(AppConfig.apiUrl + url, initFetch)
    .then((response) => {
      status = response.status;
      if (response.status < 200 || response.status >= 300) {
        console.warn(response.status, response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      let data = {
        data: response,
        status: status
      };

      return data;
    });
}

export function singleFetch(url, initFetch) {
  return singleFetchWithError(url, initFetch);
}
