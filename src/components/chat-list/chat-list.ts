import { ChatListItem } from "../chat-list-item";
import Block from "../../core/block";

interface ChatList {
    children: { 
        chats: Chat[]
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
    avatar: string;
    name: string;
    copy: string;
    time: string;
    you: string;
    pic: string;
    status: string;
    onClick?: (e: Event) => void;
}

class ChatList extends Block {
    constructor(props: ChatListProps) {
        super("ul", {
            ...props,
            className: `chat-list`,
            chats: props.chats.map((chat: Chat, index: number) => 
                new ChatListItem({
                    ...chat,
                    avatar: chat.avatar,
                    name: chat.name,
                    you: chat.you,
                    copy: chat.messageFeed[chat.messageFeed.length - 1].copy,
                    time: chat.messageFeed[chat.messageFeed.length - 1].time,
                    status: chat.status,
                    pic: chat.messageFeed[chat.messageFeed.length - 1].pic,
                    onClick: () => {
                        props.onChangeActiveChat(index);
                        this.setProps({ activeChatItemIndex: index });
                    }
                })
            ),
        });
    }

    render(): string {
        const { activeChatItemIndex } = this.props;
        const { chats } = this.children;

        chats.forEach((chat: Chat, index: number) => {
            if (index === activeChatItemIndex) {
                chat.setProps({ active: true });
                return;
            }
        
            if (chat.props.active) {
                chat.setProps({ active: false });
            }
        });

        return `
            {{#each chats}}
                {{{ this }}}
            {{/each}}
        `;
    }
}

export default ChatList;
