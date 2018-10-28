import NewsFeed from '@/client/components/NewsFeed.vue';
import Home from '@/client/views/Home.vue';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';

describe( 'Home.vue', () => {

	const store = new Store( {
		getters: {
			notificationDuration: 2000,
		},
	} );

	const mocks = { $store: store };

	it( 'contains the posts wrapper', () => {
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.contains( NewsFeed ) ).toBe( true );
	} );
} );
