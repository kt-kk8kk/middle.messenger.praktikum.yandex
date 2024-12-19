import UserApi from "../api/user";

const userApi = new UserApi();

export const profileAvatar = async (formData: FormData) => {
    window.store.set({ isLoading: true });
    try {
        const response = await userApi.profileAvatar(formData);
        const avatarUrl = response.avatarUrl;
        window.store.set({ avatarUrl });
    } catch (responsError) {
        const error = await responsError.json();
        window.store.set({ profileAvatarError: error.reason });
    } finally {
        window.store.set({ isLoading: false });
    }
};
