"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { CreatePostPayload, UpdatePostPayload } from "@/types/post.types";

// get all posts
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => postService.fetchPosts(),
  });
};

// get a single post
export const usePost = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => postService.fetchPost(id),
    enabled: !!id,
  });
};

// create a new post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postService.createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// update a post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePostPayload }) =>
      postService.updatePost(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
    },
  });
};

// delete a post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
