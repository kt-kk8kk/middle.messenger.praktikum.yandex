import UserApi from "../api/user";
import {
    findUserRequest,
} from "../api/type";

const userApi = new UserApi();

export const search = async (model: findUserRequest) => {
    window.store.set({ isLoading: true });
    try {
        const user = await userApi.search(model);

        return user;

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
