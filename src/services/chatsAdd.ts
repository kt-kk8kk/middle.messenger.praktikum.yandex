import ChatsApi from "../api/chats";
import { ChatsAddDTO } from "../api/type";

const chatsApi = new ChatsApi();

export const chatsAdd = async (model: ChatsAddDTO): Promise<void> => {
    window.store.set({ isLoading: true });
    try {
        await chatsApi.chatsAdd(model);
    } catch (responsError) {
        if (responsError instanceof Response) {
            const error = await responsError.json();
            window.store.set({ chatsAddError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responsError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
