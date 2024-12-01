import Block from "../../core/block";
import Input from "./input";

type InputFieldProps = {
    className?: string;
    name: string;
    type: string;
    label: string;
    error?: string;
    value?: string;
    onChange?: (e: Event) => void;
    onBlur?: (e: Event) => void;
};

export default class InputField extends Block {
    constructor(props: InputFieldProps) {
        super("div", {
            ...props,
            className: "box-form__fieldset",
            Input: new Input({
                className: "box-form__input",
                label: props.label,
                type: props.type,
                name: props.name,
                value: props.value,
                events: {
                    change: props.onBlur,
                },
            }),
        });
    }

    public render(): string {
        return `
            <label class="box-form__input-wrapper">
                {{{Input}}}
                <span class="box-form__input-label">{{label}}</span>
            </label>
            {{#if error}}
                <div class="box-form__error">{{error}}</div>
            {{/if}}
        `;
    }
}
