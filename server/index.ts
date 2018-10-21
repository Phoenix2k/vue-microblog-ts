import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
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
		this.app = express();
		this.config();
		this.routes();
		this.init();
	}

	/**
	 * Server configuration
	 *
	 * @class Server
	 * @method config
	 * @return {void}
	 */
	private config(): void {
		this.app.use( express.static( path.join( __dirname, '../public' ) ) );
		this.app.use( cors() );
	}

	/**
	 * Initializes the server
	 *
	 * @class Server
	 * @method init
	 * @return {void}
	 */
	private init(): void {
		const PORT = process.env.PORT || 5000;
		this.app.listen( PORT, () => {
			console.log( `\nServer runing on port: ${ PORT }` );
		} );
	}

	/**
	 * Configures routes
	 *
	 * @class Server
	 * @method routes
	 * @return {void}
	 */
	private routes(): void {
		let router: express.Router;
		router = express.Router();
		IndexRoute.create( router );
		this.app.use( router );
	}
}

export default new Server().app;
