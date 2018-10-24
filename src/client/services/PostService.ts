import axios from 'axios';
import { SinglePost } from '../types';

export default class PostService {

	public static API_URL: string = '/api';

	public static getPosts() {
		return new Promise<SinglePost[]>( async ( resolve, reject ) => {
			axios.get( this.API_URL ).then( response => {
				const { data } = response;
				resolve( data.map( post => {
					return new SinglePost( post );
				} ) );
			} ).catch( error => {
				reject( error );
			} );
		} );
	}
}
