<template lang="html">
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<post-feed :posts="posts" />
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import PostFeed from '../components/PostFeed.vue';
import { SinglePost } from '../types';

@Component( {
	components: {
		'post-feed': PostFeed,
	},
} )
export default class Home extends Vue {

	private posts: SinglePost[] = [];

	private created() {
		axios.get( '/api' ).then( response => {
			this.posts = response.data;
		} )
		.catch( ( error ) => {
			console.log( error );
		} );
	}
}
</script>
