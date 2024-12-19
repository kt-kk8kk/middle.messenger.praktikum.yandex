import ChatsApi from "../api/chats";

const chatsApi = new ChatsApi();

export const chats = async (model) => {
    window.store.set({ isLoading: true });
    try {
        return await chatsApi.chats(model);
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ chatsError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
