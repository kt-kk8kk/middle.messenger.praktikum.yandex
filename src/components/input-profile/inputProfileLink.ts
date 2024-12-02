import Block from "../../core/block";

type InputProfileLinkProps = {
    className?: string;
    label: string;
    logout?: boolean;
    onClick?: () => void;
};

export default class InputProfileLink extends Block {
    constructor(props: InputProfileLinkProps) {
        super("div", {
            ...props,
            className: "profile__fieldset",
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            <label class="profile__input-wrapper">
                <span class="profile__input-label{{#if logout}} profile__input-label-logout{{/if}}">
                    <a href="#">{{label}}</a>
                </span>
            </label>
        `;
    }
}
