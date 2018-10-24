<template lang="html">
	<transition name="fade" mode="out-in">
		<div class="posts">
			<div class="post" v-for="( post, postIndex ) in posts" v-if="hasPosts">
				<h2 class="post-title" v-html="post.title"></h2>
				<div class="post-meta">
					<small class="post-date">
						<span class="date-label">Published:</span>
						<time class="date" :datetime="post.createdAt">
							<span class="date-value date-value__date">{{ postDate( post.createdAt ) }}</span>
							<span class="date-separator" aria-hidden="true">{{ dateSeparator }}</span>
							<span class="date-value date-value__time">{{ postTime( post.createdAt ) }}</span>
						</time>
					</small>
				</div>
				<div class="post-body" v-html="post.body"></div>
			</div>
			<div v-else>
				<p>No posts found.</p>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SinglePost } from '../types';

@Component( { } )
export default class PostFeed extends Vue {

	@Prop( { default: '@' } ) private dateSeparator?: string;
	@Prop() private posts!: SinglePost[];

	get hasPosts(): boolean {
		return this.posts instanceof Array && 0 < this.posts.length;
	}

	private postDate( dateString: string ): string {
		return dateString.substr( 0, 10 );
	}

	private postTime( dateString: string ): string {
		return dateString.substr( 11, 5 );
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

.posts {
	margin: 0 auto;
	max-width: 60em;
	width: 85%;
}

.post-title {
	margin: 0;
}

.post {
	border-top: 1px solid #ccc;
	padding-top: 1.5em;
	margin-top: 1.5em;
}

.post-meta {
	padding: 0.5em;
}
</style>
