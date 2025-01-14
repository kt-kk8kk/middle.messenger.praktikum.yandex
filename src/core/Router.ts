import Route from "./Route";
import Block from "../core/block";

export interface RouteInterface {
  render: (pathname: string) => void;
  match: (pathname: string) => boolean;
  leave: () => void;
}

class Router {
    private static __instance: Router | null = null;
    public routes: RouteInterface[] = [];
    private history!: History;
    private _currentRoute: RouteInterface | null = null;
    private _rootQuery: string = "";

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: { new (props: any): Block }): this {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = (event) => {
          this._onRoute((event.currentTarget as Window).location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);

        if (!route) {
          return;
        }

       if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(pathname);
    }

    go(pathname: string): void {
      if (typeof pathname !== 'string') {
        throw new Error(`Expected pathname to be a string, but got ${typeof pathname}`);
      }
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }

    back(): void {
      this.history.back();
    }

    forward(): void {
      this.history.forward();
    }

    private getRoute(pathname: string): RouteInterface | undefined {
      const route = this.routes.find(route => route.match(pathname));
      if(!route) {
        return this.routes.find(route => route.match('*'))
      }
      return route
    }
}

export default  Router;
