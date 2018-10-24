<template lang="html">
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<div class="error" v-if="hasError">
			<p class="error-message">Unable to get posts.</p>
			<p><button @click="loadPosts" type="button">Try again?</button></p>
		</div>
		<div class="loading" v-if="isLoading">
			<p>Loading posts</p>
			<img alt="Vue logo" src="../assets/loading.svg" />
		</div>
		<post-feed v-if="! hasError && ! isLoading" :posts="getPosts" />
	</div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, namespace } from 'vuex-class';
import PostFeed from '../components/PostFeed.vue';
import { SinglePost } from '../types';

@Component( {
	components: {
		'post-feed': PostFeed,
	},
} )
export default class Home extends Vue {

	// Global State
	@Action( 'setError' ) private setError;
	@Action( 'setLoading' ) private setLoading;
	@Getter( 'hasError' ) private hasError;
	@Getter( 'isLoading' ) private isLoading;

	// Post State
	@Action( 'fetchPosts', { namespace: 'PostStore' } ) private fetchPosts;
	@Getter( 'getPosts', { namespace: 'PostStore' } ) private getPosts;

	private created(): void {
		if ( 0 === this.getPosts.length ) {
			this.loadPosts();
		} else {
			// Update posts quietly in the background
			this.fetchPosts();
		}
	}

	private async loadPosts(): Promise<AxiosResponse> {
		console.info( 'Loading posts...' );
		this.showLoading();
		try {
			const response = await this.fetchPosts();
			if ( 200 === response.status ) {
				this.showPosts();
				return response;
			}
			console.warn( 'Received an unknown response:', response );
			this.showError();
			return response;
		} catch ( error ) {
			console.error( 'Loading posts failed', error );
			this.showError();
			return error;
		}
	}

	private showError(): void {
		console.info( 'Showing error screen...' );
		this.setError( true );
		this.setLoading( false );
	}

	private showLoading(): void {
		console.info( 'Showing loading screen...' );
		this.setError( false );
		this.setLoading( true );
	}

	private showPosts(): void {
		console.info( 'Showing posts...' );
		this.setError( false );
		this.setLoading( false );
	}

	@Watch( 'getPosts', { immediate: false, deep: true } )
	private onPostsChanged( posts: SinglePost[], oldPosts: SinglePost[] ): void {
		if ( 0 < this.getPosts.length ) {
			console.debug( 'Generating post feed with:', this.getPosts );
		} else {
			console.debug( 'No posts to show', this.getPosts );
		}
	}
}
</script>
