import { ChatListItem } from "../chat-list-item";
import Block from "../../core/block";

interface ChatList {
    children: { 
        chatItems: Chat[]
    }
    props: ChatListProps
}

interface Chat extends Block {
    avatar: string
    you: string
    copy: string
    name: string
    status: string
    messageFeed: ChatListItemProps[]
    time: string
    badge: string
    title: string
    unread_count: number
    last_message: {
        time: string
        content: string
    }
    props: {
        active: boolean
    }
}
interface ChatListProps {
    chats?: Chat[];
    activeChatItemIndex?: number;
    onChangeActiveChat: (index: number) => void;
}

type ChatListItemProps = {
    avatar?: string;
    name?: string;
    copy?: string;
    time?: string;
    you?: string;
    pic?: string;
    status?: string;
    badge?: number;
    onClick?: (e: Event) => void;
}

class ChatList extends Block {
    constructor(props: ChatListProps) {
        super("ul", {
            ...props,
            className: `chat-list`
        });
    }

    componentDidUpdate(_oldProps: any, newProps: any) {
        this.children.chatItems = newProps.chats.map((chat: Chat, index: number) => {

            const lastMessageTime = chat.last_message?.time;

            let formattedTime = "";
            let formattedDate = "";

            if (lastMessageTime) {
                const messageDate = new Date(lastMessageTime);
                const currentDate = new Date();

                if (messageDate.toDateString() === currentDate.toDateString()) {
                    formattedTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                } else {
                    const day = messageDate.getDate();
                    const month = messageDate.getMonth() + 1;
                    const year = messageDate.getFullYear();

                    const formattedDay = day < 10 ? `0${day}` : `${day}`;
                    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

                    formattedDate = `${formattedDay}.${formattedMonth}.${year}`;
                }
            }

            const displayDateOrTime = formattedDate || formattedTime;

            return new ChatListItem({
                ...chat,
                avatar: chat.avatar,
                name: chat.title,
                copy: chat.last_message?.content,
                badge: chat.unread_count,
                time: displayDateOrTime,
                onClick: () => {
                    this.props.onChangeActiveChat(index);
                    this.setProps({ activeChatItemIndex: index });
                }
            });
        });

        return true;
    }

    render(): string {
        const { activeChatItemIndex } = this.props;
        const { chatItems } = this.children;

        chatItems?.forEach((chat: Chat, index: number) => {
            if (index === activeChatItemIndex) {
                chat.setProps({ active: true });
                return;
            }
        
            if (chat.props.active) {
                chat.setProps({ active: false });
            }
        });


        return `
            {{#each chatItems}}
                {{{ this }}}
            {{/each}}
        `;
    }
}

export default ChatList;
