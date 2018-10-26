<template lang="html">
	<transition name="fade" mode="out-in">
		<div class="news-feed">
			<div class="error" v-if="showError">
				<p class="error-message">Unable to get posts.</p>
				<p><button @click="loadPosts" type="button">Try again?</button></p>
			</div>
			<div class="loading" v-if="showLoading">
				<p>Loading posts</p>
				<img alt="Vue logo" src="../assets/loading.svg" />
			</div>
			<div class="posts" v-for="( post, postIndex ) in getPosts" v-if="showPosts">
				<article class="single-post">
					<h2 class="post-title" v-html="post.title"></h2>
					<div class="post-meta">
						<small class="post-date">
							<span class="date-label">Published:</span>
							<time class="date" :datetime="post.createdAt">
								<span class="date-value date-value__date">{{ postDate( post.createdAt ) }}</span>
								<span class="date-separator" aria-hidden="true">@</span>
								<span class="date-value date-value__time">{{ postTime( post.createdAt ) }}</span>
							</time>
						</small>
					</div>
					<div class="post-body" v-html="post.body"></div>
				</article>
			</div>
			<div v-else>
				<p>No posts found.</p>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, namespace } from 'vuex-class';
import PostConstructor from '../constructors/PostConstructor';
import { AjaxState, SinglePost } from '../types';

@Component( { } )
export default class NewsFeed extends Vue {

	@Action( 'fetchPosts',   { namespace: 'NewsFeedStore' } ) private fetchPosts;
	@Action( 'setAjaxState', { namespace: 'NewsFeedStore' } ) private setAjaxState;
	@Action( 'setPosts',     { namespace: 'NewsFeedStore' } ) private setPosts;

	@Getter( 'getAjaxState', { namespace: 'NewsFeedStore' } ) private getAjaxState;
	@Getter( 'getPosts',     { namespace: 'NewsFeedStore' } ) private getPosts;

	private created(): void {
		console.info( 'News Feed loaded' );

		// Show loading screen
		if ( 0 === this.getPosts.length ) {
			this.loadPosts();

		// Update posts quietly in the background
		// if theya re already in the state
		} else {
			this.fetchPosts();
		}
	}

	private async loadPosts(): Promise<AxiosResponse> {
		console.info( 'Loading posts...' );
		this.setAjaxState( AjaxState.LOADING );
		try {
			const response = await this.fetchPosts();
			if ( 200 === response.status ) {
				const { data } = response;
				console.debug( 'Received posts ✅', data );
				// Convert JSON objects to SinglePosts
				const convertedPosts: SinglePost[] = data.map( post => {
					return new PostConstructor( post );
				} );
				this.setPosts( convertedPosts );
				this.setAjaxState( AjaxState.SUCCESS );
				return response;
			}
			console.warn( 'Received an unknown response:', response );
			this.setAjaxState( AjaxState.ERROR );
			return response;
		} catch ( error ) {
			console.error( 'Something went wrong while fetching posts:', error );
			this.setAjaxState( AjaxState.ERROR );
			return error;
		}
	}

	private postDate( dateString: string ): string {
		return dateString.substr( 0, 10 );
	}

	private postTime( dateString: string ): string {
		return dateString.substr( 11, 5 );
	}

	get showError(): boolean {
		return this.getAjaxState === AjaxState.ERROR && this.getAjaxState !== AjaxState.LOADING;
	}

	get showLoading(): boolean {
		return this.getAjaxState !== AjaxState.ERROR && this.getAjaxState === AjaxState.LOADING;
	}

	get showPosts(): boolean {
		return this.getAjaxState !== AjaxState.ERROR && this.getAjaxState !== AjaxState.LOADING;
	}

	@Watch( 'getAjaxState', { immediate: false, deep: false } )
	private onAjaxStateChanged( newStatus: AjaxState, oldStatus: AjaxState ): void {
		switch ( oldStatus ) {
			case AjaxState.ERROR:
				console.log( 'Hiding error secreen...' );
				break;
			case AjaxState.LOADING:
				console.log( 'Hiding loading secreen...' );
				break;
			default:
				console.log( 'Hiding posts...' );
				break;
		}

		switch ( newStatus ) {
			case AjaxState.ERROR:
				console.log( 'Showing error secreen...' );
				break;
			case AjaxState.LOADING:
				console.log( 'Showing loading secreen...' );
				break;
			default:
				console.log( 'Showing posts...' );
				break;
		}
	}

	@Watch( 'getPosts', { immediate: false, deep: true } )
	private onPostsChanged( newPosts: SinglePost[], oldPosts: SinglePost[] ): void {
		if ( 0 < newPosts.length ) {
			console.debug( 'Generating post feed with:', newPosts );
		} else {
			console.debug( 'No posts to show', newPosts );
		}
	}
}
</script>

<style scoped lang="scss">
@import url( '../scss/animations.scss' );

.date-label {
	display: inline-block;
	margin-right: 0.25em;
}

.date-separator {
	display: inline-block;
	margin: 0 0.25em;
}

.news-feed {
	margin: 0 auto;
	max-width: 60em;
	width: 85%;
}

.post-meta {
	padding: 0.5em;
}

.post-title {
	margin: 0;
}

.single-post {
	border-top: 1px solid #ccc;
	padding-top: 1.5em;
	margin-top: 1.5em;
}
</style>
