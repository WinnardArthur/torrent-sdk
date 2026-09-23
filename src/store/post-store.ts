import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

import { Post } from "../types/post";
import { getPosts } from "@/api/post";

interface PostStore {
  posts: Post[];
  loading: boolean;

  fetchPosts: () => Promise<void>;
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      posts: [],
      loading: false,

      fetchPosts: async () => {
        set({ loading: true });

        try {
          const posts = await getPosts();

          set({
            posts: posts.slice(0, 20),
          });
        } finally {
          set({
            loading: false,
          });
        }
      },

      addPost: (post) =>
        set((state) => ({
          posts: [post, ...state.posts],
        })),

      updatePost: (post: Post) =>
        set((state) => ({
          posts: state.posts.map((p) => (p.id === post.id ? post : p)),
        })),
    }),
    {
      name: "posts-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);