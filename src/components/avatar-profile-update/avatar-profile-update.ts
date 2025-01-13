import Block from "../../core/block";

type AvatarProfileUpdateProps = {
    className?: string;
    change: string;
    onClick?: (e: Event) => void;
    onClose?: (e: Event) => void;
};
export default class AvatarProfileUpdate extends Block {
    constructor(props: AvatarProfileUpdateProps) {
        super("span", {
            ...props,
            className: "avatar-profile__change",
            change: props.change,
            events: {
                click: props.onClick,
                close: props.onClose,
            },
        });
    }

    public render(): string {
        return `
            {{change}}
        `;
    }
}
