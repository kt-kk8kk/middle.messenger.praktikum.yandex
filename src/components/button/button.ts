import Block from "../../core/block"; 

type ButtonProps = {
    label: string;
    type: string;
    className: string;
    onClick?: (event: Event) => void;
}

export default class Button extends Block {
    constructor(props: ButtonProps) {
        super("button", {
            ...props,
            className: `box-form__button box-form__button-${props.className}`,
            attrs: {
                type: props.type
            },
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            {{label}}
        `;
    }
}
