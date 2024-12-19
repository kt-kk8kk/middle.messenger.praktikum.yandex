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
                    messageDate,
                    date: messageDate,
                })
            }) : [],
            chatMessageDate: new ChatMessageDate({
                date: "",
            }),
        });
    }

    render() {
        const { activeChatItemIndex } = this.props;
        let lastMessageDate: Date | null = null;

        if (Array.isArray(this.messages)) {
            this.messages.forEach((message, index) => {
                const messageDate = message.messageDate;

                // Проверяем, изменился ли день с последнего сообщения
                if (!lastMessageDate || messageDate.toDateString() !== lastMessageDate.toDateString()) {
                    // Если день изменился, показываем новую дату
                    message.setProps({ date: messageDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) });
                    lastMessageDate = messageDate; // Обновляем дату последнего сообщения
                } else {
                    // Если день не изменился, скрываем дату
                    message.setProps({ date: "" });
                }

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
