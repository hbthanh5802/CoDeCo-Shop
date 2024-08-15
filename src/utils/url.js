import queryString from 'query-string';

export const serializeSearchParams = (params) => queryString.parse(params);

// result = 'success' | 'fail'
export const fakeApi = (result = 'success', time = 500) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (result === 'success') resolve('OK');
      else if (result === 'failed') reject('FAIL');
    }, time)
  );
