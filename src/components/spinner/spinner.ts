import Block from "../../core/block";

interface SpinnerProps {
    className?: string;
}

export default class Spinner extends Block {
    constructor(props: SpinnerProps) {
        super("div", {
            ...props,
            className: "box-form__spinner",
        });
    }

    public render(): string {
        return `
            <span class="box-form__spinner-loader"></span>
        `;
    }
}
