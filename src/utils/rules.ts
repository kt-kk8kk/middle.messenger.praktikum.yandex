// utils/rules.ts

export const firstNameRules = {
    minLength: 1,
    maxLength: 50,
    regex: /^[A-ЯЁA-Za-zЁа-яё-]+$/, // Латиница, кириллица, дефис
    required: true,
    customValidator: (value: string) => {
        // Проверяем, что первая буква заглавная, а затем могут идти строчные буквы
        const regex = /^[A-ЯЁA-Za-zЁа-яё]+$/;
        if (value && value.length > 0) {
            if (!regex.test(value)) {
                return "Имя должно содержать только буквы и дефис, а первая буква должна быть заглавной.";
            }
            if (value[0] !== value[0].toUpperCase()) {
                return "Первая буква должна быть заглавной.";
            }
        }
        return "";
    }
};

export const secondNameRules = {
    minLength: 1,
    maxLength: 50,
    regex: /^[A-ЯЁA-Za-zЁа-яё-]+$/, // Латиница, кириллица, дефис
    required: true,
    customValidator: (value: string) => {
        // Проверяем, что первая буква заглавная, а затем могут идти строчные буквы
        const regex = /^[A-ЯЁA-Za-zЁа-яё]+$/;
        if (value && value.length > 0) {
            if (!regex.test(value)) {
                return "Фамилия должна содержать только буквы и дефис, а первая буква должна быть заглавной.";
            }
            if (value[0] !== value[0].toUpperCase()) {
                return "Первая буква должна быть заглавной.";
            }
        }
        return "";
    }
};

export const loginRules = {
    minLength: 3,
    maxLength: 20,
    regex: /^[a-zA-Z0-9_-]+$/, // Латиница, цифры, дефис, нижнее подчеркивание
    required: true,
};

export const emailRules = {
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Проверка на email
    required: true,
};

export const passwordRules = {
    minLength: 8,
    maxLength: 40,
    containsUppercase: true,
    containsDigit: true,
    required: true,
};

export const phoneRules = {
    phoneNumber: true, // Для телефонов с плюсом и без
    required: true,
};

export const messageRules = {
    required: true, // Сообщение не может быть пустым
};
