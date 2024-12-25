import UserApi from "../api/user";

const userApi = new UserApi();
interface Model {
    oldPassword: string,
    newPassword: string,
}

export const password = async (model: Model) => {
    window.store.set({ isLoading: true });
    try {
        await userApi.password(model);
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ passwordError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
