import { Input, Button } from "../../components";
import Block from "../../core/block";
import { validateField } from "../../utils/validation";
import { loginRules, passwordRules } from "../../utils/rules";

export default class AuthPage extends Block {
    constructor(props) {
        super("main", {
            ...props,
            formState: {
                login: "",
                password: "",
            },
            errors: {
                login: "",
                password: "",
            },
            className: "box-form__main",
            InputLogin: new Input({
                type: "text",
                name: "login",
                label: "Логин",
                value: "",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, loginRules);

                    this.children.InputLogin.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                login: value,
                            },
                        });
                    }
                },
            }),
            InputPassword: new Input({
                type: "password",
                name: "password",
                label: "Пароль",
                value: "",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, passwordRules);

                    this.children.InputPassword.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                password: value,
                            },
                        });
                    }
                },
            }),
            SignInButton: new Button({
                label: "Войти",
                type: "submit",
                className: "primary",
                onClick: (e: Event) => {
                    e.preventDefault();

                    const loginValue = this.props.formState.login;
                    const passwordValue = this.props.formState.password;

                    const loginValidation = validateField(loginValue, loginRules);
                    const passwordValidation = validateField(passwordValue, passwordRules);

                    this.children.InputLogin.setProps({
                        error: loginValidation.error,
                    });
                    this.children.InputPassword.setProps({
                        error: passwordValidation.error,
                    });

                    if (!loginValidation.error && !passwordValidation.error) {
                        console.log({
                            login: loginValue,
                            password: passwordValue,
                        });
                    }
                },
            }),
            SignUpButton: new Button({
                label: "Нет аккаунта?",
                type: "button",
                className: "link",
                onClick: () => {
                    console.log("Redirecting to sign-up page...");
                },
            }),
        });
    }

    public render(): string {
        return `
            <div class="box-form__wrap">
                <div class="box-form">
                    <h2 class="box-form__head">Вход</h2>
                    <form class="box-form__auth-form">
                        {{{ InputLogin }}}
                        {{{ InputPassword }}}
                        <div class="box-form__button-fieldset">
                            {{{ SignInButton }}}
                            {{{ SignUpButton }}}
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
}
