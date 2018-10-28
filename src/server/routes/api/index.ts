import * as env from 'env-var';
import { Router } from 'express';
import * as mongoose from 'mongoose';
import { PostController } from '../../controllers/post';
import { BaseRoute } from '../../routes';

/**
 * /api/ route
 *
 * @class API
 */
export class ApiRoute extends BaseRoute {

	public static API_ROUTE: string = '/api';
	public static POST_CONTROLLER: PostController = new PostController();

	/**
	 * Create the API endpoints
	 *
	 * @class ApiRoute
	 * @method create
	 * @param router {Router} Router object.
	 * @returns {void}
	 */
	public static create( router: Router ): void {
		const ENVIRONMENT = env.get( 'NODE_ENV' ).required().asString();
		mongoose.set( 'debug', 'production' !== ENVIRONMENT );
		router.route( this.API_ROUTE ).delete( this.POST_CONTROLLER.deletePost );
		router.route( this.API_ROUTE ).get( this.POST_CONTROLLER.getPosts );
		router.route( this.API_ROUTE ).post( this.POST_CONTROLLER.createPost );
		console.log( 'API route created ✓' );
	}

	/**
	 * Sets up the route
	 *
	 * @class ApiRoute
	 * @constructor
	 */
	constructor() {
		super( );
	}
}
