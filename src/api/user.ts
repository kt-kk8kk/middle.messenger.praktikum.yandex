import { HTTPTransport } from "../core/httpTransport";
import {
    APIError,
    UserDTO,
    PasswordDTO,
    findUserRequest,
} from "./type";

const userApi = new HTTPTransport("/user");

export default class UserApi {
    async profile(data: UserDTO): Promise<UserDTO | APIError> {
        return userApi.put("/profile", { data });
    }

    async profileAvatar(formData: FormData): Promise<UserDTO | APIError> {
        return userApi.put("/profile/avatar", {
            data: formData,
            isBinary: true
        });
    }

    async password(data: PasswordDTO): Promise<UserDTO | APIError> {
        return userApi.put("/password", { data });
    }

    async search(data: findUserRequest): Promise<UserDTO | APIError> {
        return userApi.post("/search", { data });
    }
}
