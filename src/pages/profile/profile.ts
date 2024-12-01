import { InputProfile, AvatarProfile, Button, ModalFullWidth, ChooseFile } from "../../components";
import { InputProfileDefault, InputProfileLink } from "../../components/input-profile";
import Block from "../../core/block";
import { validateField } from "../../utils/validation";
import { emailRules, loginRules, firstNameRules, secondNameRules, phoneRules, passwordRules } from "../../utils/rules";

export default class ProfilePage extends Block {
    constructor(props) {
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
            AvatarProfile: new AvatarProfile({
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
            InputProfileDefaultEmail: new InputProfileDefault({
                label: "Почта",
                value: "pochta@yandex.ru",
            }),
            InputProfileDefaultLogin: new InputProfileDefault({
                label: "Логин",
                value: "ivanivanov",
            }),
            InputProfileDefaultFirstName: new InputProfileDefault({
                label: "Имя",
                value: "Иван",
            }),
            InputProfileDefaultSecondName: new InputProfileDefault({
                label: "Фамилия",
                value: "Иванов",
            }),
            InputProfileDefaultDisplayName: new InputProfileDefault({
                label: "Имя в чате",
                value: "Ivan",
            }),
            InputProfileDefaultPhone: new InputProfileDefault({
                label: "Телефон",
                value: "+7 (909) 967 30 30",
            }),
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
                onClick: () => {
                    console.log("Save Data");
                },
            }),
            SavePasswordButton: new Button({
                label: "Сохранить",
                type: "submit",
                className: "primary",
                onClick: () => {
                    console.log("Save Password");
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
                
            }),
            ModalFullWidthChangeAvatar: new ModalFullWidth({
                buttonLabel: "Поменять",
                title: "Загрузите файл",
                body: new ChooseFile({
                    file: "Выбрать файл на компьютере",
                }),
                onClose: () => {
                    this.setProps({
                        isAvatarChangeVisible: false,
                    });
                },
            }),
        })
    }

    public render(): string {
        return `
            <main class="profile__box">
                <form class="profile__form">
                    {{{ AvatarProfile }}}
                    <h2 class="profile__name">Иван</h2>
                    <div class="profile__form-inner">
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
            {{> ProfileBack }}
            {{#if isAvatarChangeVisible}}
                {{{ ModalFullWidthChangeAvatar }}}
            {{/if}}
        `;
    }
}
