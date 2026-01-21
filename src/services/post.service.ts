import { apiClient } from "./apiClient";
import { Post, CreatePostPayload, UpdatePostPayload } from "@/types/post.types";

export const postService = {
  fetchPosts: async (): Promise<Post[]> => {
    return apiClient.GET<Post[]>("/posts");
  },

  fetchPost: async (id: number): Promise<Post> => {
    return apiClient.GET<Post>(`/posts/${id}`);
  },

  createPost: async (payload: CreatePostPayload): Promise<Post> => {
    return apiClient.POST<Post, CreatePostPayload>("/posts", payload);
  },

  updatePost: async (id: number, payload: UpdatePostPayload): Promise<Post> => {
    return apiClient.PUT<Post, UpdatePostPayload>(`/posts/${id}`, payload);
  },

  deletePost: async (id: number): Promise<void> => {
    return apiClient.DELETE<void>(`/posts/${id}`);
  },
};
