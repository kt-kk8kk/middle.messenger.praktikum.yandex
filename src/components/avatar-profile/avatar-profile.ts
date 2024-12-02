import Block from "../../core/block";

type AvatarProfileProps = {
    className?: string;
    avatar?: string;
    change?: string;
    onClick?: (e: Event) => void;
    onClose?: (e: Event) => void;
};

export default class AvatarProfile extends Block {
    constructor(props: AvatarProfileProps) {
        super("div", {
            ...props,
            className: "avatar-profile",
            change: props.change,
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            {{#if avatar}}
                <img class="avatar-profile__img" src="{{avatar}}" alt="" />
            {{/if}}
            <span class="avatar-profile__change">{{change}}</span>
        `;
    }
}
