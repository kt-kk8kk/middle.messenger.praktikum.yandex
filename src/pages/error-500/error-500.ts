import Block from "../../core/block";
import { ErrorWindow } from "../../components";

type Error500PageProps = {
    className: string;
}

export default class Error500Page extends Block {
    constructor(props: Error500PageProps) {
        super("main", {
            ...props,
            className: `error-window__wrap`,
            ErrorWindow: new ErrorWindow({
                title: "500",
                copy: "Мы уже фиксим",
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
