import Vue from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex';
import { RootState } from '../types';
import { NewsFeedStore } from './modules/NewsFeedStore';
import { PostFormStore } from './modules/PostFormStore';

Vue.use( Vuex );

export const Actions: ActionTree<{}, RootState> = {
	setError( { commit }, errorState: boolean ): void {
		console.log( 'Setting error state to:' , errorState );
		commit( 'updateError', errorState );
	},
	setLoading( { commit }, loadingState: boolean ): void {
		console.log( 'Setting loading state to:' , loadingState );
		commit( 'updateLoading', loadingState );
	},
};

export const Getters: GetterTree<RootState, RootState> = {
	hasError( state ): boolean {
		return state.error && ! state.loading;
	},
	isLoading( state ): boolean {
		return ! state.error && state.loading;
	},
};

export const Mutations: MutationTree<RootState> = {
	updateError( state, payload: boolean ) {
		state.error = payload;
	},
	updateLoading( state, payload: boolean ) {
		state.loading = payload;
	},
};

export const State: RootState = {
	error: false,
	loading: true,
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
