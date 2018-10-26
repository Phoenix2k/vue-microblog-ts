import axios, { AxiosResponse } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import SubmitPostConstructor from '../../constructors/SubmitPostConstructor';
import { PostFormState, RootState } from '../../types';

axios.defaults.baseURL = process.env.BASE_URL;
const API_URL: string = '/api';
const Namespaced: boolean = true;

export const Actions: ActionTree<PostFormState, RootState> = {
	setBody( { commit }, payload: string ): void {
		console.debug( 'Saving body:', payload );
		commit( 'updateBody', payload );
	},
	setError( { commit }, payload: boolean ): void {
		console.debug( 'Setting error state to:', payload );
		commit( 'updateError', payload );
	},
	setLoading( { commit }, payload: boolean ): void {
		console.debug( 'Setting loading state to:', payload );
		commit( 'updateLoading', payload );
	},
	setSuccess( { commit }, payload: boolean ): void {
		console.debug( 'Setting success state to:', payload );
		commit( 'updateSuccess', payload );
	},
	setTitle( { commit }, payload: string ): void {
		console.debug( 'Saving title:', payload );
		commit( 'updateTitle', payload );
	},
	async submitPost( { commit, state } ): Promise<AxiosResponse> {
		console.log( state );
		const formContent = new SubmitPostConstructor( {
			body: state.body,
			title: state.title,
		} );
		console.debug( 'Sending new post:', formContent );
		return new Promise<AxiosResponse>( ( resolve, reject ) => {
			axios.post( API_URL, formContent ).then( response => {
				commit( 'updateLoading', false );
				resolve( response );
			} ).catch( error => {
				console.error( 'Something went wrong while trying to save new post:', error );
				commit( 'updateError', true );
				commit( 'updateLoading', false );
				reject( error );
			} );
		} );
	},
};

export const Getters: GetterTree<PostFormState, RootState> = {
	getBody( state ): string {
		console.debug( 'Getting body:', state.body );
		return state.body;
	},
	getError( state ): boolean {
		console.debug( 'Getting error state:', state.error );
		return state.error;
	},
	getLoading( state ): boolean {
		console.debug( 'Getting loading state:', state.loading );
		return state.loading;
	},
	getSuccess( state ): boolean {
		console.debug( 'Getting success state:', state.success );
		return state.success;
	},
	getTitle( state ): string {
		console.debug( 'Getting title:', state.title );
		return state.title;
	},
};

export const Mutations: MutationTree<PostFormState> = {
	updateBody( state, payload: string ): void {
		console.debug( 'Updating body:', payload );
		state.body = payload;
	},
	updateError( state, payload: boolean ): void {
		console.debug( 'Updating error state:', payload );
		state.error = payload;
	},
	updateLoading( state, payload: boolean ): void {
		console.debug( 'Updating loading state:', payload );
		state.loading = payload;
	},
	updateSuccess( state, payload: boolean ): void {
		console.debug( 'Updating success state:', payload );
		state.success = payload;
	},
	updateTitle( state, payload: string ): void {
		console.debug( 'Updating title:', payload );
		state.title = payload;
	},
};

export const State: PostFormState = {
	body: '',
	error: false,
	loading: false,
	success: false,
	title: '',
};

export const PostFormStore: Module<PostFormState, RootState> = {
	actions: Actions,
	getters: Getters,
	mutations: Mutations,
	namespaced: Namespaced,
	state: State,
};
