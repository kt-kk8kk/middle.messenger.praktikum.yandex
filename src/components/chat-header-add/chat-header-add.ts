import Block from "../../core/block";

type ChatHeaderAddProps = {
    className?: string;
    add?: string;
    onClick?: () => void;
};
export default class ChatHeaderAdd extends Block {
    constructor(props: ChatHeaderAddProps) {
        super("span", {
            ...props,
            className: "chat__header-add",
            add: props.add,
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            <span class="material-symbols-outlined">
                {{add}}
            </span>
        `;
    }
}
