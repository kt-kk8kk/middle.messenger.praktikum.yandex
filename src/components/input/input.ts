import Block from "../../core/block";

type InputProps = {
    className: string;
    type: string;
    name: string;
    label: string;
    events?: any;
    value?: string;
    onChange?: () => void;
    onBlur?: () => void;
};
export default class Input extends Block {
    constructor(props: InputProps) {
        super("input", {
            ...props,
            attrs: {
                placeholder: "",
                type: props.type,
                name: props.name,
                value: props.value
            },
        });
    }
}
