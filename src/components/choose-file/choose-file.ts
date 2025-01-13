import Block from "../../core/block"; 

type ChooseFileProps = {
    file: string;
    className?: string;
    onClick?: (event: Event) => void;
    onChange?: (event: Event) => void;
}

export default class ChooseFile extends Block {
    constructor(props: ChooseFileProps) {
        super("div", {
            ...props,
            className: `choose-file__wrap`,
            file: props.file,
            events: {
                click: props.onChange,
            },
        });
    }

    public render(): string {
        return `
            <input type="file" id="choose-file__upload" name="avatar" accept="image/*" hidden />
            <label for="choose-file__upload" class="choose-file__link">{{file}}</label>
            <span class="choose-file__chosen"></span>
        `;
    }
}
