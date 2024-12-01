import { ChatMessage } from "../chat-message";
import { ChatMessageDate } from "../chat-message-date";
import Block from "../../core/block";

interface ChatMessagesFeedProps {
    messages?: any; // Массив сообщений
    activeChatItemIndex?: number; // Индекс активного сообщения (не обязательно для этого компонента, но полезно для активного состояния)
}

export default class ChatMessagesFeed extends Block {
    constructor(props: ChatMessagesFeedProps) {
        console.trace(props);
        super("div", {
            ...props,
            className: `chat-messages__wrap`,
            // Генерация ChatMessage для каждого сообщения
            messages: props.messages ? props.messages.map((message: any, index: number) => 
                new ChatMessage({
                    ...message, // Распаковываем все свойства текущего сообщения
                    you: message.you,
                    pic: message.pic,
                    copy: message.copy,
                    status: message.status,
                    time: message.time,
                    active: index === props.activeChatItemIndex, // Активируем сообщение, если оно соответствует индексу
                })
            ) : [], // Если сообщений нет, передаем пустой массив
            chatMessageDate: new ChatMessageDate({
                date: "19 июня", // Вы можете передать дату динамически
            }),
        });
    }

    render() {
        const { messages, activeChatItemIndex } = this.props;

        // Если messages не пустой массив
        if (Array.isArray(messages)) {
            messages.forEach((message, index) => {
                message.setProps({ active: index === activeChatItemIndex }); // Обновляем активный статус для каждого сообщения
            });
        }

        // Шаблон с обработкой сообщений и дат
        return `
            {{{ chatMessageDate }}}
            {{#each messages}}
                {{{ this }}}
            {{/each}}
        `;
    }
}
