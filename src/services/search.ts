import UserApi from "../api/user";

const userApi = new UserApi();

export const search = async (model) => {
    window.store.set({ isLoading: true });
    try {
        await userApi.search(model);
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ searchError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
