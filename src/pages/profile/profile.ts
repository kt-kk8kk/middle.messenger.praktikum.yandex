import { InputProfile, AvatarProfile, AvatarProfileUpdate, Button, ModalFullWidth, ChooseFile, ProfileBack, Spinner } from "../../components";
import { InputProfileDefault, InputProfileLink } from "../../components/input-profile";
import Block from "../../core/block";
import { validateField } from "../../utils/validation";
import { emailRules, loginRules, firstNameRules, secondNameRules, phoneRules, passwordRules } from "../../utils/rules";
import { ROUTER } from "../../utils/constants";
import Router from "../../core/Router";
import { withRouter } from "../../utils/withRouter";
import { connect } from "../../utils/connect";
import * as logoutServices from "../../services/logout";
import * as userServices from "../../services/user";
import * as profileServices from "../../services/profile";
import * as passwordServices from "../../services/password";

const apiUrl = "https://ya-praktikum.tech/api/v2/";

const InputProfileDefaultLogin = new InputProfileDefault({
    label: "Логин",
    value: ""
})

const InputProfileDefaultEmail = new InputProfileDefault({
    label: "Почта",
    value: "",
});

const InputProfileDefaultFirstName = new InputProfileDefault({
    label: "Имя",
    value: "",
});

const InputProfileDefaultSecondName = new InputProfileDefault({
    label: "Фамилия",
    value: "",
});

const InputProfileDefaultDisplayName = new InputProfileDefault({
    label: "Имя в чате",
    value: "",
});

const InputProfileDefaultPhone = new InputProfileDefault({
    label: "Телефон",
    value: "",
});

const AvatarProfileDefault = new AvatarProfile({
    avatar: "",
});

interface ProfilePage {
    children: { 
        InputProfileEmail: Block,
        InputProfileLogin: Block,
        InputProfileFirstName: Block,
        InputProfileSecondName: Block,
        InputProfileDisplayName: Block,
        InputProfilePhone: Block,
        InputProfileOldPassword: Block,
        InputProfileNewPassword: Block,
        InputProfileConfirmNewPassword: Block
    }
    props: ProfilePageProps
}

interface ProfilePageProps {
    router: Router,
    formState: {
        email: string
        login: string
        first_name:	string
        second_name: string
        display_name: string
        phone: string
        oldPassword: string
        newPassword: string
        confirmNewPassword?: string
    },
    errors: {
        email: ""
        login: ""
        first_name:	""
        second_name: ""
        display_name: ""
        phone: ""
        password: ""
        newPassword?: ""
        confirmNewPassword?: ""
    },
    user: {
        id:	number
        email: string
        login: string
        first_name:	string
        second_name: string
        display_name: string
        phone: string
        avatar:	object
    }
}

