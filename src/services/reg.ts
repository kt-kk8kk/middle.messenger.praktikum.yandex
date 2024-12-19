import { ROUTER } from "../utils/constants";
import AuthApi from "../api/auth";

const authApi = new AuthApi();

export const reg = async (model) => {
    window.store.set({ isLoading: true });
    try {
        await authApi.signup(model);
        window.router.go(ROUTER.messenger);
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ regError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
