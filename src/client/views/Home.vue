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
		<post-feed v-if="hasPosts" :posts="posts" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import PostFeed from '../components/PostFeed.vue';
import PostService from '../services/PostService';
import { SinglePost } from '../types';

@Component( {
	components: {
		'post-feed': PostFeed,
	},
} )
export default class Home extends Vue {

	private error: boolean = false;
	private loading: boolean = true;
	private posts: SinglePost[] = [];

	get hasError(): boolean {
		return this.error && ! this.loading;
	}

	get hasPosts(): boolean {
		return ! this.error && ! this.loading;
	}

	get isLoading(): boolean {
		return ! this.error && this.loading;
	}

	private async created() {
		this.loadPosts();
	}

	private async loadPosts() {
		this.error = false;
		this.loading = true;
		try {
			this.posts = await PostService.getPosts();
			setTimeout( () => {
				this.loading = false;
			}, 500 );
		} catch ( error ) {
			console.error( error );
			this.showError();
		}
	}

	private showError() {
		this.loading = false;
		this.error = true;
	}

	@Watch( 'posts', { immediate: false, deep: true } )
	private onPostsChanged( posts: SinglePost[], oldPosts: SinglePost[] ) {
		if ( 0 < this.posts.length ) {
			console.debug( 'Generating post feed with:', this.posts );
		} else {
			console.debug( 'No posts to show', this.posts );
		}
	}
}
</script>
