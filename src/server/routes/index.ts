import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../routes';

/**
 * / route
 *
 * @class IndexRoute
 */
export class IndexRoute extends BaseRoute {
  public static API_ROUTE: string = '/';

  /**
   * Creates the route
   *
   * @class IndexRoute
   * @method create
   * @param router {Router} Router object.
   * @returns {void}
   */
  public static create(router: Router): void {
    console.log('Public folder ready ✓');
    router.get(this.API_ROUTE, (request: Request, response: Response, next: NextFunction) => {
      return new IndexRoute().renderIndex(request, response, next);
    });
  }

  /**
   * Sets up the route
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Renders the home page
   *
   * @class IndexRoute
   * @method index
   * @param request {Request} Request object.
   * @param response {Response} Response object.
   * @returns {void}
   */
  private renderIndex(request: Request, response: Response, next: NextFunction): void {
    this.render(request, response, 'index');
    next();
  }
}
