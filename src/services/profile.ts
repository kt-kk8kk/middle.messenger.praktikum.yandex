import { ROUTER } from "../utils/constants";
import UserApi from "../api/user";

const userApi = new UserApi();

export const profile = async (model) => {
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
