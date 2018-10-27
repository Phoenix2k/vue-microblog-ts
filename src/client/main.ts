import App from '@/client/App.vue';
import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import VueProgressBarConfig from './configs/vue-progressbar';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use( VueProgressBar, VueProgressBarConfig );

export default new Vue( {
	router,
	store,
	render: ( h ) => h( App ),
} ).$mount( '#app' );
