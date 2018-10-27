<template>
	<div id="app">
		<vue-progress-bar></vue-progress-bar>
		<div class="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/admin">Admin</router-link>
		</div>
		<router-view/>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component( { } )
export default class App extends Vue {
	private created() {
		console.info( 'Application started' );
	}
}
</script>
<style scoped lang="scss">
@import url( './scss/base.scss' );

#app {
	text-align: center;
}

.nav {
	margin: 2em auto;

	a {
		font-weight: bold;
	}
}
</style>
