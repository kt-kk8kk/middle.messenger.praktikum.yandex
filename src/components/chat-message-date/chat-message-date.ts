import Block from "../../core/block"; 

type ChatMessageDateProps = {
    className?: string;
    date?: string;
}

export default class ChatMessageDate extends Block {
    constructor(props: ChatMessageDateProps) {
        super("div", {
            ...props,
            className: `chat-message__date`,
            date: props.date,
        });
    }

    public render(): string {
        return `
            {{date}}
        `;
    }
}
