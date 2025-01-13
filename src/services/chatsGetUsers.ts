import ChatsApi from "../api/chats";
interface Model {
    chatId: number;
}

const chatsApi = new ChatsApi();

export const chatsGetUsers = async (model: Model): Promise<any | void> => {
    window.store.set({ isLoading: true });
    try {
        const user = await chatsApi.chatsGetUsers(model);
        return user;
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ chatsGetUsersError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
