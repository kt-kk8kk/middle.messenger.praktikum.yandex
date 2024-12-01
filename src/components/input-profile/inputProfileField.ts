import Block from "../../core/block";
import Input from "../input/input";

type InputProfileFieldProps = {
    className?: string;
    name?: string;
    type?: string;
    label: string;
    error?: string;
    value?: string;
    onChange?: () => void;
    onBlur?: (e: Event) => void;
};

export default class InputProfileField extends Block {
    constructor(props: InputProfileFieldProps) {
        super("div", {
            ...props,
            className: "profile__fieldset",
            Input: new Input({
                className: "profile__input",
                label: props.label,
                type: props.type,
                name: props.name,
                value: "",
                events: {
                    change: props.onBlur,
                },
            }),
        });
    }

    public render(): string {
        return `
            <label class="profile__input-wrapper">
                <span class="profile__input-label">{{label}}</span>
                {{{Input}}}
            </label>
            {{#if error}}
                <div class="box-form__error">{{error}}</div>
            {{/if}}
        `;
    }
}
