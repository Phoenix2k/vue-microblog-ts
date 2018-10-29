<template lang="html">
	<div id="app">
		<div class="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/admin">Admin</router-link>
		</div>
		<router-view/>
		<animations />
		<icons />
		<notification-templates :duration="notificationDuration" />
		<vue-progress-bar></vue-progress-bar>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Animations from './components/Animations.vue';
import Icons from './components/Icons.vue';
import NotificationTemplates from './components/Notifications.vue';

// Global styles
import './scss/animations.scss';
import './scss/base.scss';
import './scss/notifications.scss';

// Global components
@Component( {
	components: {
		Animations,
		Icons,
		NotificationTemplates,
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
