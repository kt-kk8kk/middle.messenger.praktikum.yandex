import Block from "../../core/block";
import Input from "../input/input";
import { validateField } from "../../utils/validation";
import { messageRules } from "../../utils/rules";

type SendMessageFormProps = {
    className?: string;
    name?: string;
    type?: string;
    label?: string;
    error?: string;
    value?: string;
    message?: string;
    placeholder?: string;
    onChange?: () => void;
    onChangeActiveChat?: () => void;
    onBlur?: (e: Event) => void;
    socket: object | null;
};

type SendButtonProps = {
    message?: string
    socket?: WebSocket
    input?: Block
}

interface SendButton {
    socket: WebSocket
    message: string
}

interface SendMessageForm {
    props: {
        socket: WebSocket
        message: string
        name: string
    }
}

class SendButton extends Block {
    constructor(props: SendButtonProps) {
        super("button", {
            ...props,
            className: "send-message__form-button",
            attrs: {
                type: "submit"
            },
            message: props.message,
            socket: props.socket,
            input: props.input,
            events: {
                focus: () => {
                    this.socket.send(JSON.stringify({
                        content: this.message,
                        type: "message",
                    }));
                }
            }
        });
    }

    componentDidUpdate(_oldProps: any, newProps: any): boolean {
        this.socket = newProps.socket;
        this.message = newProps.message;
        return true;
    }

    public render(): string {
        return `
            <span class="material-symbols-outlined">arrow_forward</span>
        `;
    }
}

const SendButtonExmp = new SendButton({});
class SendMessageForm extends Block {
    constructor(props: SendMessageFormProps) {

        super("form", {
            ...props,
            className: "send-message__form",
            message: "",
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    
                    this.props.socket.send(JSON.stringify({
                        content: this.props.message,
                        type: "message",
                    }));
                }
            },
            InputExmp: new Input({
                className: "send-message__form-input",
                type: "text",
                name: props.name || '',
                placeholder: props.placeholder,
                value: props.message,
                events: { 
                    change: (e: Event) => {
                        const value = (e.target as HTMLInputElement).value;
                        const { error } = validateField(value, messageRules);

                        if (!error) {
                            this.setProps({
                                message: value
                            });
                        }
                    },
                    blur: (e: Event) => {
                        const value = (e.target as HTMLInputElement).value;
                        const { error } = validateField(value, messageRules);

                        if (!error) {
                            this.setProps({
                                message: value
                            });
                        }
                    },
                }
            }),
            SendButtonExmp,
        });
    }

    componentDidUpdate(_oldProps: any, newProps: any): boolean {
        const props = newProps;

        SendButtonExmp.setProps({
            socket: props.socket,
            input: props.InputExmp,
            message: props.message
        })

        return true;
    }

    public render(): string {
        return `
            {{{InputExmp}}}
            {{{SendButtonExmp}}}
        `;
    }
}

export default SendMessageForm;
