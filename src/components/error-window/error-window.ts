import Block from "../../core/block";

type ErrorWindowProps = {
    className?: string;
    title: string;
    copy: string;
    href: string;
    link: string;
}

export default class ErrorWindow extends Block {
    constructor(props: ErrorWindowProps) {
        super("div", {
            ...props,
            className: `error-window__box`,
            title: props.title,
            copy: props.copy,
            href: props.href,
            link: props.link,
        });
    }

    render(): string {
        return `
            <h1 class="error-window__box-title">{{title}}</h1>
            <p class="error-window__box-copy">{{copy}}</p>
            <a class="error-window__box-link" href="{{href}}">{{link}}</a>
        `;
    }
}
