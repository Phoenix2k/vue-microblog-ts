import App from '@/client/App.vue';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';

describe( 'App.vue', () => {

	const store = new Store( {
		getters: {
			notificationDuration: 2000,
		},
	} );

	const mocks = { $store: store };

	it( 'contains the main navigation', () => {
		const wrapper = shallowMount( App, {
			mocks, stubs: [ 'router-link', 'router-view' ],
		} );
		expect( wrapper.find( '#nav' ).exists() );
	} );

} );
