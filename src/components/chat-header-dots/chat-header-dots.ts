import Block from "../../core/block";

type ChatHeaderDotsProps = {
    className?: string;
    dots?: string;
    onClick?: () => void;
};
export default class ChatHeaderDots extends Block {
    constructor(props: ChatHeaderDotsProps) {
        super("span", {
            ...props,
            className: "chat__header-dots-ele",
            dots: props.dots,
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            {{dots}}
        `;
    }
}
