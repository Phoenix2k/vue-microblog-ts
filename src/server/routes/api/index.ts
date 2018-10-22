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
	 * Creates the route
	 *
	 * @class ApiRoute
	 * @method create
	 * @param router {Router} Router object.
	 * @returns {void}
	 */
	public static create( router: Router ): void {
		mongoose.set( 'debug', 'production' !== process.env.NODE_ENV );
		router.route( this.API_ROUTE ).post( this.POST_CONTROLLER.createPost );
		router.route( this.API_ROUTE ).delete( this.POST_CONTROLLER.deletePost );
		router.route( this.API_ROUTE ).get( this.POST_CONTROLLER.getPosts );
		router.route( this.API_ROUTE ).put( this.POST_CONTROLLER.updatePost );
		console.log( 'API route created ✓' );
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
}
