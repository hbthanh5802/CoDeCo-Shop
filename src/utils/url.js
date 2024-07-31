import queryString from 'query-string';

export const serializeSearchParams = (params) => queryString.parse(params);
