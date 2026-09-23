import { create } from "zustand";

interface ProfileState {
  name: string;
  email: string;
  avatar?: string;

  updateProfile: (name: string, email: string) => void;

  updateAvatar: (uri: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: "John Doe",
  email: "john@example.com",
  avatar: undefined,

  updateProfile: (name, email) =>
    set({
      name,
      email,
    }),

  updateAvatar: (avatar) =>
    set({
      avatar,
    }),
}));