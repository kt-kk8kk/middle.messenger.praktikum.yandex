import { ROUTER } from "../utils/constants";
import AuthApi from "../api/auth";

const authApi = new AuthApi();

export const logout = async () => {
    window.store.set({ isLoading: true });
    try {
        await authApi.logout();
        window.router.go(ROUTER.auth);
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ logoutError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
