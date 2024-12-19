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
    props: {
        active: boolean
    }
}
interface ChatListProps {
    chats: Chat[];
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
    badge: number;
    onClick?: (e: Event) => void;
}

class ChatList extends Block {
    constructor(props: ChatListProps) {
        super("ul", {
            ...props,
            className: `chat-list`
        });
    }

    componentDidUpdate(oldProps: any, newProps: any) {
        this.children.chatItems = newProps.chats.map((chat: Chat, index: number) => {
            
            const formattedTime = chat.last_message?.time 
                ? new Date(chat.last_message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : "";

            console.log(chat)

            return new ChatListItem({
                ...chat,
                avatar: chat.avatar,
                name: chat.title,
                //you: chat.you,
                copy: chat.last_message?.content,
                badge: chat.unread_count,
                time: formattedTime,
                //status: chat.status,
                //pic: chat.messageFeed[chat.messageFeed.length - 1].pic,
                onClick: () => {
                    this.props.onChangeActiveChat(index);
                    this.setProps({ activeChatItemIndex: index });
                }
            })
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
