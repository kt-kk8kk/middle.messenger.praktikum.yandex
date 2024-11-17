import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

const chats = [
    {
        name: "Андрей",
        copy: "Изображение",
        time: "10:49",
        badge: "2"
    },
    {
        name: "Киноклуб",
        you: "Вы:",
        copy: "стикер",
        time: "12:00"
    },
    {
        name: "Илья",
        copy: "Друзья, у меня для вас особенный выпуск новостей! Мы открыли пекарню рядом с офисом! Ура!",
        time: "15:12",
        badge: "2"
    },
    {
        name: "Вадим",
        you: "Вы:",
        copy: "Круто!",
        time: "Пт",
        active: true
    },
    {
        name: "тет-а-теты",
        copy: "И Human Interface Guidelines и Material Design рекомендуют...",
        time: "Ср"
    },
    {
        name: "1, 2, 3",
        copy: "Миллионы россиян ежедневно проводят десятки часов свое...",
        time: "Пн"
    },
    {
        name: "Design Destroyer",
        copy: "В 2008 году художник Jon Rafman  начал собирать...",
        time: "Пн"
    },
    {
        name: "Day.",
        copy: "Так увлёкся работой по курсу, что совсем забыл его анонсир...",
        time: "1 Мая 2020"
    },
    {
        name: "Стас Рогозин",
        copy: "Можно или сегодня или завтра вечером.",
        time: "12 Апр 2020"
    }
];

import messageImg from "./assets/message-img.jpg";

const pages = {
    "auth": [ Pages.AuthPage ],
    "registration": [ Pages.RegistrationPage ],
    "chat-empty": [ Pages.ChatEmptyPage, {
        chats
    }],
    "chat-chosen": [ Pages.ChatChosenPage, {
        chats,
        message: [
            {
                copy: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
                time: "11:56"
            },
            {
                avatar: messageImg,
                time: "11:56"
            },
            {
                copy: "Круто!",
                badge: "read",
                time: "12:00",
                you: true
            },
            {
                copy: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.",
                badge: "read",
                time: "12:00",
                you: true
            }
        ],
        showModal: false
    }],
    "profile": [ Pages.ProfilePage ],
    "profile-change-data": [ Pages.ProfileChangeDataPage ],
    "profile-change-password": [ Pages.ProfileChangePasswordPage ],
    "profile-change-avatar": [ Pages.ProfileChangeAvatarPage, {
        showModal: true
    }],
    "error-404": [ Pages.Error404Page ],
    "error-500": [ Pages.Error500Page ],
    "navigation": [ Pages.NavigationPage ]
};

Object.entries(Components).forEach(([ name, template ]) => {
    Handlebars.registerPartial(name, template);
});

function navigate(page) {
    const [ source, context ] = pages[page];
    const container = document.getElementById("app");
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
