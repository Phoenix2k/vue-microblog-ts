import axios from 'axios';
import App from '../main';

export const AxiosConfig = {
  apiUrl: '/api',
  baseURL: process.env.BASE_URL
};

const AxiosInstance = axios.create(AxiosConfig);

AxiosInstance.interceptors.request.use((config) => {
  App.$Progress.start();
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    App.$Progress.finish();
    return response;
  },
  (error) => {
    App.$Progress.fail();
    return error;
  }
);

export default AxiosInstance;
