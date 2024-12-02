import Block from "../../core/block";
import { Button } from "../button";

interface ModalFullWidthProps {
    title: string;
    buttonLabel: string;
    body: Block;
    onClose?: (e: Event) => void;
}

export default class ModalFullWidth extends Block {
    constructor(props: ModalFullWidthProps) {
        super("div", {
            ...props,
            className: "modal-full-width__wrap",
            title: props.title,
            events: {
                click: (e: Event) => {
                    if (e.target === e.currentTarget) {
                        props.onClose?.(e);
                    }
                },
            },
            Button: new Button({
                label: props.buttonLabel,
                className: "primary",
                type: "submit",
            }),
            Body: props.body,
        });
    }

    render(): string {
        return `
            <div class="modal-full-width__popup">
                <form class="modal-full-width__popup-form">
                    <h2 class="modal-full-width__popup-title">{{title}}</h2>
                    {{{ Body }}}
                    {{{ Button }}}
                </form>
            </div>
        `;
    }
}
