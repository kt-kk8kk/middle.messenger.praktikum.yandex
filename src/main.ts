import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import renderDOM from "./core/renderDom";
import mockChats from "./pages/chat-list/mockChats";

const pages = {
    "auth": [ Pages.AuthPage ],
    "registration": [ Pages.RegistrationPage ],
    "chat-list": [ Pages.ChatListPage, {
        chats: mockChats, 
        activeChatItemIndex: -1, 
        activeChat: null
    }],
    "profile": [ Pages.ProfilePage ],
    "error-404": [ Pages.Error404Page ],
    "error-500": [ Pages.Error500Page ],
    "navigation": [ Pages.NavigationPage ]
};

Object.entries(Components).forEach(([ name, template ]) => {
    if (typeof template === "function") {
        return;
    }
    Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
    //@ts-ignore
    const [source, context] = pages[page];
    if (typeof source === "function") {
        renderDOM(new source({
            ...context, 
            formState: {
                login: '',
                password: ''
            },
            errors: {
                login: '',
                password: ''
            }
        }));
        return;
    }
  
    const container = document.getElementById("app")!;
  
    const temlpatingFunction = Handlebars.compile(source);
    container.innerHTML = temlpatingFunction(context);
  }

document.addEventListener("DOMContentLoaded", () => navigate("navigation"));

document.addEventListener("click", e => {
    const page = e.target.getAttribute("page");
    if (page) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
