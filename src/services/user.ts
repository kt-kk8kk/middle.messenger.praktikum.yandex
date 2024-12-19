//import { ROUTER } from "../utils/constants";
import AuthApi from "../api/auth";

const authApi = new AuthApi();

export const fetchUser = async () => {
    window.store.set({ isLoading: true });
    try {
        const user = await authApi.user();

        window.store.set({ user });
        return user;
        //window.router.go(ROUTER.messenger);
    } catch (responseError) {
        const error = await responseError.json();
        window.store.set({ userError: error.reason });
        return error;
    } finally {
        window.store.set({ isLoading: false });
    }
};
