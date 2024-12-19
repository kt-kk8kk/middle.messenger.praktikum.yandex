import Block from "../../core/block";
import { ChatList, ChatHeaderDots, ChatHeaderAdd, ChatHeaderDelete, ChatMessagesFeed, SearchForm, SendMessageForm, ChatHeaderProfile, Button, ModalFunctional, ModalFunctionalItem, ModalFullWidthCloser, Input } from "../../components";
import { validateField } from "../../utils/validation";
import { loginRules } from "../../utils/rules";
import { ROUTER } from "../../utils/constants";
import Router from "../../core/Router";
import { withRouter } from "../../utils/withRouter";
import * as userServices from "../../services/user";
import * as chatsServices from "../../services/chats";
import * as chatsAddServices from "../../services/chatsAdd";
import * as chatsDeleteServices from "../../services/chatsDelete";
import * as chatsAddUserServices from "../../services/chatsAddUser";

// const ChatListDefault = new ChatList({
//     ...props,
//     chats: mockChats,
//     onChangeActiveChat: (index: number) => {
//         this.children.ChatMessagesFeed = new ChatMessagesFeed({
//             messages: this.chats[index] ? this.chats[index].messageFeed : [],
//             activeChatItemIndex: index,
//         });
//         this.setProps({
//             activeChatItemIndex: index,
//             activeChat: this.chats[index],                     
//         });
//     }
// })

const ChatListDefault = new ChatList({

});

const SendMessageFormExmp = new SendMessageForm({
    type: "text",
    name: "message",
    placeholder: "Сообщение"
})

