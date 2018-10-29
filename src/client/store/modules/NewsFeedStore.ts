import { AxiosResponse } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import axios from '../../configs/api';
import PostConstructor from '../../constructors/PostConstructor';
import { AjaxStateToString } from '../../helpers';
import { AjaxState, NewsFeedState, RootState, SinglePost } from '../../types';

const API_URL: string = '/api';
const Namespaced: boolean = true;

export const Actions: ActionTree<NewsFeedState, RootState> = {
	async fetchPosts( { commit } ): Promise<AxiosResponse> {
		commit( 'updateAjaxStatus', AjaxState.LOADING );
		return new Promise<AxiosResponse>( ( resolve, reject ) => {
			axios.get( API_URL ).then( response => {
				switch ( response.status ) {
					case 200:
						const { data } = response;
						console.debug( 'Received posts ✅', data );
						// Convert JSON objects to SinglePosts
						const convertedPosts: SinglePost[] = data.map( post => {
							return new PostConstructor( post );
						} );
						commit( 'updateAjaxStatus', AjaxState.SUCCESS );
						commit( 'updatePosts', convertedPosts );
						resolve( response );
						break;
					default:
						commit( 'updateAjaxStatus', AjaxState.ERROR );
						commit( 'updateAjaxMessage', 'Unable to reach the server. Try again?' );
						reject( response );
				}
			} ).catch( error => {
				commit( 'updateAjaxStatus', AjaxState.ERROR );
				commit( 'updateAjaxMessage', 'Unable to reach the server. Try again?' );
				reject( error );
			} );
		} );
	},
	async deletePost( { commit }, postId: string ): Promise<AxiosResponse> {
		console.debug( 'Deleting post:', postId );
		commit( 'updateAjaxStatus', AjaxState.LOADING );
		return new Promise<AxiosResponse>( ( resolve, reject ) => {
			axios.delete( API_URL, { data: { postId } } ).then( response => {
				commit( 'updateAjaxStatus', AjaxState.SUCCESS );
				resolve( response );
			} ).catch( error => {
				commit( 'updateAjaxStatus', AjaxState.ERROR );
				reject( error );
			} );
		} );
	},
	setAjaxMessage( { commit }, payload: string ): void {
		console.debug( 'Setting ajax message to:', payload );
		commit( 'updateAjaxMessage', payload );
	},
	setAjaxStatus( { commit }, payload: AjaxState ): void {
		console.debug( 'Setting ajax status to:', AjaxStateToString( payload ) );
		commit( 'updateAjaxStatus', payload );
	},
	setPosts( { commit }, payload: SinglePost[] ): void {
		console.debug( 'Saving posts:', payload );
		commit( 'updatePosts', payload );
		commit( 'updateAjaxStatus', AjaxState.IDLE );
	},
};

export const Getters: GetterTree<NewsFeedState, RootState> = {
	getAjaxMessage( state ): string {
		console.debug( 'Getting ajax message:', state.ajaxMessage );
		return state.ajaxMessage;
	},
	getAjaxStatus( state ): AjaxState {
		console.debug( 'Getting ajax status:', AjaxStateToString( state.ajaxStatus ) );
		return state.ajaxStatus;
	},
	getPosts( state ): SinglePost[] {
		console.debug( 'Getting posts:', state.posts );
		return state.posts;
	},
};

export const Mutations: MutationTree<NewsFeedState> = {
	updateAjaxMessage( state, payload: string ): void {
		console.debug( 'Updating ajax message:', payload );
		state.ajaxMessage = payload;
	},
	updateAjaxStatus( state, payload: AjaxState ): void {
		console.debug( 'Updating ajax status:', AjaxStateToString( payload ) );
		state.ajaxStatus = payload;
	},
	updatePosts( state, payload: SinglePost[] ): void {
		console.debug( 'Updating posts:', payload );
		state.posts = payload;
	},
};

export const State: NewsFeedState = {
	ajaxMessage: '',
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
