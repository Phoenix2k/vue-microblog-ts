import Admin from '@/client/views/Admin.vue';
import { mount, shallowMount } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';

describe( 'Admin.vue', () => {

	it( 'contains the right title', () => {
		const wrapper = shallowMount( Admin );
		expect( wrapper.find( 'h1' ).text() ).toBe( 'Admin' );
	} );

	it( 'contains the post form wrapper', () => {
		const store = new Store( {
			getters: {
				'PostFormStore/getAjaxMessage': '',
				'PostFormStore/getBody': '',
				'PostFormStore/getTitle': '',
			},
			state: {
				PostFormStore: { },
			},
		} );
		const mocks = { $store: store };
		const wrapper = mount( Admin, { mocks } );
		expect( wrapper.contains( '.post-wrapper' ) ).toBe( true );
	} );

} );
