import { HTTPTransport } from "../core/httpTransport";
import {
    APIError,
    UserDTO,
    PasswordDTO,
} from "./type";

const userApi = new HTTPTransport("/user");

export default class UserApi {
    async profile(data: UserDTO): Promise<void | APIError> {
        return userApi.put("/profile", { data });
    }

    async profileAvatar(formData: FormData): Promise<void | APIError> {
        return userApi.put("/profile/avatar", {
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    async password(data: PasswordDTO): Promise<void | APIError> {
        return userApi.put("/password", { data });
    }

    async search(): Promise<void | APIError> {
        return userApi.post("/search");
    }
}
