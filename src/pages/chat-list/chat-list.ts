import Block from "../../core/block";
import { ChatList, ChatHeaderDots, ChatMessagesFeed } from "../../components";

interface ChatListPageProps {
    chats?: any;
    activeChatItemIndex: number;
    activeChat: any;
    onClick: () => void;
}

export default class ChatListPage extends Block {
    constructor(props: ChatListPageProps) {
        super("div", {
            ...props,
            className: `cols-layout__wrap`,
            ChatList: new ChatList({
                ...props,
                onChangeActiveChat: (index: number) => {
                    this.children.ChatMessagesFeed = new ChatMessagesFeed({
                        messages: props.chats[index] ? props.chats[index].messageFeed : [],
                        activeChatItemIndex: index,
                    });
                    this.setProps({
                        activeChatItemIndex: index,
                        activeChat: props.chats[index],                     
                    });
                }
            }),
            ChatMessagesFeed: new ChatMessagesFeed({
                messages: props.activeChat ? props.activeChat.messageFeed : [],
                activeChatItemIndex: props.activeChatItemIndex,
            }),
            isModalFunctionVisible: false,
            ChatHeaderDots: new ChatHeaderDots({
                onClick: () => {
                    this.setProps({
                        isModalFunctionVisible: true,
                    });
                },
                onClose: () => {
                    this.setProps({
                        isModalFunctionVisible: false,
                    });
                },
            }),
        });
    }

    render(): string {
        const { activeChatItemIndex } = this.props;

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
                            {{{ ChatMessagesFeed }}}
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
