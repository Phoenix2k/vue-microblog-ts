import PostForm from '@/client/components/PostForm.vue';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';

describe( 'PostForm.vue', () => {

	const store = new Store( {
		getters: {
			'notificationDuration': 2000,
			'PostFormStore/getAjaxMessage': '',
			'PostFormStore/getBody': '',
			'PostFormStore/getTitle': '',
		},
		state: {
			PostFormStore: { },
		},
	} );

	it( 'contains the post form', () => {
		const mocks = { $store: store };
		const wrapper = shallowMount( PostForm, { mocks } );
		wrapper.setComputed( { getAjaxMessage: () => [] } );
		expect( wrapper.contains( 'form[name="post-form"]' ) ).toBe( true );
	} );
} );
