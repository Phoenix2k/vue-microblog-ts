<template>
	<div class="admin">
		<h1>Admin</h1>
		<post-form />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import PostForm from '../components/PostForm.vue';

@Component( {
	components: {
		'post-form': PostForm,
	},
} )
export default class Admin extends Vue {
	private created() {
		console.info( 'Admin loaded.' );
	}
}
</script>

<style scoped lang="scss">

</style>
