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
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.contains( NewsFeed ) ).toBe( true );
	} );

	it( 'does not contain the posts wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': true,
				'isLoading': false,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.contains( NewsFeed ) ).toBe( false );
	} );

	it( 'does not contain the posts wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': false,
				'isLoading': true,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.contains( NewsFeed ) ).toBe( false );
	} );

	it( 'does not contain the posts wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': true,
				'isLoading': true,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.contains( NewsFeed ) ).toBe( false );
	} );

	it( 'contains the error wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': true,
				'isLoading': false,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.find( '.error' ).exists() ).toBe( true );
	} );

	it( 'does not contain the error wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': false,
				'isLoading': false,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.find( '.error' ).exists() ).toBe( false );
	} );

	it( 'does not contain the error wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': false,
				'isLoading': true,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.find( '.error' ).exists() ).toBe( false );
	} );

	it( 'does not contain the error wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': true,
				'isLoading': true,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.find( '.error' ).exists() ).toBe( false );
	} );

	it( 'contains the loading wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': false,
				'isLoading': true,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.find( '.loading' ).exists() ).toBe( true );
	} );

	it( 'does not contain the loading wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': false,
				'isLoading': false,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.find( '.loading' ).exists() ).toBe( false );
	} );

	it( 'does not contain the loading wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': true,
				'isLoading': false,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.find( '.loading' ).exists() ).toBe( false );
	} );

	it( 'does not contain the loading wrapper', () => {
		const store = new Store( {
			getters: {
				'hasError': true,
				'isLoading': true,
				'NewsFeedStore/getPosts': [],
			},
			state: {
				NewsFeed: {},
			},
		} );
		const mocks = { $store: store };
		const wrapper = shallowMount( Home, { mocks } );
		expect( wrapper.find( '.loading' ).exists() ).toBe( false );
	} );
} );
