import Block from "../../core/block"; 

type ProfileBackProps = {
    className?: string;
    onClick?: (e: Event) => void;
}

export default class ProfileBack extends Block {
    constructor(props: ProfileBackProps) {
        super("div", {
            ...props,
            className: `profile__back`,
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            <span class="profile__back-btn">
                <span class="material-symbols-outlined">arrow_left_alt</span>
            </span>
        `;
    }
}
