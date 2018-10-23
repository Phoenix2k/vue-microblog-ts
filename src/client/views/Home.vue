<template lang="html">
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<post-feed :posts="posts" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PostFeed from '../components/PostFeed.vue';
import { SinglePost } from '../types';

@Component( {
	components: {
		'post-feed': PostFeed,
	},
} )
export default class Home extends Vue {
	private posts: SinglePost[] = [
		{
			title: 'Post 1',
			body: '<p>Some body text</p>',
			createdAt: '2018-10-23T20:00:00.000Z',
		},
		{
			title: 'Post 2',
			body: '<p>Some body text</p>',
			createdAt: '2018-10-23T20:01:00.000Z',
		},
	];
}
</script>
