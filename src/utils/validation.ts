export type ValidationResult = {
    error?: string;
    isValid: boolean;
};
    
export type ValidationRules = {
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
    required?: boolean;
    containsUppercase?: boolean;
    containsDigit?: boolean;
    phoneNumber?: boolean;
    firstLetterUppercase?: boolean; // Новое правило для проверки первой заглавной буквы
    nameFormat?: boolean; // Новое правило для проверки формата имени (латиница или кириллица, первая буква заглавная)
};

export function validateField(value: string, rules: ValidationRules): ValidationResult {
    let error = "";

    // Проверка на обязательность поля
    if (rules.required && !value) {
        error = "Это поле обязательно для заполнения.";
    }

    // Проверка на минимальную длину
    if (rules.minLength && value.length < rules.minLength) {
        error = `Поле должно содержать минимум ${rules.minLength} символов.`;
    }

    // Проверка на максимальную длину
    if (rules.maxLength && value.length > rules.maxLength) {
        error = `Поле не должно превышать ${rules.maxLength} символов.`;
    }

    // Проверка на регулярное выражение (если оно передано)
    if (rules.regex && !rules.regex.test(value)) {
        error = "Некорректное значение.";
    }

    // Проверка на заглавную букву в имени и фамилии
    if (rules.firstLetterUppercase && value && value[0] !== value[0].toUpperCase()) {
        error = "Первая буква должна быть заглавной.";
    }

    // Проверка на латиницу или кириллицу, только буквы и дефис (если установлено соответствующее правило)
    if (rules.nameFormat && value && !/^[A-ЯЁA-Za-zЁа-яё-]+$/.test(value)) {
        error = "Поле должно содержать только буквы (латиница или кириллица) и дефис.";
    }

    // Проверка на заглавные буквы (если задано)
    if (rules.containsUppercase && !/[A-Z]/.test(value)) {
        error = "Поле должно содержать хотя бы одну заглавную букву.";
    }

    // Проверка на цифры
    if (rules.containsDigit && !/\d/.test(value)) {
        error = "Поле должно содержать хотя бы одну цифру.";
    }

    // Проверка на номер телефона (формат с плюсом или без)
    if (rules.phoneNumber && !/^\+?\d{10,15}$/.test(value)) {
        error = "Номер телефона должен содержать от 10 до 15 цифр и может начинаться с плюса.";
    }

    return {
        isValid: !error,
        error,
    };
}
