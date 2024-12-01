import Block from "../../core/block";
import ChatHeaderDotsEle from "./chatHeaderDotsEle";
import { ModalFunctional } from "../modal-functional";
import { ModalFunctionalItem } from "../modal-functional-item";
import { ModalFullWidth, Input } from "../../components";
import { validateField } from "../../utils/validation";
import { loginRules } from "../../utils/rules";

interface ChatHeaderDots {
    children: { 
        InputLogin: Block;
    }
    props: ChatHeaderDotsProps
}
interface ChatHeaderDotsProps {
    onClick?: () => void;
    onClose?: () => void;
    className?: string;
    dots?: string;
    isModalFunctionVisible?: Block;
    formState?: {
        login: string
    },
    errors?: {
        login: ''
    }
}

class ChatHeaderDots extends Block {
    constructor(props: ChatHeaderDotsProps) {
        super("div", {
            ...props,
            className: "chat__header-dots",
            isModalFunctionVisible: false,
            ChatHeaderDotsEle: new ChatHeaderDotsEle({
                dots: "...",
                onClick: () => {
                    const isVisible = this.props.isModalFunctionVisible
                    this.setProps({
                        isModalFunctionVisible: !isVisible,
                    });
                },
            }),
            addUserModal: false,
            deleteUserModal: false,
            ModalFunctionalAddUser: new ModalFunctional({
                modalFunctionalBody: [
                    new ModalFunctionalItem({
                        icon: "add_circle",
                        copy: "Добавить пользователя",
                        onClick: () => {
                            this.setProps({
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
            ModalFullWidthAddUser: new ModalFullWidth({
                buttonLabel: "Добавить",
                title: "Добавить пользователя",
                body: new Input({
                    type: "text",
                    name: "login",
                    label: "Логин",
                    value: "ivanivanov",
                    onBlur: (e: Event) => {
                        const value = (e.target as HTMLInputElement).value;
                        const { error } = validateField(value, loginRules);
    
                        this.children.InputLogin.setProps({ error });
    
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
                onClose: () => {
                    this.setProps({
                        addUserModal: false,
                        deleteUserModal: false,
                    });
                },
            }),
            ModalFullWidthDeleteUser: new ModalFullWidth({
                buttonLabel: "Удалить",
                title: "Удалить пользователя",
                body: new Input({
                    type: "text",
                    name: "login",
                    label: "Логин",
                    value: "ivanivanov",
                    onBlur: (e: Event) => {
                        const value = (e.target as HTMLInputElement).value;
                        const { error } = validateField(value, loginRules);
    
                        this.children.InputLogin.setProps({ error });
    
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
                onClose: () => {
                    this.setProps({
                        addUserModal: false,
                        deleteUserModal: false,
                    });
                },
            }),
        })
    }

    render(): string {
        return `
            {{{ ChatHeaderDotsEle }}}
            {{#if isModalFunctionVisible}}
                {{{ ModalFunctionalAddUser }}}
                {{{ ModalFunctionalDeleteUser }}}
                {{#if addUserModal}}
                    {{{ ModalFullWidthAddUser }}}
                {{/if}}
                {{#if deleteUserModal}}
                    {{{ ModalFullWidthDeleteUser }}}
                {{/if}}
            {{/if}}
        `;
    }
}

export default ChatHeaderDots;
