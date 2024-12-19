import Block from "../../core/block";

type InputProfileDefaultProps = {
    className?: string;
    label: string;
    value?: string;
};

export default class InputProfileDefault extends Block {
    constructor(props: InputProfileDefaultProps) {
        super("div", {
            ...props,
            className: "profile__fieldset"
        });
    }

    public render(): string {
        return `
            <label class="profile__input-wrapper">
                <span class="profile__input-label">{{label}}</span>
                <span class="profile__input-default">{{value}}</span>
            </label>
        `;
    }
}
