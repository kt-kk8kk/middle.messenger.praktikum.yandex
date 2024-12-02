import Block from "../../core/block";

type ChatHeaderDotsEleProps = {
    className?: string;
    dots?: string;
    onClick?: () => void;
};
export default class ChatHeaderDotsEle extends Block {
    constructor(props: ChatHeaderDotsEleProps) {
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
