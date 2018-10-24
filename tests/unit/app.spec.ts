import App from '@/client/App.vue';
import { mount } from '@vue/test-utils';

describe( 'App.vue', () => {

	const wrapper = mount( App, {
		stubs: [ 'router-link', 'router-view' ],
	} );

	it( 'contains the main navigation', () => {
		expect( wrapper.find( '#nav' ).exists() );
	} );

} );
