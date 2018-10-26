import NewsFeed from '@/client/components/NewsFeed.vue';
import Home from '@/client/views/Home.vue';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';

describe( 'Home.vue', () => {

	it( 'contains the posts wrapper', () => {
		const store = new Store( {
			getters: {
				'hasErrors': false,
				'isLoading': false,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeedStore: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.contains( NewsFeed ) ).toBe( true );
	} );
} );
