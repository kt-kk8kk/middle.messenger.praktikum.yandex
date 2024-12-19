import ChatsApi from "../api/chats";

const chatsApi = new ChatsApi();

export const chatsDeleteUser = async (model) => {
    window.store.set({ isLoading: true });
    try {
        await chatsApi.chatsDeleteUser(model);
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ chatsDeleteUserError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
