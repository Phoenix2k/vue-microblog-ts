import axios, { AxiosResponse } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { AjaxStateToString } from '../../helpers';
import { AjaxState, NewsFeedState, RootState, SinglePost } from '../../types';

const API_URL: string = '/api';
const Namespaced: boolean = true;

export const Actions: ActionTree<NewsFeedState, RootState> = {
	async fetchPosts( { commit } ): Promise<AxiosResponse> {
		return new Promise<AxiosResponse>( ( resolve, reject ) => {
			axios.get( API_URL ).then( response => {
				commit( 'updateAjaxState', AjaxState.SUCCESS );
				resolve( response );
			} ).catch( error => {
				commit( 'updateAjaxState', AjaxState.ERROR );
				reject( error );
			} );
		} );
	},
	setAjaxState( { commit }, payload: AjaxState ): void {
		console.debug( 'Setting ajax state to:', AjaxStateToString( payload ) );
		commit( 'updateAjaxState', payload );
	},
	setPosts( { commit }, payload: SinglePost[] ): void {
		console.debug( 'Saving posts:', payload );
		commit( 'updatePosts', payload );
		commit( 'updateAjaxState', AjaxState.IDLE );
	},
};

export const Getters: GetterTree<NewsFeedState, RootState> = {
	getAjaxState( state ): AjaxState {
		console.debug( 'Getting ajax state:', AjaxStateToString( state.ajaxStatus ) );
		return state.ajaxStatus;
	},
	getPosts( state ): SinglePost[] {
		console.debug( 'Getting posts:', state.posts );
		return state.posts;
	},
};

export const Mutations: MutationTree<NewsFeedState> = {
	updateAjaxState( state, payload: AjaxState ): void {
		console.debug( 'Updating ajax state:', AjaxStateToString( payload ) );
		state.ajaxStatus = payload;
	},
	updatePosts( state, payload: SinglePost[] ): void {
		console.debug( 'Updating posts:', payload );
		state.posts = payload;
	},
};

export const State: NewsFeedState = {
	ajaxStatus: AjaxState.IDLE,
	posts: [],
};

export const NewsFeedStore: Module<NewsFeedState, RootState> = {
	actions: Actions,
	getters: Getters,
	mutations: Mutations,
	namespaced: Namespaced,
	state: State,
};
