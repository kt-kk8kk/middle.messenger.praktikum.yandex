import Block from "../../core/block";
import Input from "../input/input";

type SearchFormProps = {
    className?: string;
    name: string;
    type: string;
    label?: string;
    error?: string;
    value?: string;
    placeholder?: string;
    onChange?: () => void;
    onBlur?: (e: Event) => void;
};

export default class SearchForm extends Block {
    constructor(props: SearchFormProps) {
        super("form", {
            ...props,
            className: "search",
            Input: new Input({
                className: "search__input",
                type: props.type,
                name: props.name,
                placeholder: props.placeholder || "",
                value: "",
                events: {
                    change: props.onBlur,
                },
            }),
        });
    }

    public render(): string {
        return `
            <div class="search__input-wrap">
                {{{Input}}}
                <span class="search__icon">
                    <span class="material-symbols-outlined">search</span>
                </span>
            </div>
        `;
    }
}
