import Router from "./src/core/Router";

declare global {
    interface Window {
        router: Router;
        store: Store;
    }
}
