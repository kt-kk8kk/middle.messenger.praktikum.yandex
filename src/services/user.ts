import AuthApi from "../api/auth";

const authApi = new AuthApi();

export const fetchUser = async () => {
    window.store.set({ isLoading: true });
    try {
        const user = await authApi.user();
        window.store.set({ user });
        return user;
    } catch (responseError: unknown) {
        if (responseError instanceof Response) {
            const error = await responseError.json();
            window.store.set({ userError: error.reason });
            return error;
        } else {
            console.error("Unexpected error:", responseError);
            window.store.set({ userError: "Unexpected error occurred" });
            return { reason: "Unexpected error occurred" };
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
