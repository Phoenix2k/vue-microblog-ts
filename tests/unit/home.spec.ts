import PostFeed from '@/client/components/PostFeed.vue';
import Home from '@/client/views/Home.vue';
import { config, mount } from '@vue/test-utils';

config.logModifiedComponents = false;

describe( 'Home.vue', () => {

	const wrapper = mount( Home );

	it( 'contains the posts wrapper', () => {
		wrapper.setData( { error: false, loading: false } );
		expect( wrapper.contains( PostFeed ) ).toBe( true );
	} );

	it( 'does not contain the posts wrapper', () => {
		wrapper.setData( { error: false, loading: true } );
		expect( wrapper.contains( PostFeed ) ).toBe( false );
	} );

	it( 'does not contain the posts wrapper', () => {
		wrapper.setData( { error: true, loading: false } );
		expect( wrapper.contains( PostFeed ) ).toBe( false );
	} );

	it( 'does not contain the error wrapper', () => {
		wrapper.setData( { error: true, loading: true } );
		expect( wrapper.find( '.error' ).exists() ).toBe( false );
	} );

	it( 'does not contain the error wrapper', () => {
		wrapper.setData( { error: false, loading: false } );
		expect( wrapper.find( '.error' ).exists() ).toBe( false );
	} );

	it( 'contains the error wrapper', () => {
		wrapper.setData( { error: true, loading: false } );
		expect( wrapper.find( '.error' ).exists() ).toBe( true );
	} );

	it( 'contains the loading wrapper', () => {
		wrapper.setData( { loading: true, error: false } );
		expect( wrapper.find( '.loading' ).exists() ).toBe( true );
	} );

	it( 'does not contain the loading wrapper', () => {
		wrapper.setData( { error: true, loading: true } );
		expect( wrapper.find( '.loading' ).exists() ).toBe( false );
	} );

	it( 'does not contain the loading wrapper', () => {
		wrapper.setData( { error: true, loading: false } );
		expect( wrapper.find( '.loading' ).exists() ).toBe( false );
	} );

} );
