import Block from "../../core/block";
import { ErrorWindow } from "../../components";

type Error404PageProps = {
    className: string;
}

export default class Error404Page extends Block {
    constructor(props: Error404PageProps) {
        super("main", {
            ...props,
            className: `error-window__wrap`,
            ErrorWindow: new ErrorWindow({
                title: "404",
                copy: "Не туда попали",
                href: "#",
                link: "Назад к чатам",
            }),
        });
    }

    public render(): string {
        return `
            {{{ ErrorWindow }}}
        `;
    }
}
