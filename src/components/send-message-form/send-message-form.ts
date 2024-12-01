import Block from "../../core/block";
import Input from "../input/input";

type SendMessageFormProps = {
    className?: string;
    name: string;
    type: string;
    label?: string;
    error?: string;
    value?: string;
    placeholder?: string;
    onChange?: () => void;
    onBlur?: (e: Event) => void;
};

export default class SendMessageForm extends Block {
    constructor(props: SendMessageFormProps) {
        super("form", {
            ...props,
            className: "send-message__form",
            Input: new Input({
                className: "send-message__form-input",
                type: props.type,
                name: props.name,
                placeholder: props.placeholder || "",
                value: "",
                events: {
                    change: props.onBlur,
                },
            }),
        });
    }

    public render(): string {
        return `
            {{{Input}}}
            <button class="send-message__form-button">
                <span class="material-symbols-outlined">arrow_forward</span>
            </button>
        `;
    }
}
