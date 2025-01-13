import { ROUTER } from "../utils/constants";
import UserApi from "../api/user";

const userApi = new UserApi();

interface Model {
    id?: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name?: string;
    avatar?: string;
    phone: string;
    email: string;
}

export const profile = async (model: Model) => {
    window.store.set({ isLoading: true });
    try {
        await userApi.profile(model);
        window.router.go(ROUTER.settings);
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ profileError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
