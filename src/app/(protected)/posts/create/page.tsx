"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePost } from "@/hooks/usePosts";
import { useAuthStore } from "@/store/auth.store";
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

export default function CreatePostPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuthStore();
  const createPost = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePostFormData>({
    resolver: zodResolver(updatePostSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: UpdatePostFormData) => {
    setError("");

    if (!user) {
      setError("User not found");
      return;
    }

    try {
      await createPost.mutateAsync({
        ...data,
        userId: user.id,
      });
      toast.success("Post created successfully!");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create post";
      setError(errorMessage);
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
        <div className="p-8 border border-primary rounded-lg">
          <h1 className="text-2xl font-bold mb-8 text-primary">
            Create New Post
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && <Alert message={error} variant="error" />}

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
                isLoading={isSubmitting || createPost.isPending}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Create Post
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
      </main>
    </div>
  );
}
