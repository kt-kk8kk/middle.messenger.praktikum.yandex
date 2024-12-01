import { ChatListItem } from "../chat-list-item";
import Block from "../../core/block";

interface ChatListProps {
    chats?: any;
    activeChatItemIndex?: number;
    onChangeActiveChat?: (index: number) => void;
}

export default class ChatList extends Block {
    constructor(props: ChatListProps) {
        super("ul", {
            ...props,
            className: `chat-list`,
            chats: props.chats.map((chat: any, index: number) => 
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
                        console.trace({index});
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

        chats.forEach((chat, index) => {
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
