import { ChatMessage } from "../chat-message";
//import { ChatMessageDate } from "../chat-message-date";
import Block from "../../core/block";

interface ChatMessagesFeed {
    props: ChatMessagesFeedProps
    messages: ChatMessage[]
}
interface ChatMessagesFeedProps {
    messages?: Message[];
    activeChatItemIndex?: number;
    currentUserId?: number;
}

interface Message {
    copy: string
    status: string
    time: string
    pic: string
    you: boolean
    content: string
    user_id: number
}
class ChatMessagesFeed extends Block {
    constructor(props: ChatMessagesFeedProps) {

        super("div", {
            ...props,
            className: `chat-messages__wrap`,
            messages: props.messages ? props.messages.reverse().map(function(message, index): ChatMessage {
                
                const messageDate = new Date(message.time);
                const formattedTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                return new ChatMessage({
                    ...message,
                    you: message.user_id === props.currentUserId,
                    pic: message.pic,
                    copy: message.content,
                    status: message.status,
                    time: formattedTime,
                    active: index === props.activeChatItemIndex,
                    currentUserId: props.currentUserId,
                    //messageDate,
                })
            }) : [],
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
            {{#each messages}}
                {{{ this }}}
            {{/each}}
        `;
    }
}

export default ChatMessagesFeed;
