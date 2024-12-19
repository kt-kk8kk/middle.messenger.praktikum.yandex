import Block from "../../core/block";

type ChatHeaderDeleteProps = {
    className?: string;
    delete?: string;
    onClick?: () => void;
};
export default class ChatHeaderDelete extends Block {
    constructor(props: ChatHeaderDeleteProps) {
        super("span", {
            ...props,
            className: "chat__header-delete",
            delete: props.delete,
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            <span class="material-symbols-outlined">
                {{delete}}
            </span>
        `;
    }
}