interface Chat extends Block {
    avatar: string
    you: string
    copy: string
    time: string
    badge: string
    messageFeed: []
    name: string
    status: string
    props: {
        active: boolean
    }
}
interface ChatListPage {
    chats: Chat[]
    children: { 
        ChatMessagesFeed: Block,
        SendMessageFormExmp: Block,
        ModalFullWidthAddChat: Block,
        InputAddChat: Block,
        InputAddUser: Block,
        InputDeleteUser: Block,
    }
    props: ChatListPageProps
}
interface ChatListPageProps {
    router: Router,
    activeChatItemIndex: number;
    activeChat: Chat;
    isModalFullVisible?: boolean;
    isModalFunctionVisible: boolean;
    addChatModal: boolean;
    deleteChatModal: boolean;
    chatID: string;
    onClick: () => void;
    formState: {
        login: string,
        title: string
    };
    errors: {
        login: "",
        title: ""
    };
}
class ChatListPage extends Block {
    constructor(props: ChatListPageProps) {
        super("div", {
            ...props,
            className: `cols-layout__wrap`,
            formState: {
                login: "",
                title: "",
            },
            errors: {
                login: "",
                title: "",
            },
            activeChatItemIndex: -1, 
            activeChat: null,
            ChatListDefault,
            ChatMessagesFeed: new ChatMessagesFeed({
                messages: props.activeChat ? props.activeChat.messageFeed : [],
                activeChatItemIndex: props.activeChatItemIndex,
            }),

            ModalFullWidthCloser: new ModalFullWidthCloser({
                onClose: () => {
                    this.setProps({
                        isModalFullVisible: false,
                        addUserModal: false,
                        deleteUserModal: false,
                        addChatModal: false,
                        deleteChatModal: false,
                    });
                },
            }),

            ChatHeaderDots: new ChatHeaderDots({
                dots: "...",
                onClick: () => {
                    const isVisible = this.props.isModalFunctionVisible
                    this.setProps({
                        isModalFunctionVisible: !isVisible,
                    });
                },
            }),

            ModalFunctionalUser: new ModalFunctional({
                modalFunctionalBody: [
                    new ModalFunctionalItem({
                        icon: "add_circle",
                        copy: "Добавить пользователя",
                        onClick: () => {
                            this.setProps({
                                isModalFullVisible: true,
                                addUserModal: true,
                                deleteUserModal: false,
                            });
                        },
                    }), 
                    new ModalFunctionalItem({
                        icon: "cancel",
                        copy: "Удалить пользователя",
                        onClick: () => {
                            this.setProps({
                                isModalFullVisible: true,
                                addUserModal: false,
                                deleteUserModal: true,
                            });
                        },
                        onClose: () => {
                            this.setProps({
                                addUserModal: false,
                                deleteUserModal: false,
                            });
                        },
                    })
                ],
            }),

            InputAddUser: new Input({
                type: "text",
                name: "login",
                label: "Логин",
                value: "",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    
                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            login: value,
                        },
                    });
                },
            }),
            ButtonAddUser: new Button({
                label: "Добавить",
                type: "submit",
                className: "primary",
                onClick: (e: Event) => {
                    e.preventDefault();

                    const loginValue = this.props.formState.login;
                    const loginValidation = validateField(loginValue, loginRules);
                    
                    this.children.InputAddUser.setProps({
                        error: loginValidation.error,
                    });

                    const data = {
                        users: [2932],
                        chatId: this.props.chatID,
                    };

                    chatsAddUserServices.chatsAddUser(data)
                        .then(() => {
                            this.componentDidMount({});
                            this.setProps({
                                isModalFullVisible: false,
                                addUserModal: false,
                            });
                            console.log(data)
                        })
                        .catch((error) => {
                            console.error('Ошибка при добавлении юзера:', error);
                        });
                },
            }),

            InputDeleteUser: new Input({
                type: "text",
                name: "login",
                label: "Логин",
                value: "",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, loginRules);

                    this.children.InputDeleteUser.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                login: value,
                            },
                        });
                    }
                },
            }),
            ButtonDeleteUser: new Button({
                label: "Добавить",
                type: "submit",
                className: "primary",
                onClick: (e: Event) => {
                    e.preventDefault();

                    const loginValue = this.props.formState.login;
                    const loginValidation = validateField(loginValue, loginRules);
                    
                    this.children.InputDeleteUser.setProps({
                        error: loginValidation.error,
                    });

                    // if (!loginValidation.error) {
                    //     const data = {
                    //         login: loginValue,
                    //     };

                    //     chatsAddServices.chatsAdd(data)
                    //         .then(() => {
                    //             this.componentDidMount({});
                    //             this.setProps({
                    //                 isModalFullVisible: false,
                    //                 addChatModal: false,
                    //             });
                    //         })
                    //         .catch((error) => {
                    //             console.error('Ошибка при добавлении чата:', error);
                    //         });
                    // }
                },
            }),
            
            ChatHeaderAdd: new ChatHeaderAdd({
                add: "chat_add_on",
                onClick: () => {
                    this.setProps({
                        addChatModal: true,
                        isModalFullVisible: true,
                    });
                },
            }),
            InputAddChat: new Input({
                type: "text",
                name: "title",
                label: "Название чата",
                value: "",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, loginRules);

                    this.children.InputAddChat.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                title: value,
                            },
                        });
                    }
                },
            }),
            ButtonAddChat: new Button({
                label: "Добавить",
                type: "submit",
                className: "primary",
                onClick: (e: Event) => {
                    e.preventDefault();

                    const titleValue = this.props.formState.title;
                    const titleValidation = validateField(titleValue, loginRules);
                    
                    this.children.InputAddChat.setProps({
                        error: titleValidation.error,
                    });

                    if (!titleValidation.error) {
                        const data = {
                            title: titleValue,
                        };

                        chatsAddServices.chatsAdd(data)
                            .then(() => {
                                this.componentDidMount({});
                                this.setProps({
                                    isModalFullVisible: false,
                                    addChatModal: false,
                                });
                            })
                            .catch((error) => {
                                console.error('Ошибка при добавлении чата:', error);
                            });
                    }
                },
            }),

            ChatHeaderDelete: new ChatHeaderDelete({
                delete: "delete",
                onClick: () => {
                    this.setProps({
                        isModalFullVisible: true,
                        deleteChatModal: true,
                    });
                },
            }),
            ButtonCancelDeleteChat: new Button({
                label: "Не удалять",
                type: "button",
                className: "link",
                onClick: (e: Event) => {
                    e.preventDefault();
                    this.setProps({
                        isModalFullVisible: false,
                        deleteChatModal: false,
                    });
                },
            }),
            ButtonDeleteChat: new Button({
                label: "Удалить",
                type: "button",
                className: "primary",
                onClick: (e: Event) => {
                    e.preventDefault();

                    const data = {
                        chatId: this.props.chatID,
                    };
                    chatsDeleteServices.chatsDelete(data)
                        .then(() => {
                            this.componentDidMount({});
                            this.setProps({
                                isModalFullVisible: false,
                                deleteChatModal: false,
                            });
                        })
                        .catch((error) => {
                            console.error('Ошибка при добавлении чата:', error);
                        });
                },
            }),

            ChatHeaderProfile: new ChatHeaderProfile({
                ...props,
                copy: "Профиль",
                onClick: () => {
                    props.router.go(ROUTER.settings);
                },
            }),
            SearchForm: new SearchForm({
                ...props,
                type: "text",
                name: "message",
                placeholder: "Поиск"
            }),
            SendMessageFormExmp
        });

    }

    async componentDidMount(oldProps: any): Promise<void> {

        try {
            const INFINITY_LIMIT = Number.MAX_SAFE_INTEGER;
            const chats = await chatsServices.chats({
                limit: INFINITY_LIMIT
            });

            this.chats = chats;

            ChatListDefault.setProps({
                chats,
                onChangeActiveChat: async (index: number) => {

                    const chatID = this.chats[index].id

                    const token = await fetch(`https://ya-praktikum.tech/api/v2/chats/token/${chatID}`, {
                        method: 'POST',
                        mode: 'cors',
                        credentials: 'include',
                      })
                      .then(response => response.json())
                      .then(data => {
                        return data.token;
                      });

                    const user = await userServices.fetchUser();
                    const userID = user.id

                    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${token}`);
                    console.log(socket)

                    socket.addEventListener('open', () => {
                        console.log('Соединение установлено');

                        socket.send(JSON.stringify({
                            content: '0',
                            type: 'get old',
                        }));
                    });

                    socket.addEventListener('close', event => {
                        if (event.wasClean) {
                            console.log('Соединение закрыто чисто');
                        } else {
                            console.log('Обрыв соединения');
                        }

                        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
                    });

                    socket.addEventListener('message', event => {
                        console.log('Получены данные', event.data);

                        const data = JSON.parse(event.data);

                        if (Array.isArray(data)) {
                            this.children.ChatMessagesFeed = new ChatMessagesFeed({
                                messages: data || [],
                                activeChatItemIndex: index,
                                currentUserId: userID,
                            });
                        } else {
                            socket.send(JSON.stringify({
                                content: '0',
                                type: 'get old',
                            }));
                        }

                        SendMessageFormExmp.setProps({
                            placeholder: `${chatID}`,
                            socket: socket
                        });
                                            
                        this.setProps({
                            activeChatItemIndex: index,
                            activeChat: this.chats[index],
                            chatID: chatID,          
                        });

                    });

                    socket.addEventListener('error', event => {
                        console.log('Ошибка', event.message);
                    });

                }
            });
        } catch (error) {
            console.error('Ошибка при загрузке чатов:', error);
        }
    }

    render(): string {
        const { activeChatItemIndex } = this.props;

        return `
            <aside class="cols-layout__aside">
                <header class="cols-layout__aside-head">
                    {{{ ChatHeaderAdd }}}

                    {{{ ChatHeaderProfile }}}

                    {{{ SearchForm }}}
                </header>
                <div class="cols-layout__aside-body">
                    {{{ ChatListDefault }}}
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

                                <div class="chat__header-dots">
                                    {{{ ChatHeaderDots }}}
                                    {{#if isModalFunctionVisible}}
                                        {{{ ModalFunctionalUser }}}
                                    {{/if}}
                                </div>

                                {{{ ChatHeaderDelete }}}
                            </div>
                        </header>

                        <section class="chat__body">
                            {{{ ChatMessagesFeed }}}
                        </section>

                        <footer class="chat__footer">
                            <div class="chat__footer-inner">
                                {{{ SendMessageFormExmp }}}
                            </div>
                        </footer>
                    </div>
                {{/if}}
            </main>

            {{#if isModalFullVisible}}
                <div class="modal-full-width__wrap">
                    {{{ ModalFullWidthCloser }}}
                    <div class="modal-full-width__popup">
                        <form class="modal-full-width__popup-form">
                            {{#if addChatModal}}
                                <h2 class="modal-full-width__popup-title">Добавить чат</h2>
                                {{{ InputAddChat }}}
                                {{{ ButtonAddChat }}}
                                {{#if chatsAddError}}
                                    <div class="box-form__error bigger center">{{chatsAddError}}</div>
                                {{/if}}
                            {{/if}}

                            {{#if deleteChatModal}}
                                <h2 class="modal-full-width__popup-title">Вы уверены, что хотите удалить этот чат?</h2>
                                {{{ ButtonCancelDeleteChat }}}
                                {{{ ButtonDeleteChat }}}
                                {{#if chatsDeleteError}}
                                    <div class="box-form__error bigger center">{{chatsDeleteError}}</div>
                                {{/if}}
                            {{/if}}

                            {{#if addUserModal}}
                                <h2 class="modal-full-width__popup-title">Добавить пользователя</h2>
                                {{{ InputAddUser }}}
                                {{{ ButtonAddUser }}}
                                {{#if chatsAddUserError}}
                                    <div class="box-form__error bigger center">{{chatsAddUserError}}</div>
                                {{/if}}
                            {{/if}}

                            {{#if deleteUserModal}}
                                <h2 class="modal-full-width__popup-title">Удалить пользователя</h2>
                                {{{ InputDeleteUser }}}
                                {{{ ButtonDeleteUser }}}
                                {{#if chatsDeleteUserError}}
                                    <div class="box-form__error bigger center">{{chatsDeleteUserError}}</div>
                                {{/if}}
                            {{/if}}
                        </form>
                    </div>
                </div>
            {{/if}}
        `;
    }
}

export default withRouter(ChatListPage);
