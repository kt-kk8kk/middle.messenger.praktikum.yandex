import Block from "../../core/block";
import { ChatList, ChatHeaderDots, ModalFunctional } from "../../components";

const mockChats = [
    {
        avatar: "https://velvety-croissant-6789fd.netlify.app/assets/message-img-Bx03TAvJ.jpg",
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
        time: "Пт"
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
        copy: "В 2008 году художник Jon Rafman начал собирать...",
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

interface ChatEmptyPageProps {
    chats?: Array<any>;
    showModal: boolean;
    activeChatItemIndex: number;
    activeChat: any;
    onClick: () => void;
}

export default class ChatEmptyPage extends Block {
    constructor(props: ChatEmptyPageProps) {
        super("div", {
            ...props,
            className: `cols-layout__wrap`,
            activeChatItemIndex: -1, 
            activeChat: null,
            showModal: false,
            ChatList: new ChatList({
                chats: props.chats || mockChats,
                activeChatItemIndex: -1,
                onChangeActiveChat: (index: number) => {
                    this.setProps({
                        activeChatItemIndex: index,
                        activeChat: mockChats[index],
                    });
                }
            }),
            ChatHeaderDots: new ChatHeaderDots({
                ...props,
                onDotsClick: () => {
                    this.setProps({ showModal: true });
                },
                
            }),
            ModalFunctional: new ModalFunctional({
                ...props,
                onClose: () => {
                    this.setProps({ showModal: false })
                },
            }),
        });
    }

    render(): string {
        const { activeChatItemIndex, activeChat, showModal, ModalFunctional } = this.props;

        // Шаблон, который рендерит контент в зависимости от активного чата
        return `
            <aside class="cols-layout__aside">
                <header class="cols-layout__aside-head">
                    <div class="cols-layout__aside-profile">
                        <a class="cols-layout__aside-profile-link" href="">
                            Профиль
                            <span class="material-symbols-outlined">chevron_right</span>
                        </a>
                    </div>
                    {{> SearchForm type="text" name="message" placeholder="Поиск" }}
                </header>
                <div class="cols-layout__aside-body">
                    {{{ ChatList }}}
                </div>
            </aside>

            <main class="cols-layout__content">
                {{#if ${activeChatItemIndex === -1}}}
                    <div class="chat-wrapper__empty">
                        <div class="chat-wrapper__empty-message">Выберите чат, чтобы отправить сообщение</div>
                    </div>
                {{/if}}

                {{#if ${activeChatItemIndex !== -1}}}
                    <div class="chat__wrapper">
                        <header class="chat__header">
                            <div class="chat__header-inner">
                                <div class="chat__header-user">
                                    <span class="chat__header-user-avatar">
                                        {{#if activeChat.avatar}}
                                            <img src="{{activeChat.avatar}}" alt="" />
                                        {{/if}}
                                    </span>
                                    <h4 class="chat__header-user-name">{{activeChat.name}}</h4>
                                </div>

                                {{{ ChatHeaderDots }}}
                            </div>
                        </header>

                        <section class="chat__body">
                            {{#> ChatMessagesWrapper}}
                                {{> ChatMessageDate date="19 июня" }}

                                {{#each message}}
                                    {{> ChatMessage}}
                                {{/each}}
                                {{activeChat.copy}}
                            {{/ ChatMessagesWrapper}}
                        </section>

                        <footer class="chat__footer">
                            <div class="chat__footer-inner">
                                {{> SendMessageForm type="text" name="message" placeholder="Сообщение" }}
                            </div>
                        </footer>
                    </div>
                {{/if}}
            </main>
        `;
    }
}
