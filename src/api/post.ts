import { Post } from "@/types/post";
import { api } from "./client";

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts");

  return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);

  return response.data;
};

export const createPost = async (
  title: string,
  body: string,
): Promise<Post> => {
  const response = await api.post<Post>("/posts", {
    title,
    body,
  });

  return response.data;
};