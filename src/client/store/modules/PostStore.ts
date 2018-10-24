import axios, { AxiosResponse } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { PostState, RootState, SinglePost } from '../../types';

const API_URL: string = '/api';
const Namespaced: boolean = true;

export const Actions: ActionTree<PostState, RootState> = {
	async fetchPosts( { commit } ): Promise<AxiosResponse> {
		return new Promise<AxiosResponse>( ( resolve, reject ) => {
			axios.get( API_URL ).then( response => {
				const { data } = response;
				// Convert JSON objects to SinglePosts
				const Posts = data.map( post => {
					return new SinglePost( post );
				} );
				console.debug( 'Received posts ✅', Posts );
				commit( 'updatePosts', Posts );
				resolve( response );
			} ).catch( error => {
				console.error( 'Something went wrong while fetching posts:', error );
				reject( error );
			} );
		} );
	},
};

export const Getters: GetterTree<PostState, RootState> = {
	getPosts( state ): SinglePost[] {
		console.debug( 'Getting posts:', state.posts );
		return state.posts;
	},
};

export const Mutations: MutationTree<PostState> = {
	updatePosts( state, payload: SinglePost[] ): void {
		console.debug( 'Updating posts:', payload );
		state.posts = payload;
	},
};

export const State: PostState = {
	posts: [],
};

export const PostStore: Module<PostState, RootState> = {
	actions: Actions,
	getters: Getters,
	mutations: Mutations,
	namespaced: Namespaced,
	state: State,
};
