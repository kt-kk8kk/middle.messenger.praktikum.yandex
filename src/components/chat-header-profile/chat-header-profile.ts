import Block from "../../core/block";

type ChatHeaderProfileProps = {
    copy: string;
    className?: string;
    onClick: (e: Event) => void;
}

export default class ChatHeaderProfile extends Block {
    constructor(props: ChatHeaderProfileProps) {
        super("div", {
            ...props,
            className: `cols-layout__aside-profile`,
            copy: props.copy,
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            <a class="cols-layout__aside-profile-link" href="">
                {{copy}}
                <span class="material-symbols-outlined">chevron_right</span>
            </a>
        `;
    }
}

