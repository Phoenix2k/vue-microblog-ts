import { Request, Response, Router } from 'express';
import * as mongoose from 'mongoose';
import { PostSchema } from '../../models/post';
import { BaseRoute } from '../../routes';

const PostCollection = mongoose.model( 'Post', PostSchema );

/**
 * /api/ route
 *
 * @class API
 */
export class ApiRoute extends BaseRoute {

	public static API_ROUTE: string = '/api';

	/**
	 * Creates the route
	 *
	 * @class ApiRoute
	 * @method create
	 * @param router {Router} Router object.
	 * @returns {void}
	 */
	public static create( router: Router ): void {
		console.log( 'API route created ✓' );
		mongoose.set( 'debug', 'production' !== process.env.NODE_ENV );
		router.get( this.API_ROUTE, async ( request: Request, response: Response ) => {
			await new ApiRoute().getPosts( request, response ).catch( error => console.error( error ) );
		} )
		.post( this.API_ROUTE, async ( request: Request, response: Response ) => {
			console.log( request.body );
			await new ApiRoute().createPost( request, response ).catch( error => console.error( error ) );
		} );
	}

	/**
	 * Sets up the route
	 *
	 * @class ApiRoute
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Loads posts from the database
	 *
	 * @class ApiRoute
	 * @method createPost
	 * @returns {void}
	 */
	private async createPost( request: Request, response: Response ): Promise<any> {
		return new PostCollection( request.body ).save( ( err, post ) => {
			if ( err ) {
				response.send( err );
			}
			response.json( post );
		} );
	}

	/**
	 * Loads posts from the database
	 *
	 * @class ApiRoute
	 * @method getPosts
	 * @returns {Promise<mongoose.Document[]>} Array of posts stored in the database.
	 */
	private async getPosts( request: Request, response: Response ): Promise<mongoose.Document[]> {
		return PostCollection.find( {}, ( error, posts ) => {
			if ( error ) {
				response.send( error );
			}
			response.json( posts );
		} );
	}
}
