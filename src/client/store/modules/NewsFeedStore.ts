import axios, { AxiosResponse } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import PostConstructor from '../../constructors/PostConstructor';
import { NewsFeedState, RootState, SinglePost } from '../../types';

const API_URL: string = '/api';
const Namespaced: boolean = true;

export const Actions: ActionTree<NewsFeedState, RootState> = {
	async fetchPosts( { commit } ): Promise<AxiosResponse> {
		return new Promise<AxiosResponse>( ( resolve, reject ) => {
			axios.get( API_URL ).then( response => {
				const { data } = response;
				// Convert JSON objects to SinglePosts
				const Posts: SinglePost[] = data.map( post => {
					return new PostConstructor( post );
				} );
				console.debug( 'Received posts ✅', Posts );
				commit( 'setPosts', Posts );
				resolve( response );
			} ).catch( error => {
				console.error( 'Something went wrong while fetching posts:', error );
				reject( error );
			} );
		} );
	},
};

export const Getters: GetterTree<NewsFeedState, RootState> = {
	getPosts( state ): SinglePost[] {
		console.debug( 'Getting posts:', state.posts );
		return state.posts;
	},
};

export const Mutations: MutationTree<NewsFeedState> = {
	setPosts( state, payload: SinglePost[] ): void {
		console.debug( 'Updating posts:', payload );
		state.posts = payload;
	},
};

export const State: NewsFeedState = {
	posts: [],
};

export const NewsFeedStore: Module<NewsFeedState, RootState> = {
	actions: Actions,
	getters: Getters,
	mutations: Mutations,
	namespaced: Namespaced,
	state: State,
};
