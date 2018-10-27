import { AxiosResponse } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import axios from '../../configs/api';
import SubmitPostConstructor from '../../constructors/SubmitPostConstructor';
import { AjaxStateToString } from '../../helpers';
import { AjaxState, PostFormState, RootState } from '../../types';

axios.defaults.baseURL = process.env.BASE_URL;
const API_URL: string = '/api';
const Namespaced: boolean = true;

export const Actions: ActionTree<PostFormState, RootState> = {
	setAjaxState( { commit }, payload: AjaxState ): void {
		console.debug( 'Setting ajax state to:', AjaxStateToString( payload ) );
		commit( 'updateAjaxState', payload );
	},
	setBody( { commit }, payload: string ): void {
		console.debug( 'Saving body:', payload );
		commit( 'updateBody', payload );
	},
	setTitle( { commit }, payload: string ): void {
		console.debug( 'Saving title:', payload );
		commit( 'updateTitle', payload );
	},
	async submitPost( { commit, state } ): Promise<AxiosResponse> {
		const formContent = new SubmitPostConstructor( {
			body: state.body,
			title: state.title,
		} );
		console.debug( 'Saving new post:', formContent );
		return new Promise<AxiosResponse>( ( resolve, reject ) => {
			axios.post( API_URL, formContent ).then( response => {
				resolve( response );
			} ).catch( error => {
				reject( error );
			} );
		} );
	},
};

export const Getters: GetterTree<PostFormState, RootState> = {
	getAjaxState( state ): AjaxState {
		console.debug( 'Getting ajax state:', AjaxStateToString( state.ajaxStatus ) );
		return state.ajaxStatus;
	},
	getBody( state ): string {
		console.debug( 'Getting body:', state.body );
		return state.body;
	},
	getTitle( state ): string {
		console.debug( 'Getting title:', state.title );
		return state.title;
	},
};

export const Mutations: MutationTree<PostFormState> = {
	updateAjaxState( state, payload: AjaxState ): void {
		console.debug( 'Updating ajax state:', AjaxStateToString( payload ) );
		state.ajaxStatus = payload;
	},
	updateBody( state, payload: string ): void {
		console.debug( 'Updating body:', payload );
		state.body = payload;
	},
	updateTitle( state, payload: string ): void {
		console.debug( 'Updating title:', payload );
		state.title = payload;
	},
};

export const State: PostFormState = {
	ajaxStatus: AjaxState.IDLE,
	body: '',
	title: '',
};

export const PostFormStore: Module<PostFormState, RootState> = {
	actions: Actions,
	getters: Getters,
	mutations: Mutations,
	namespaced: Namespaced,
	state: State,
};
