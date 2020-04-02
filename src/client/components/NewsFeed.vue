<template lang="html">
	<transition name="fade" mode="out-in">
		<div class="news-feed">
			<div class="error" v-if="showError">
				<p class="error-message">{{ getAjaxMessage }}</p>
				<p><button @click="loadPosts" type="button">Load posts</button></p>
			</div>
			<div class="loading" v-if="showLoading">
				<p>Loading posts</p>
				<svg class="anim anim-loading"><use xlink:href="#anim-loading" /></svg>
			</div>
			<transition-group class="posts" name="list-fade" mode="out" tag="div" v-if="showPosts">
				<article class="single-post" v-for="post in getPosts" v-bind:key="post.id">
					<h2 class="post-title" v-html="post.title"></h2>
					<div class="post-meta">
						<small class="post-date">
							<span class="date-label">Published:</span>
							<time class="date" :datetime="post.createdAt">
								<span class="date-value date-value__date">{{ postDate(post.createdAt) }}</span>
								<span class="date-separator" aria-hidden="true">@</span>
								<span class="date-value date-value__time">{{ postTime(post.createdAt) }}</span>
							</time>
							<a class="delete-post" href="#" @click="deleteSinglePost(post.id)">Delete</a>
						</small>
					</div>
					<div class="post-body" v-html="post.body"></div>
				</article>
			</transition-group>
			<div v-if="showNoPosts">
				<p class="no-posts">
					No posts found. Create the <router-link to="admin">first one</router-link>?
				</p>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { feedTimeout } from '../configs/timeouts';
import { AjaxState, SinglePost, UIState } from '../types';

@Component
export default class NewsFeed extends Vue {
	@Action('deletePost', { namespace: 'NewsFeedStore' }) private deletePost;
	@Action('fetchPosts', { namespace: 'NewsFeedStore' }) private fetchPosts;

	@Getter('getAjaxStatus', { namespace: 'NewsFeedStore' }) private getAjaxStatus;
	@Getter('getAjaxMessage', { namespace: 'NewsFeedStore' }) private getAjaxMessage;
	@Getter('getPosts', { namespace: 'NewsFeedStore' }) private getPosts;

	private uiState: UIState = UIState.LOADING;

	private created(): void {
		console.info('News Feed loaded');

		// Show loading screen
		if (0 === this.getPosts.length) {
			this.uiState = UIState.LOADING;
			this.loadPosts();

			// Update posts quietly in the background
		} else {
			this.fetchPosts();
		}
	}

	private async deleteSinglePost(postId: string) {
		console.info('Attempting to delete post:', postId);
		try {
			const response = await this.deletePost(postId);
			switch (response.status) {
				case 200:
					this.$notify({
						group: 'post-deleted',
						title: 'Success',
						text: 'Post successfully deleted.'
					});
					break;
				case 404:
					this.$notify({
						group: 'ajax-error',
						title: 'Error',
						text: 'Post not found.'
					});
					break;
			}
			// Refresh feed
			this.fetchPosts();
			return response;
		} catch (error) {
			console.error('Something went wrong while trying to delete a post:', error);
			return error;
		}
	}

	private async loadPosts(): Promise<AxiosResponse> {
		console.info('Loading posts...');
		this.uiState = UIState.LOADING;
		try {
			const response = await this.fetchPosts();
			return response;
		} catch (error) {
			console.error('Something went wrong while fetching posts:', error);
			return error;
		}
	}

	private postDate(dateString: string): string {
		return dateString.substr(0, 10);
	}

	private postTime(dateString: string): string {
		return dateString.substr(11, 5);
	}

	get showError(): boolean {
		return this.uiState === UIState.ERROR;
	}

	get showLoading(): boolean {
		return this.uiState === UIState.LOADING;
	}

	get showNoPosts(): boolean {
		return this.uiState === UIState.READY && 0 === this.getPosts.length;
	}

	get showPosts(): boolean {
		return this.uiState === UIState.READY && 0 < this.getPosts.length;
	}

	@Watch('getAjaxStatus', { immediate: false, deep: false })
	private onAjaxStatusChanged(newStatus: AjaxState): void {
		switch (newStatus) {
			case AjaxState.ERROR:
				console.info('Showing error screen...');
				setTimeout(() => {
					this.uiState = UIState.ERROR;
				}, feedTimeout);
				break;
			default:
				console.info('Showing posts...');
				setTimeout(() => {
					this.uiState = UIState.READY;
				}, feedTimeout);
				break;
		}
	}

	@Watch('getPosts', { immediate: false, deep: true })
	private onGetPostsChanged(newPosts: SinglePost[]): void {
		if (0 < newPosts.length) {
			console.debug('Generating news feed with:', newPosts);
		} else {
			console.debug('No posts to show', newPosts);
		}
	}
}
</script>

<style scoped lang="scss">
.anim-loading {
	height: 4em;
	width: 4em;
}

.date-label {
	display: inline-block;
	margin-right: 0.25em;
}

.date-separator {
	display: inline-block;
	margin: 0 0.25em;
}

.delete-post {
	&::before {
		content: '|';
		display: inline-block;
		margin: 0 0.5em;
	}
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
