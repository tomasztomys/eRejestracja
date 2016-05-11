import AppConfig from '../AppConfig';
import {singleFetch, singleFetchWithError} from './singleFetch';
import {multipleFetch} from './multipleFetch';

function getInitFetch(method, body, token = '') {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const initFetch = {
    method,
    headers,
    mode: 'cors',
  };

  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    initFetch.body = body;
  }

  return initFetch;
}

export function fetchData(url, method = 'GET', body = {  }, token = AppConfig.apiToken) {
  const initFetch = getInitFetch(method, body, token);

  if (Array.isArray(url)) {
    return multipleFetch(url, initFetch);
  }

  return singleFetch(url, initFetch);
}

export function fetchDataWithError(url, method = 'GET', body = {}, token = AppConfig.apiToken) {
  const initFetch = getInitFetch(method, body, token);

  if (Array.isArray(url)) {
    return multipleFetch(url, initFetch);
  }

  return singleFetchWithError(url, initFetch);
}
