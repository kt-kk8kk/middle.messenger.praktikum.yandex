import Block from "../../core/block";
import { Button } from "../button";

interface ModalFullWidthProps {
    title: string;
    buttonLabel: string;
    id?: string;
    body: Block;
    onClose?: (e: Event) => void;
    onClick?: (e: Event) => void;
    formState?: {
        title: string
    },
    errors?: {
        title: ""
    },
}

export default class ModalFullWidth extends Block {
    constructor(props: ModalFullWidthProps) {
        super("div", {
            ...props,
            className: "modal-full-width__wrap",
            id: props.id,
            title: props.title,
            Body: props.body,
            Button: new Button({
                label: props.buttonLabel,
                className: "primary",
                type: "submit",
                onClick: props.onClick,
            }),
            events: {
                click: (e: Event) => {
                    if (e.target === e.currentTarget) {
                        props.onClose?.(e);
                    }
                },
            },
        });
    }

    render(): string {
        return `
            <div class="modal-full-width__popup">
                <form class="modal-full-width__popup-form" {{#if id}}id="{{id}}"{{/if}}>
                    <h2 class="modal-full-width__popup-title">{{title}}</h2>
                    {{{ Body }}}
                    {{{ Button }}}
                </form>
            </div>
        `;
    }
}
