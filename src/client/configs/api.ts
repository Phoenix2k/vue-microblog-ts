import axios from 'axios';
import App from '../main';

const instance = axios.create( {
	baseURL: process.env.baseURL,
} );

instance.interceptors.request.use( config => {
	App.$Progress.start();
	return config;
} );

instance.interceptors.response.use( response => {
	App.$Progress.finish();
	return response;
}, error => {
	App.$Progress.fail();
	return error;
} );

export default instance;
