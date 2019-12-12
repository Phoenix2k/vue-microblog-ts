import NewsFeed from '@/client/components/NewsFeed.vue';
import { feedTimeout } from '@/client/configs/timeouts';
import { SinglePost, UIState } from '@/client/types';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';

describe( 'NewsFeed.vue', () => {

	const posts: SinglePost[] = [
		{
			body: '<p>Some body text</p>',
			createdAt: '2018-01-01T00:00:00.000Z',
			id: '1',
			title: 'Post 1',
		},
		{
			body: '<p>Some body text</p>',
			createdAt: '2018-12-24T22:00:00.000Z',
			id: '2',
			title: 'Post 2',
		},
	];

	const store = new Store( {
		getters: {
			'NewsFeedStore/getAjaxStatus': '',
			'NewsFeedStore/getAjaxMessage': '',
			'NewsFeedStore/getPosts': () => posts,
		},
		state: {
			NewsFeedStore: {
				posts,
			},
		},
	} );

	const mocks = { $store: store };

	it( 'should contain the news feed wrapper', () => {
		const wrapper = shallowMount( NewsFeed, { mocks } );
		expect( wrapper.find( '.news-feed' ).exists() ).toBe( true );
	} );

	it( 'should contain the loading message', () => {
		const wrapper = shallowMount( NewsFeed, { mocks } );
		expect( wrapper.find( '.loading' ).exists() ).toBe( true );
	} );

	it( 'should not contain the loading message', () => {
		const wrapper = shallowMount( NewsFeed, { mocks, computed: {
			showLoading() { return false; },
		} } );
		expect( wrapper.find( '.loading' ).exists() ).toBe( false );
	} );

	it( 'should contain an error message', () => {
		const wrapper = shallowMount( NewsFeed, { mocks, computed: {
			showError() { return true; },
		} } );
		expect( wrapper.find( '.error' ).exists() ).toBe( true );
	} );

	it( 'should contain the posts wrapper', () => {
		const wrapper = shallowMount( NewsFeed, { mocks, computed: {
			getPosts() { return []; },
		} } );
		wrapper.setData( { uiState: UIState.READY } );
		setTimeout( () => {
			expect( wrapper.find( '.no-posts' ).exists() ).toBe( true );
		}, feedTimeout );
	} );

/**
 * @todo Refactor old tests to work with new state structure
 */
/*
	it( 'posts should contain two elements', () => {
		const mocks = { $store: store };
		const wrapper = mount( NewsFeed, { mocks } );
		wrapper.setData( { uiState: UIState.READY } );
		wrapper.setComputed( { getPosts: posts } );
		expect( wrapper.findAll( '.post' ).length ).toBe( 2 );
	} );

	it( 'should have two elements', () => {
		expect( wrapper.findAll( '.post' ).length ).toBe( 2 );
	} );

	it( 'title of first element matches', () => {
		expect( wrapper.find( '.post:first-child .post-title' ).html() ).toMatch( posts[0].title );
	} );

	it( 'body of the first element matches', () => {
		expect( wrapper.find( '.post:first-child .post-body' ).html() ).toMatch( posts[0].body );
	} );

	it( 'date of the first element matches yyyy-mm-dd', () => {
		expect( wrapper.find( '.post:first-child .date-value__date' ).text() ).toMatch( '2018-01-01' );
	} );

	it( 'time of the first element matches hh:mm', () => {
		expect( wrapper.find( '.post:first-child .date-value__time' ).text() ).toMatch( '00:00' );
	} );

	it( 'title of second element matches', () => {
		expect( wrapper.find( '.post:last-child .post-title' ).html() ).toMatch( posts[1].title );
	} );

	it( 'body of the second element matches', () => {
		expect( wrapper.find( '.post:last-child .post-body' ).html() ).toMatch( posts[1].body );
	} );

	it( 'date of the second element matches yyyy-mm-dd', () => {
		expect( wrapper.find( '.post:last-child .date-value__date' ).text() ).toMatch( '2018-12-24' );
	} );

	it( 'time of the second element matches hh:mm', () => {
		expect( wrapper.find( '.post:last-child .date-value__time' ).text() ).toMatch( '22:00' );
	} );
*/
} );
