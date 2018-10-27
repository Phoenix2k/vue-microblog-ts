<template lang="html">
	<div id="app">
		<vue-progress-bar></vue-progress-bar>
		<div class="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/admin">Admin</router-link>
		</div>
		<router-view/>
		<ajax-notifications :duration="notificationDuration" />
		<icons />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import AjaxNotifications from './components/AjaxNotifications.vue';
import Icons from './components/Icons.vue';
import './scss/animations.scss';
import './scss/base.scss';
import './scss/notifications.scss';

@Component( {
	components: {
		'ajax-notifications': AjaxNotifications,
		'icons': Icons,
	},
} )
export default class App extends Vue {
	@Getter( 'getNotificationDuration' ) private notificationDuration;
	private created() {
		console.info( 'Application started' );
	}
}
</script>

<style scoped lang="scss">
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
