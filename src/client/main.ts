import App from '@/client/App.vue';
import Vue from 'vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue( {
	router,
	store,
	render: ( h ) => h( App ),
} ).$mount( '#app' );