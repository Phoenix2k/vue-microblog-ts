import PostFeed from '@/client/components/PostFeed.vue';
import Home from '@/client/views/Home.vue';
import { config, mount } from '@vue/test-utils';

config.logModifiedComponents = false;

describe( 'Home.vue', () => {

	const wrapper = mount( Home );

	it( 'contains the posts wrapper', () => {
		expect( wrapper.contains( PostFeed ) ).toBe( true );
	} );

} );
