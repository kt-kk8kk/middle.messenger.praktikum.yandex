import UserApi from "../api/user";

const userApi = new UserApi();
interface ProfileAvatarResponse {
    avatar?: string;
}
interface APIError {
    reason: string;
}
interface UserDTO {
    id?: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name?: string;
    avatar?: string;
    phone: string;
    email: string;
}

export const profileAvatar = async (formData: FormData): Promise<ProfileAvatarResponse | void> => {
    window.store.set({ isLoading: true });

    try {
        const response: UserDTO | APIError = await userApi.profileAvatar(formData);   
        if ((response as APIError).reason) {
            const error = response as APIError;
            window.store.set({ profileAvatarError: error.reason });
            return;
        }
        const userResponse = response as UserDTO;
        const avatarUrl = userResponse.avatar || "";
        window.store.set({ avatarUrl });
        return userResponse;
    } catch (responseError: unknown) {
        if (responseError instanceof Response) {
            const error = await responseError.json();
            window.store.set({ profileAvatarError: error.reason });
        } else {
            console.error("Unexpected error:", responseError);
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};
