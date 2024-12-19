import { ROUTER } from "../utils/constants";
import AuthApi from "../api/auth";

const authApi = new AuthApi();

interface Model {
    login: string;
    password: string;
}

export const login = async (model: Model) => {
    window.store.set({ isLoading: true });
    try {
        await authApi.signin(model);
        window.router.go(ROUTER.messenger);
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ loginError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const checkLoginUser = async () => {
    window.store.set({ isLoading: true });
    try {
        const user = await authApi.user();
        window.router.go(ROUTER.messenger);
        window.store.set({ user });
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ loginError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
