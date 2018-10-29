import Vue from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex';
import { RootState } from '../types';
import { NewsFeedStore } from './modules/NewsFeedStore';
import { PostFormStore } from './modules/PostFormStore';

Vue.use( Vuex );

export const Actions: ActionTree<{}, RootState> = {
	setNotificationDuration( { commit }, payload: number ): void {
		console.log( 'Setting notification duration to:' , payload );
		commit( 'updateNotificationDuration', payload );
	},
};

export const Getters: GetterTree<RootState, RootState> = {
	getNotificationDuration( state ): number {
		return state.notificationDuration;
	},
};

export const Mutations: MutationTree<RootState> = {
	updateNotificationDuration( state, payload: number ) {
		state.notificationDuration = payload;
	},
};

export const State: RootState = {
	notificationDuration: 2000,
};

const Store: StoreOptions<RootState> = {
	actions: Actions,
	getters: Getters,
	modules: {
		NewsFeedStore,
		PostFormStore,
	},
	mutations: Mutations,
	state: State,
};

export default new Vuex.Store<RootState>( Store );
