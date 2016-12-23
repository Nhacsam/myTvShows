
let accessToken =  null;
let DEV = true;
const apiUrl = 'http://0.0.0.0:3000/api';

const checkStatus = (response) => {
  if (DEV) console.log(response);
  if (200 <= response.status && 300 > response.status) {
    return response;
  }
  return response.json()
    .then((data) => {
      const error = new Error(response.statusText);
      error.response = data;
      throw error;
    });
};

export const callApi = (url, method = 'GET', payload = null, headers = {}) => {
  headers = {
    'Content-Type': 'application/json',
    'Authorisation': accessToken ? `Bearer ${accessToken}` : '',
    ...headers,
  };

  if (DEV) {
    console.log(`Calling ${method} ${apiUrl}${url} with payload: `, payload, 'and headers ', headers);
  }

  return fetch(`${apiUrl}${url}`, {
    method,
    headers,
    body: payload ? JSON.stringify(payload) : null,
  })
    .then(checkStatus)
    .then((response) => response.json())
    .catch((e) => {
      if (DEV) console.log('Error: ', e.response);
      throw e;
    })
    .then((data) => {
      if (DEV) console.log('Result: ', data);
      return data;
    });
};

export const register = (user) => {
  return callApi('/Users', 'POST', user);
};
