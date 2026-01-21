"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost, useUpdatePost } from "@/hooks/usePosts";
import { Loader } from "@/components/common/Loader";
import { ErrorState } from "@/components/common/ErrorState";
import { Input } from "@/components/common/Input";
import { Textarea } from "@/components/common/Textarea";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";
import {
  updatePostSchema,
  type UpdatePostFormData,
} from "@/validations/post.schema";
import { ArrowLeft, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);
  const { data: post, isLoading, error, refetch } = usePost(postId);
  const updatePost = useUpdatePost();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePostFormData>({
    resolver: zodResolver(updatePostSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        body: post.body,
      });
    }
  }, [post, reset]);

  const onSubmit = async (data: UpdatePostFormData) => {
    try {
      await updatePost.mutateAsync({
        id: postId,
        payload: data,
      });
      toast.success("Post updated successfully!");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update post";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:opacity-85 font-medium transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader size="lg" />
          </div>
        )}

        {error && (
          <ErrorState
            message="Failed to load post. Please try again."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !error && post && (
          <div className="p-8 border border-primary rounded-lg">
            <h1 className="text-2xl font-bold mb-8 text-primary">Edit Post</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {updatePost.isError && (
                <Alert
                  message={
                    updatePost.error instanceof Error
                      ? updatePost.error.message
                      : "Failed to update post"
                  }
                  variant="error"
                />
              )}

              <Input
                label="Title"
                type="text"
                {...register("title")}
                error={errors.title?.message}
                placeholder="Enter post title"
              />

              <Textarea
                label="Content"
                {...register("body")}
                error={errors.body?.message}
                rows={10}
                placeholder="Enter post content"
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  isLoading={isSubmitting || updatePost.isPending}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Update Post
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