class ProfilePage extends Block {
    constructor(props: ProfilePageProps) {
        super("div", {
            ...props,
            className: "profile__wrap",
            formState: {
                email: "",
                login: "",
                first_name: "",
                second_name: "",
                display_name: "",
                phone: "",
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            },
            errors: {
                email: "",
                login: "",
                first_name: "",
                second_name: "",
                display_name: "",
                phone: "",
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            },
            isDefaultVisible: true,
            isDataChangeVisible: false,
            isPasswordChangeVisible: false,
            isAvatarChangeVisible: false,
            AvatarProfileDefault,
            AvatarProfileUpdate: new AvatarProfileUpdate({
                change: "Поменять аватар",
                onClick: () => {
                    this.setProps({
                        isAvatarChangeVisible: true,
                    });
                },
                onClose: () => {
                    this.setProps({
                        isAvatarChangeVisible: false,
                    });
                },
            }),
            InputProfileDefaultEmail,
            InputProfileDefaultLogin,
            InputProfileDefaultFirstName,
            InputProfileDefaultSecondName,
            InputProfileDefaultDisplayName,
            InputProfileDefaultPhone,
            InputProfileEmail: new InputProfile({
                type: "text",
                name: "email",
                label: "Почта",
                value: "",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, emailRules);

                    this.children.InputProfileEmail.setProps({ error });

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
            InputProfileLogin: new InputProfile({
                type: "text",
                name: "login",
                label: "Логин",
                value: "",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, loginRules);

                    this.children.InputProfileLogin.setProps({ error });

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
            InputProfileFirstName: new InputProfile({
                type: "text",
                name: "first_name",
                label: "Имя",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, firstNameRules);

                    this.children.InputProfileFirstName.setProps({ error });

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
            InputProfileSecondName: new InputProfile({
                type: "text",
                name: "second_name",
                label: "Фамилия",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, secondNameRules);

                    this.children.InputProfileSecondName.setProps({ error });

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
            InputProfileDisplayName: new InputProfile({
                type: "text",
                name: "display_name",
                label: "Имя в чате",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, loginRules);

                    this.children.InputProfileDisplayName.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                display_name: value,
                            },
                        });
                    }
                },
            }),
            InputProfilePhone: new InputProfile({
                type: "tel",
                name: "phone",
                label: "Телефон",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, phoneRules);

                    this.children.InputProfilePhone.setProps({ error });

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
            InputProfileOldPassword: new InputProfile({
                type: "password",
                name: "oldPassword",
                label: "Старый пароль",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, passwordRules);

                    this.children.InputProfileOldPassword.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                oldPassword: value,
                            },
                        });
                    }
                },
            }),
            InputProfileNewPassword: new InputProfile({
                type: "password",
                name: "newPassword",
                label: "Новый пароль",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const { error } = validateField(value, passwordRules);

                    this.children.InputProfileNewPassword.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                newPassword: value,
                            },
                        });
                    }
                },
            }),
            InputProfileConfirmNewPassword: new InputProfile({
                type: "password",
                name: "confirmNewPassword",
                label: "Повторите новый пароль",
                onBlur: (e: Event) => {
                    const value = (e.target as HTMLInputElement).value;
                    const newPassword = this.props.formState.newPassword;

                    let error = "";
                    if (value !== newPassword) {
                        error = "Пароли не совпадают";
                    }

                    this.children.InputProfileConfirmNewPassword.setProps({ error });

                    if (!error) {
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                confirmNewPassword: value,
                            },
                        });
                    }
                },
            }),
            SaveDataButton: new Button({
                label: "Сохранить",
                type: "submit",
                className: "primary",
                onClick: (e: Event) => {
                    e.preventDefault();

                    const { formState } = this.props;
                    let errors = {};

                    const profileEmailValidation = validateField(formState.email, emailRules);
                    const profileLoginValidation = validateField(formState.login, loginRules);
                    const profileFirstNameValidation = validateField(formState.first_name, firstNameRules);
                    const profileSecondNameValidation = validateField(formState.second_name, secondNameRules);
                    const profilePhoneValidation = validateField(formState.phone, phoneRules);

                    this.children.InputProfileEmail.setProps({ error: profileEmailValidation.error });
                    this.children.InputProfileLogin.setProps({ error: profileLoginValidation.error });
                    this.children.InputProfileFirstName.setProps({ error: profileFirstNameValidation.error });
                    this.children.InputProfileSecondName.setProps({ error: profileSecondNameValidation.error });
                    this.children.InputProfilePhone.setProps({ error: profilePhoneValidation.error });

                    errors = {
                        email: profileEmailValidation.error,
                        login: profileLoginValidation.error,
                        first_name: profileFirstNameValidation.error,
                        second_name: profileSecondNameValidation.error,
                        phone: profilePhoneValidation.error,
                    };

                    if (!Object.values(errors).some((error) => error)) {
                        const data = {
                            email: formState.email,
                            login: formState.login,
                            first_name: formState.first_name,
                            second_name: formState.second_name,
                            phone: formState.phone,
                        };
                
                        profileServices.profile(data);
                    };

                    this.setProps({
                        isDefaultVisible: true,
                        isDataChangeVisible: false,
                        isPasswordChangeVisible: false,
                        isAvatarChangeVisible: false,
                    });
                },
            }),
            SavePasswordButton: new Button({
                label: "Сохранить",
                type: "submit",
                className: "primary",
                onClick: (e: Event) => {
                    e.preventDefault();

                    const { formState } = this.props;
                    let errors = {};

                    const profileOldPasswordValidation = validateField(formState.oldPassword, passwordRules);
                    const profileNewPasswordValidation = validateField(formState.newPassword, passwordRules);
                    const profileConfirmNewPasswordValidation = formState.confirmNewPassword !== formState.newPassword
                        ? { error: "Пароли не совпадают" }
                        : { error: "" };

                    this.children.InputProfileOldPassword.setProps({ error: profileOldPasswordValidation.error });
                    this.children.InputProfileNewPassword.setProps({ error: profileNewPasswordValidation.error });
                    this.children.InputProfileConfirmNewPassword.setProps({ error: profileConfirmNewPasswordValidation.error });

                    errors = {
                        password: profileOldPasswordValidation.error,
                        newPassword: profileNewPasswordValidation.error,
                        confirmNewPassword: profileConfirmNewPasswordValidation.error,
                    };

                    if (!Object.values(errors).some((error) => error)) {
                        const data = {
                            oldPassword: formState.oldPassword,
                            newPassword: formState.newPassword
                        };
                
                        passwordServices.password(data);
                        this.setProps({
                            isDefaultVisible: true,
                            isDataChangeVisible: false,
                            isPasswordChangeVisible: false,
                            isAvatarChangeVisible: false,
                        });
                    };
                },
            }),
            InputProfileLinkChangeData: new InputProfileLink({
                label: "Изменить данные",
                onClick: () => {
                    this.setProps({
                        isDefaultVisible: false,
                        isDataChangeVisible: true,
                        isPasswordChangeVisible: false,
                        isAvatarChangeVisible: false,
                    });
                },
                
            }),
            InputProfileLinkChangePassword: new InputProfileLink({
                label: "Изменить пароль",
                onClick: () => {
                    this.setProps({
                        isDefaultVisible: false,
                        isPasswordChangeVisible: true,
                        isDataChangeVisible: false,
                        isAvatarChangeVisible: false,
                    });
                },
            }),
            InputProfileLinkLogout: new InputProfileLink({
                logout: true,
                label: "Выйти",
                onClick: () => {
                    logoutServices.logout({});
                },
                
            }),
            ModalFullWidthChangeAvatar: new ModalFullWidth({
                buttonLabel: "Поменять",
                title: "Загрузите файл",
                id: "file-form",
                body: new ChooseFile({
                    file: "Выбрать файл на компьютере",
                    onChange: () => {
                        const actualBtn = document.getElementById("choose-file__upload") as HTMLInputElement;
                        const fileChosen = document.getElementsByClassName("choose-file__chosen")[0] as HTMLElement;
                        const fileLink = document.getElementsByClassName("choose-file__link")[0] as HTMLElement;
                        if (fileLink) {
                            fileLink.style.display = "block";
                        }
                        if (fileChosen) {
                            fileChosen.style.display = "none";
                        }

                        if (actualBtn) {
                            actualBtn.addEventListener("change", function() {
                                if (this.files && this.files[0]) {
                                    if (fileLink) {
                                        fileLink.style.display = "none";
                                    }
                                    if (fileChosen) {
                                        fileChosen.style.display = "block";
                                        fileChosen.textContent = this.files[0].name;
                                    }
                                } else {
                                    if (fileLink) {
                                        fileLink.style.display = "block";
                                    }
                                    if (fileChosen) {
                                        fileChosen.style.display = "none";
                                    }
                                }
                            });
                        }
                    }
                }),
                onClick: (event: Event) => {
                    event.preventDefault();
                    const host = "https://ya-praktikum.tech";
                    const myUserForm = document.getElementById("file-form");
                    
                    if (myUserForm instanceof HTMLFormElement) {
                        const form = new FormData(myUserForm);
                        fetch(`${host}/api/v2/user/profile/avatar`, {
                            method: "PUT",
                            credentials: "include",
                            mode: "cors",
                            body: form,
                        })
                        .then(response => response.json())
                        .then(data => {
                            AvatarProfileDefault.setProps({
                                avatar: `${apiUrl}resources${data.avatar}`,
                            })
                            return data;
                        });
                        this.setProps({
                            isAvatarChangeVisible: false,
                        });
                    } else {
                        console.error("Form not found!");
                    }
                },
                onClose: () => {
                    this.setProps({
                        isAvatarChangeVisible: false,
                    });
                },
            }),
            ProfileBack: new ProfileBack({
                onClick: () => {
                    props.router.go(ROUTER.messenger);
                },
            }),
            Spinner: new Spinner({
                className: "box-form__spinner",
            }),
        })
    }

    componentDidMount(oldProps: any): void {

        userServices.fetchUser().then(() => {
            const user = this.props.user;

            if (user) {
                InputProfileDefaultLogin.setProps({
                    value: user.login
                });

                InputProfileDefaultEmail.setProps({
                    value: user.email
                });

                InputProfileDefaultFirstName.setProps({
                    value: user.first_name
                })

                InputProfileDefaultSecondName.setProps({
                    value: user.second_name
                })

                InputProfileDefaultDisplayName.setProps({
                    value: user.display_name
                })

                InputProfileDefaultPhone.setProps({
                    value: user.phone
                })
                
                AvatarProfileDefault.setProps({
                    avatar: `${apiUrl}resources${user.avatar}`,
                })
            }

        });

    }

    public render(): string {
        return `
            <main class="profile__box">
                <form class="profile__form">
                    <div class="avatar-profile">
                        {{{ AvatarProfileDefault }}}
                         {{{ AvatarProfileUpdate }}}
                    </div>
                    <h2 class="profile__name">{{{user.login}}}</h2>
                    <div class="profile__form-inner">
                        {{#if isLoading}}
                            {{{ Spinner }}}
                        {{/if}}

                        {{#if isDefaultVisible}}
                            {{{ InputProfileDefaultEmail }}}
                            {{{ InputProfileDefaultLogin }}}
                            {{{ InputProfileDefaultFirstName }}}
                            {{{ InputProfileDefaultSecondName }}}
                            {{{ InputProfileDefaultDisplayName }}}
                            {{{ InputProfileDefaultPhone }}}
                        {{/if}}

                        {{#if isDataChangeVisible}}
                            {{{ InputProfileEmail }}}
                            {{{ InputProfileLogin }}}
                            {{{ InputProfileFirstName }}}
                            {{{ InputProfileSecondName }}}
                            {{{ InputProfileDisplayName }}}
                            {{{ InputProfilePhone }}}
                        {{/if}}

                        {{#if isPasswordChangeVisible}}
                            {{{ InputProfileOldPassword }}}
                            {{{ InputProfileNewPassword }}}
                            {{{ InputProfileConfirmNewPassword }}}
                        {{/if}}
                    </div>
                    <div class="profile__form-foot">
                        {{#if isDefaultVisible}}
                            {{{ InputProfileLinkChangeData }}}
                            {{{ InputProfileLinkChangePassword }}}
                            {{{ InputProfileLinkLogout }}}
                        {{/if}}

                        {{#if isDataChangeVisible}}
                            {{{ SaveDataButton }}}
                        {{/if}}

                        {{#if isPasswordChangeVisible}}
                            {{{ SavePasswordButton }}}
                        {{/if}}
                    </div>
                </form>
            </main>

            {{{ ProfileBack }}}

            {{#if isAvatarChangeVisible}}
                {{{ ModalFullWidthChangeAvatar }}}
            {{/if}}
        `;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        loginError: state.loginError,
        user: state.user
    };
};

export default withRouter(connect(mapStateToProps)(ProfilePage));
