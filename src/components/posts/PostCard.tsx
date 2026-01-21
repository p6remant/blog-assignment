"use client";

import { Post } from "@/types/post.types";
import { cn } from "@/utils/cn";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  post: Post;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
  className?: string;
}

export const PostCard = ({
  post,
  onDelete,
  isDeleting = false,
  className,
}: PostCardProps) => {
  return (
    <div className={cn("p-6 border border-primary rounded-lg", className)}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold line-clamp-2 text-primary">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 ml-4">
          <Link
            href={`/posts/${post.id}/edit`}
            className="text-neutral hover:opacity-85 transition-opacity"
            aria-label="Edit post"
          >
            <Edit className="w-5 h-5" />
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Delete post"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      <p className="mb-4 line-clamp-3 text-neutral">{post.body}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral">User ID: {post.userId}</span>
      </div>
    </div>
  );
};
