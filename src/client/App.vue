<template>
	<div id="app">
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
		console.info( 'Application started ✅' );
	}
}
</script>
<style scoped lang="scss">
@import url( 'scss/base.scss' );

#app {
	text-align: center;
}

.nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
