import { AxiosResponse } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import AxiosInstance, { AxiosConfig } from '../../configs/axios';
import SubmitPostConstructor from '../../constructors/SubmitPostConstructor';
import { AjaxStateToString } from '../../helpers';
import { AjaxState, PostFormState, RootState } from '../../types';

const Namespaced: boolean = true;

export const Actions: ActionTree<PostFormState, RootState> = {
	setAjaxMessage( { commit }, payload: string ): void {
		console.debug( 'Setting ajax message to:', payload );
		commit( 'updateAjaxMessage', payload );
	},
	setAjaxStatus( { commit }, payload: AjaxState ): void {
		console.debug( 'Setting ajax status to:', AjaxStateToString( payload ) );
		commit( 'updateAjaxStatus', payload );
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
		commit( 'updateAjaxMessage', 'Saving post...' );
		commit( 'updateAjaxStatus', AjaxState.SENDING );
		const formContent = new SubmitPostConstructor( {
			body: state.body,
			title: state.title,
		} );
		console.debug( 'Saving new post:', formContent );
		return new Promise<AxiosResponse>( ( resolve, reject ) => {
			AxiosInstance.post( AxiosConfig.apiUrl, formContent ).then( response => {
				switch ( response.status ) {
					case 201:
						commit( 'updateAjaxMessage', 'Post saved!' );
						commit( 'updateAjaxStatus', AjaxState.SUCCESS );
						resolve( response );
						break;
					default:
						commit( 'updateAjaxMessage', 'Unable to save post.' );
						commit( 'updateAjaxStatus', AjaxState.ERROR );
						reject( response );
				}
			} ).catch( error => {
				commit( 'updateAjaxStatus', AjaxState.ERROR );
				reject( error );
			} );
		} );
	},
};

export const Getters: GetterTree<PostFormState, RootState> = {
	getAjaxMessage( state ): string {
		console.debug( 'Getting ajax message:', state.ajaxMessage );
		return state.ajaxMessage;
	},
	getAjaxStatus( state ): AjaxState {
		console.debug( 'Getting ajax status:', AjaxStateToString( state.ajaxStatus ) );
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
	updateAjaxMessage( state, payload: string ): void {
		console.debug( 'Updating ajax message:', payload );
		state.ajaxMessage = payload;
	},
	updateAjaxStatus( state, payload: AjaxState ): void {
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
	ajaxMessage: '',
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
