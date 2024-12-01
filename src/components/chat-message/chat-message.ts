import Block from "../../core/block"; 

type ChatMessageProps = {
    you?: boolean;
    pic?: string;
    className: string;
    copy?: string;
    status?: string;
    time?: string;
    onClick?: (e: Event) => void;
}

export default class ChatMessage extends Block {
    constructor(props: ChatMessageProps) {
        super("div", {
            ...props,
            className: `chat-message__item${props.you ? ' chat-message__item-you' : ''}${props.pic ? ' chat-message__item-pic' : ''}`,
            you: props.you,
            pic: props.pic,
            copy: props.copy,
            status: props.status,
            time: props.time,
        });
    }

    public render(): string {
        return `
            {{#if pic}}
                <img src="{{pic}}" alt="" />
            {{else}}
                <div class="chat-message__copy">{{copy}}</div>
            {{/if}}
            {{#if status}}
                <span class="chat-message__status chat-message__status-{{status}}">{{status}}</span>
            {{/if}}
            <span class="chat-message__time">{{time}}</span>
        `;
    }
}
