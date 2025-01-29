import { connect } from "../../utils/connect";
import { Input, Button, Spinner } from "../../components";
import Block from "../../core/block";
import { validateField } from "../../utils/validation";
import { emailRules, loginRules, firstNameRules, secondNameRules, phoneRules, passwordRules } from "../../utils/rules";
import { ROUTER } from "../../utils/constants";
import Router from "../../core/Router";
import { withRouter } from "../../utils/withRouter";
import * as regServices from "../../services/reg";
import * as authServices from "../../services/auth";
interface RegPage {
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
    props: RegPageProps
}

interface RegPageProps {
    router: Router,
    formState: {
        login: string
        password: string
        email: string
        first_name: string
        second_name: string
        phone: string
        confirm_password: string
    },
    errors: {
        login: ''
        password: ''
        email: ''
        first_name: ''
        second_name: ''
        phone: ''
        confirm_password: ''
    }
}
interface State {
    isLoading: boolean;
    loginError: string | null;
}
class RegPage extends Block {
    constructor(props: RegPageProps) {
        super("main", {
            ...props,
            formState: {
                email: "",
                login: "",
                first_name: "",
                second_name: "",
                phone: "",
                password: "",
                confirm_password: "",
            },
            errors: {
                email: "",
                login: "",
                first_name: "",
                second_name: "",
                phone: "",
                password: "",
                confirm_password: "",
            },
            className: "box-form__main",
            InputEmail: new Input({
                type: "text",
                name: "email",
                label: "Почта",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, emailRules);

                    this.children.InputEmail.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                email: value,
                            },
                        });
                    }
                },
            }),
            InputLogin: new Input({
                type: "text",
                name: "login",
                label: "Логин",
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
            InputFirstName: new Input({
                type: "text",
                name: "first_name",
                label: "Имя",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, firstNameRules);

                    this.children.InputFirstName.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                first_name: value,
                            },
                        });
                    }
                },
            }),
            InputSecondName: new Input({
                type: "text",
                name: "second_name",
                label: "Фамилия",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, secondNameRules);

                    this.children.InputSecondName.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                second_name: value,
                            },
                        });
                    }
                },
            }),
            InputPhone: new Input({
                type: "tel",
                name: "phone",
                label: "Телефон",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, phoneRules);

                    this.children.InputPhone.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                phone: value,
                            },
                        });
                    }
                },
            }),
            InputPassword: new Input({
                type: "password",
                name: "password",
                label: "Пароль",
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
            InputConfirmPassword: new Input({
                type: "password",
                name: "confirm_password",
                label: "Пароль (ещё раз)",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const password = this.props.formState.password;

                    let error = "";
                    if (value !== password) {
                        error = "Пароли не совпадают";
                    }

                    this.children.InputConfirmPassword.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                confirm_password: value,
                            },
                        });
                    }
                },
            }),
            SignUpButton: new Button({
                label: "Зарегистрироваться",
                type: "submit",
                className: "primary",
                onClick: (e: Event) => {
                    e.preventDefault();

                    const { formState } = this.props;
                    let errors = {};

                    const emailValidation = validateField(formState.email, emailRules);
                    const loginValidation = validateField(formState.login, loginRules);
                    const firstNameValidation = validateField(formState.first_name, firstNameRules);
                    const secondNameValidation = validateField(formState.second_name, secondNameRules);
                    const phoneValidation = validateField(formState.phone, phoneRules);
                    const passwordValidation = validateField(formState.password, passwordRules);
                    const confirmPasswordValidation = formState.confirm_password !== formState.password
                        ? { error: "Пароли не совпадают" }
                        : { error: "" };

                    this.children.InputEmail.setProps({ error: emailValidation.error });
                    this.children.InputLogin.setProps({ error: loginValidation.error });
                    this.children.InputFirstName.setProps({ error: firstNameValidation.error });
                    this.children.InputSecondName.setProps({ error: secondNameValidation.error });
                    this.children.InputPhone.setProps({ error: phoneValidation.error });
                    this.children.InputPassword.setProps({ error: passwordValidation.error });
                    this.children.InputConfirmPassword.setProps({ error: confirmPasswordValidation.error });

                    errors = {
                        email: emailValidation.error,
                        login: loginValidation.error,
                        first_name: firstNameValidation.error,
                        second_name: secondNameValidation.error,
                        phone: phoneValidation.error,
                        password: passwordValidation.error,
                        confirm_password: confirmPasswordValidation.error,
                    };

                    if (!Object.values(errors).some((error) => error)) {
                        const data = {
                            email: formState.email,
                            login: formState.login,
                            first_name: formState.first_name,
                            second_name: formState.second_name,
                            phone: formState.phone,
                            password: formState.password,
                            confirm_password: formState.confirm_password,
                        };
                
                        regServices.reg(data);
                    };
                },
            }),
            SignInButton: new Button({
                label: "Войти",
                type: "button",
                className: "link",
                onClick: () => {
                    props.router.go(ROUTER.auth);
                },
            }),
            Spinner: new Spinner({
                className: "box-form__spinner",
            }),
        });
    }

    async componentDidMount(): Promise<void> {
    
        const isLoggedIn = await authServices.checkLoginUser();

        if (isLoggedIn) {
            return window.router.go(ROUTER.messenger);
        }
        
    }

    public render(): string {
        return `
            <div class="box-form__wrap">
                <div class="box-form">
                    <h2 class="box-form__head">Регистрация</h2>
                    <form class="box-form__reg-form">
                        {{#if isLoading}}
                            {{{ Spinner }}}
                        {{/if}}

                        {{{ InputEmail }}}
                        {{{ InputLogin }}}
                        {{{ InputFirstName }}}
                        {{{ InputSecondName }}}
                        {{{ InputPhone }}}
                        {{{ InputPassword }}}
                        {{{ InputConfirmPassword }}}
                        <div class="box-form__button-fieldset">
                            {{{ SignUpButton }}}
                            {{{ SignInButton }}}
                        </div>
                        
                        {{#if regError}}
                            <div class="box-form__error bigger center">{{regError}}</div>
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

export default withRouter(connect(mapStateToProps)(RegPage));
