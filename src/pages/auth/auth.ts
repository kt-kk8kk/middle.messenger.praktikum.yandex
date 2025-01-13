import { connect } from "../../utils/connect";
import { Input, Button, Spinner } from "../../components";
import Block from "../../core/block";
import { validateField } from "../../utils/validation";
import { loginRules, passwordRules } from "../../utils/rules";
import { ROUTER } from "../../utils/constants";
import Router from "../../core/Router";
import { withRouter } from "../../utils/withRouter";
import * as authServices from "../../services/auth";
interface AuthPage {
    children: { 
        InputEmail: Block,
        InputLogin: Block,
        InputFirstName: Block,
        InputSecondName: Block,
        InputDisplayName: Block,
        InputPhone: Block,
        InputPassword: Block,
        InputConfirmPassword: Block
    }
    props: AuthPageProps
}
interface AuthPageProps {
    router: Router,
    formState: {
        login: string
        password: string
    },
    errors: {
        login: ""
        password: ""
    },
    isLoading: boolean;
    loginError: string | null;
}
interface State {
    isLoading: boolean;
    loginError: string | null;
}
class AuthPage extends Block {
    constructor(props: AuthPageProps) {
        super("main", {
            ...props,
            className: "box-form__main",
            formState: {
                login: "",
                password: "",
            },
            errors: {
                login: "",
                password: "",
            },
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
                        const data = {
                            login: loginValue,
                            password: passwordValue,
                        };
                
                        authServices.login(data);
                    }
                },
            }),
            SignUpButton: new Button({
                label: "Нет аккаунта?",
                type: "button",
                className: "link",
                onClick: () => {
                    props.router.go(ROUTER.signUp);
                },
            }),
            Spinner: new Spinner({
                className: "box-form__spinner",
            }),
        });
    }

    async componentDidMount(_oldProps: any): Promise<void> {

        const isLoggedIn = await authServices.checkLoginUser();

        if (isLoggedIn) {
            return window.router.go(ROUTER.messenger);
        }
        
    }

    public render(): string {
        return `
            <div class="box-form__wrap">
                <div class="box-form">
                    <h2 class="box-form__head">Вход</h2>
                    <form class="box-form__auth-form">
                        {{#if isLoading}}
                            {{{ Spinner }}}
                        {{/if}}
                    
                        {{{ InputLogin }}}
                        {{{ InputPassword }}}
                        <div class="box-form__button-fieldset">
                            {{{ SignInButton }}}
                            {{{ SignUpButton }}}
                        </div>
                        {{#if loginError}}
                            <div class="box-form__error bigger center">{{loginError}}</div>
                        {{/if}}
                    </form>
                </div>
            </div>
        `;
    }
}

const mapStateToProps = (state: State) => {
    return {
        isLoading: state.isLoading,
        loginError: state.loginError,
    };
};

export default withRouter(connect(mapStateToProps)(AuthPage));
