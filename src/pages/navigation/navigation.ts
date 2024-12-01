import Block from "../../core/block"; 

type ButtonProps = {
    className: string;
    onClick?: (event: Event) => void;
}

export default class Button extends Block {
    constructor(props: ButtonProps) {
        super("main", {
            ...props,
            className: `box-form__main`,
            events: {
                click: props.onClick,
            },
        });
    }

    public render(): string {
        return `
            <div class="box-form__wrap">
                <div class="box-form">
                    <h2 class="box-form__head">Список страниц</h2>
                    <nav>
                        <ul>
                            <li><a href="#" page="auth">Авторизация</a><br /><br /></li>
                            <li><a href="#" page="registration">Регистрация</a><br /><br /></li>
                            <li><a href="#" page="chat-list">Список чатов</a><br /><br /></li>
                            <li><a href="#" page="profile">Профиль</a><br /><br /></li>
                            <li><a href="#" page="error-404">404</a><br /><br /></li>
                            <li><a href="#" page="error-500">500</a><br /><br /></li>
                        </ul>
                    </nav>
                </div>
            </div>
        `;
    }
}
