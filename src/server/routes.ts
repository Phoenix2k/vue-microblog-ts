import { Request, Response } from 'express';

/**
 * Base route
 *
 * @class BaseRoute
 */
export class BaseRoute {
  /**
   * Renders a page
   *
   * @class BaseRoute
   * @method render
   * @param request {Request} Request header.
   * @param response {Response} Response object.
   * @param view {string} The view to render.
   * @returns {void}
   */
  public render(request: Request, response: Response, view: string): void {
    response.locals.BASE_URL = '/';
    response.render(view);
  }
}
