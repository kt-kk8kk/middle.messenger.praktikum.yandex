import Block from "../../core/block";

interface ErrorProps {
    message: string;
}

export default class Error extends Block {
    constructor(props: ErrorProps) {
        super("div", {
            ...props,
            className: "box-form__error",
        });
    }

    public render(): string {
        return `
            {{message}}
        `;
    }
}
