import { ChatMessage } from "../chat-message";
import { ChatMessageDate } from "../chat-message-date";
import Block from "../../core/block";

interface ChatMessagesFeed {
    props: ChatMessagesFeedProps
}
interface ChatMessagesFeedProps {
    messages?: any;
    activeChatItemIndex?: number;
}
class ChatMessagesFeed extends Block {
    constructor(props: ChatMessagesFeedProps) {
        super("div", {
            ...props,
            className: `chat-messages__wrap`,
            messages: props.messages ? props.messages.map((message: any, index: number) => 
                new ChatMessage({
                    ...message,
                    you: message.you,
                    pic: message.pic,
                    copy: message.copy,
                    status: message.status,
                    time: message.time,
                    active: index === props.activeChatItemIndex,
                })
            ) : [],
            chatMessageDate: new ChatMessageDate({
                date: "19 июня",
            }),
        });
    }

    render() {
        const { messages, activeChatItemIndex } = this.props;

        if (Array.isArray(messages)) {
            messages.forEach((message, index) => {
                message.setProps({ active: index === activeChatItemIndex });
            });
        }

        return `
            {{{ chatMessageDate }}}
            {{#each messages}}
                {{{ this }}}
            {{/each}}
        `;
    }
}

export default ChatMessagesFeed;
