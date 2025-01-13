import Router from "./core/Router";
import { ROUTER } from "./utils/constants";
import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import { Store } from "./core/Store";

Object.entries(Components).forEach(([ name, template ]) => {
    if (typeof template === "function") {
        return;
    }
    Handlebars.registerPartial(name, template);
});

window.store = new Store({
    isLoading: false,
    user: null,
    loginError: null,
});

const APP_ROOT_ELEMENT = "#app";
window.router = new Router(APP_ROOT_ELEMENT);

window.router
    .use(ROUTER.auth, Pages.AuthPage)
    .use(ROUTER.signUp, Pages.RegistrationPage)
    .use(ROUTER.settings, Pages.ProfilePage)
    .use(ROUTER.messenger, Pages.ChatListPage)
    .use("*", Pages.Error404Page)
    .start();
