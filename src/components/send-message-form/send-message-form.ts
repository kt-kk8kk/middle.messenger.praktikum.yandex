import Block from "../../core/block";
import Input from "../input/input";

type SendMessageFormProps = {
    className?: string;
    name?: string;
    type?: string;
    label?: string;
    error?: string;
    value?: string;
    placeholder?: string;
    onChange?: () => void;
    onBlur?: (e: Event) => void;
    socket: object;
};

class SendButton extends Block {
    constructor(props: SendButtonProps) {

        super("button", {
            ...props,
            className: "send-message__form-button",
            message: props.message,
            socket: props.socket,
            input: props.input,
            events: {
                click: (e: Event) => {
                    // e.preventDefault();
                    this.socket.send(JSON.stringify({
                        content: this.message,
                        type: 'message',
                    }));
                }
            }
        });
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        this.socket = newProps.socket;
        this.message =  newProps.message;
    }

    public render(): string {
        return `
            <span class="material-symbols-outlined">arrow_forward</span>
        `;
    }
}

const SendButtonExmp = new SendButton({});
export default class SendMessageForm extends Block {
    constructor(props: SendMessageFormProps) {

        super("div", {
            ...props,
            className: "send-message__form",
            message: "",
            InputExmp: new Input({
                className: "send-message__form-input",
                type: "text",
                name: props.name,
                placeholder: props.placeholder,
                value: props.message,
                events: { 
                    change: (e: Event) => {
                        const value = (e.target as HTMLInputElement).value;

                        this.setProps({
                            message: value
                        });
                    }
                }
            }),
            SendButtonExmp
        });
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
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
