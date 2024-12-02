import Block from "../../core/block";

type InputProps = {
    className: string;
    type: string;
    name: string;
    label?: string;
    events?: object;
    value?: string;
    placeholder?: string;
    onChange?: () => void;
    onBlur?: () => void;
};
export default class Input extends Block {
    constructor(props: InputProps) {
        super("input", {
            ...props,
            attrs: {
                placeholder: props.placeholder || "",
                type: props.type,
                name: props.name,
                value: props.value || ""
            },
        });
    }
}
