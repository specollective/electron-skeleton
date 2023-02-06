import fetch from 'electron-fetch';

export async function httpGet(url, options) {
  return fetch(url, {
    ...options,
    method: 'GET',
  });
}