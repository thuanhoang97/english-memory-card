import axios, { AxiosError, AxiosPromise, AxiosResponse } from 'axios';

const ACCESS_KEY = 'HO5JgcTCFsOwPOq5Wqc_iLbt5xGWCzQTTwV4OwuiW54';
const requests = axios.create({
  baseURL: 'https://api.unsplash.com',
  timeout: 2000,
  headers: {
    'Accept-Version': 'v1',
    Accept: 'application/json',
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const searchImage = (keyword: string): AxiosPromise => {
  return requests
    .get('/search/photos', {
      params: {
        query: keyword,
        page: 1,
        per_page: 1,
      },
    })
    .then((res: AxiosResponse) => res.data.results[0])
    .catch((err: AxiosError) => {
      console.log('Search image error', err);
    });
};
