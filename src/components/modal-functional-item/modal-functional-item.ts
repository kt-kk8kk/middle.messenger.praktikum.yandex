import Block from "../../core/block"; 

type ModalFunctionalItemProps = {
    icon: string;
    copy: string;
    className?: string;
    onClick?: (e: Event) => void;
    onClose?: (e: Event) => void;
}

export default class ModalFunctionalItem extends Block {
    constructor(props: ModalFunctionalItemProps) {
        super("li", {
            ...props,
            className: `modal-functional__item`,
            icon: props.icon,
            copy: props.copy,
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            <a class="modal-functional__item-link" href="#">
                <span class="material-symbols-outlined">{{icon}}</span>
                <span class="modal-functional__item-copy">{{copy}}</span>
            </a>
        `;
    }
}
