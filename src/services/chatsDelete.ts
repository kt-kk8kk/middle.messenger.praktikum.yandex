import ChatsApi from "../api/chats";
import { ChatsDeleteDTO } from "../api/type";

const chatsApi = new ChatsApi();

export const chatsDelete = async (model: ChatsDeleteDTO) => {
    window.store.set({ isLoading: true });
    try {
        await chatsApi.chatsDelete(model);
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ chatsDeleteError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
