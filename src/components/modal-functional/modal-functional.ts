import Block from "../../core/block";

interface ModalFunctionalProps {
    onClick?: () => void;
    modalFunctionalBody: Block[];
}

export default class ModalFunctional extends Block {
    constructor(props: ModalFunctionalProps) {
        super("div", {
            ...props,
            className: "modal-functional__wrap",
            events: {
                click: props.onClick,
            },
            ModalFunctionalBody: props.modalFunctionalBody,
        });
    }

    render(): string {
        return `
            <ul class="modal-functional__list">
                {{#each ModalFunctionalBody}}
                    {{{ this }}}
                {{/each}}
            </ul>
        `;
    }
}
