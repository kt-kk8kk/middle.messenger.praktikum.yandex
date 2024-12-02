import { ChatMessage } from "../chat-message";
import { ChatMessageDate } from "../chat-message-date";
import Block from "../../core/block";

interface ChatMessagesFeed {
    props: ChatMessagesFeedProps
    messages: ChatMessage[]
}
interface ChatMessagesFeedProps {
    messages?: Message[];
    activeChatItemIndex?: number;
}

interface Message {
    copy: string
    status: string
    time: string
    pic: string
    you: boolean
}
class ChatMessagesFeed extends Block {
    constructor(props: ChatMessagesFeedProps) {
        super("div", {
            ...props,
            className: `chat-messages__wrap`,
            messages: props.messages ? props.messages.map(function(message, index): ChatMessage {
                return new ChatMessage({
                    ...message,
                    you: message.you,
                    pic: message.pic,
                    copy: message.copy,
                    status: message.status,
                    time: message.time,
                    active: index === props.activeChatItemIndex,
                })
            }) : [],
            chatMessageDate: new ChatMessageDate({
                date: "19 июня",
            }),
        });
    }

    render() {
        const { activeChatItemIndex } = this.props;

        if (Array.isArray(this.messages)) {
            this.messages.forEach((message, index) => {
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
