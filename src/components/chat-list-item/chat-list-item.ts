import Block from "../../core/block";

type ChatListItemProps = {
    className: string;
    onClick?: (e: Event) => void;
}

export default class ChatListItem extends Block {
    constructor(props: ChatListItemProps) {
        super("li", {
            ...props,
            className: `chat-list__item`,
            events: {
                click: props.onClick,
            },
        });
    }

    render(): string {
        return `
            <div class="chat-list__item-inner{{#if active}} chat-list__item-active{{/if}}">
                <div class="chat-list__item-position">
                    <span class="chat-list__item-avatar">
                        {{#if avatar}}
                            <img src="{{avatar}}" alt="avatar" />
                        {{/if}}
                    </span>
                    <div class="chat-list__item-info">
                        <h4 class="chat-list__item-name">{{name}}</h4>
                        <div class="chat-list__item-copy">
                            {{#if you}}
                                <span class="chat-list__item-copy-you">{{you}}</span>
                            {{/if}}
                            {{copy}}
                        </div>
                    </div>
                    <div class="chat-list__item-meta">
                        <span class="chat-list__item-time">{{time}}</span>
                        {{#if badge}}
                            <span class="chat-list__item-badge">{{badge}}</span>
                        {{/if}}
                    </div>
                </div>
            </div>
        `;
    }
}
