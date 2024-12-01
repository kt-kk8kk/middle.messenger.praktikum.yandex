import Block from "../../core/block"; 

type ChooseFileProps = {
    file: string;
    className?: string;
    onClick?: (event: Event) => void;
}

export default class ChooseFile extends Block {
    constructor(props: ChooseFileProps) {
        super("div", {
            ...props,
            className: `choose-file__wrap`,
            file: props.file,
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            <a class="choose-file__link" href="">{{file}}</a>
        `;
    }
}
