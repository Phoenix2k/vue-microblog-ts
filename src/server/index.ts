import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { ApiRoute } from './routes/api';
import { IndexRoute } from './routes/index';

/**
 * The server
 *
 * @class Server
 */
export class Server {

	/**
	 * Express instance.
	 */
	public app: express.Application;

	/**
	 * Sets up the server
	 *
	 * @class Server
	 * @constructor
	 */
	constructor() {
		console.log( 'Setting up server...' );
		dotenv.config();
		if ( ! process.env.MONGO_URI ) {
			console.error( `'MONGO_URI' not defined. Follow the instructions in the README.md file on how to set up your environment.` );
			process.exit( 1 );
		}
		this.app = express();
		this.config();
		this.mongoSetup()
			.then( response => console.log( `Successfully connected to ${ response.connections[0].host } on port ${ response.connections[0].port }` ) )
			.catch( error => {
				console.log( error );
				process.exit( 1 );
			} );
		this.routeSetup();
		this.init();
	}

	/**
	 * Server configuration
	 *
	 * @class Server
	 * @method config
	 * @returns {void}
	 */
	private config(): void {
		this.app.use( express.static( path.join( __dirname, '../../dist' ) ) );
		this.app.use( express.json() );
		this.app.use( cors() );
	}

	/**
	 * Initializes the server
	 *
	 * @class Server
	 * @method init
	 * @returns {void}
	 */
	private init(): void {
		const PORT = process.env.PORT || 5000;
		this.app.listen( PORT, () => {
			console.log( `Server started on port ${ PORT }` );
		} );
	}

	/**
	 * Sets up the database
	 *
	 * @class Server
	 * @method mongoSetup
	 * @returns {Promise<any>} Mongoose connection.
	 */
	private async mongoSetup(): Promise<any> {
		return process.env.MONGO_URI ? mongoose.connect( process.env.MONGO_URI, {
			useNewUrlParser: true,
		} ) : Promise.reject( 'MONGO_URI not defined.' );
	}

	/**
	 * Sets up routes
	 *
	 * @class Server
	 * @method routes
	 * @returns {void}
	 */
	private routeSetup(): void {
		let router: express.Router;
		router = express.Router();
		ApiRoute.create( router );
		IndexRoute.create( router );
		this.app.use( router );
	}
}

export default new Server().app;
