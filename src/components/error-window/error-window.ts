import Block from "../../core/block";
import { Button } from "../../components";
import { ROUTER } from "../../utils/constants";
import Router from "../../core/Router";

type ErrorWindowProps = {
    className?: string;
    title: string;
    copy: string;
    onClick?: (event: Event) => void;
    router: Router;
}

export default class ErrorWindow extends Block {
    constructor(props: ErrorWindowProps) {
        super("div", {
            ...props,
            className: `error-window__box`,
            title: props.title,
            copy: props.copy,
            ErrorGoBack: new Button({
                type: "button",
                className: "link",
                label: "Назад к чатам",
                onClick: () => {
                    props.router.go(ROUTER.messenger);
                },
            }),
        });
    }

    render(): string {
        return `
            <h1 class="error-window__box-title">{{title}}</h1>
            <p class="error-window__box-copy">{{copy}}</p>
            {{{ ErrorGoBack }}}
        `;
    }
}
