import App from '@/client/App.vue';
import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import Icons from './components/Icons.vue';
import VueProgressBarConfig from './configs/vue-progressbar';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.component( 'icons', Icons );

Vue.use( VueProgressBar, VueProgressBarConfig );

export default new Vue( {
	router,
	store,
	render: ( h ) => h( App ),
} ).$mount( '#app' );
