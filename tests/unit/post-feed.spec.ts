import PostFeed from '@/client/components/NewsFeed.vue';
import { SinglePost } from '@/client/types';
import { shallowMount, TransitionStub } from '@vue/test-utils';

describe( 'PostFeed.vue', () => {

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

	const wrapper = shallowMount( PostFeed, {
		propsData: {
			dateSeparator: '-',
			posts,
		},
		stubs: {
			transition: TransitionStub,
		},
	} );

	it( 'should have two elements', () => {
		expect( wrapper.findAll( '.post' ).length ).toBe( 2 );
	} );

	it( 'date separator should be customizable', () => {
		expect( wrapper.find( '.post:first-child .date-separator' ).text() ).not.toBe( '@' );
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

} );
