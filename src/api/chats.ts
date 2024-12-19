import { HTTPTransport } from "../core/httpTransport";
import {
    APIError,
    ChatsDTO,
    ChatResponse,
    ChatsAddDTO,
    ChatsDeleteDTO,
    ChatsAddUserDTO
} from "./type";

const chatsApi = new HTTPTransport("/");

export default class ChatsApi {
    async chats(data: ChatsDTO): Promise<ChatResponse | APIError> {
        const { limit } = data;
        const url = limit ? `/chats?limit=${limit}` : "/chats";
        const response = await chatsApi.get<ChatResponse>(url);
        return response;
    }

    async chatsAdd(data: ChatsAddDTO): Promise<void | APIError> {
        return chatsApi.post("/chats", { data });
    }

    async chatsDelete(data: ChatsDeleteDTO): Promise<void | APIError> {
        return chatsApi.delete("/chats", { data });
    }

    async chatsAddUser(data: ChatsAddUserDTO): Promise<void | APIError> {
        return chatsApi.put("/chats/users", { data });
    }

    async chatsDeleteUser(): Promise<void | APIError> {
        return chatsApi.delete("/chats/users");
    }
}
