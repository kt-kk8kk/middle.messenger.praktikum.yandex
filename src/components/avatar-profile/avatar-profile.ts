import Block from "../../core/block";

type AvatarProfileProps = {
    className?: string;
    avatar?: string;
};

export default class AvatarProfile extends Block {
    constructor(props: AvatarProfileProps) {
        super("div", {
            ...props,
            className: "avatar-profile__img-wrap",
        });
    }

    public render(): string {
        return `
            {{#if avatar}}
                <img class="avatar-profile__img" src="{{avatar}}" alt="Avatar" />
            {{/if}}
        `;
    }
}
