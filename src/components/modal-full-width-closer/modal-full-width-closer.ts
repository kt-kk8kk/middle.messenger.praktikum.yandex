import Block from "../../core/block";

interface ModalFullWidthCloserProps {
    className?: string;
    onClose?: (e: Event) => void;
}

export default class ModalFullWidthCloser extends Block {
    constructor(props: ModalFullWidthCloserProps) {
        super("div", {
            ...props,
            className: "modal-full-width__closer",
            events: {
                click: (e: Event) => {
                    if (e.target === e.currentTarget) {
                        props.onClose?.(e);
                    }
                },
            },
        });
    }
}
