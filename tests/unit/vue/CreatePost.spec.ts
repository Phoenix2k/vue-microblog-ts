import CreatePost from '@/client/components/CreatePost.vue';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';

describe( 'CreatePost.vue', () => {

	const store = new Store( {
		getters: {
			'CreatePostStore/getAjaxMessage': '',
			'CreatePostStore/getBody': '',
			'CreatePostStore/getTitle': '',
			'notificationDuration': 2000,
		},
		state: {
			CreatePostStore: { },
		},
	} );

	it( 'contains the form to create new posts', () => {
		const mocks = { $store: store };
		const wrapper = shallowMount( CreatePost, { mocks } );
		wrapper.setComputed( { getAjaxMessage: () => [] } );
		expect( wrapper.contains( 'form[name="create-post"]' ) ).toBe( true );
	} );
} );
