import ChatsApi from "../api/chats";

const chatsApi = new ChatsApi();

export const chatsGetToken = async (chatID: number) => {
    window.store.set({ isLoading: true });
    try {
        const token = await chatsApi.chatsGetToken(chatID);

        return token;
    } catch (responseError) {
        if (responseError instanceof Response) {
            const error = await responseError.json();
            window.store.set({ chatsGetTokenError: error.reason });
        } else {
            console.error("Неизвестная ошибка:", responseError);
        }
        
        return {token: ''};

    } finally {
        window.store.set({ isLoading: false });
    }
};
