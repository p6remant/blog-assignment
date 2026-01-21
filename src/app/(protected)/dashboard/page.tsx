"use client";

import { Suspense, useState } from "react";
import { usePosts, useDeletePost } from "@/hooks/usePosts";
import { PostCard } from "@/components/posts/PostCard";
import { Loader } from "@/components/common/Loader";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/common/Button";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { useAuth } from "@/hooks/useAuth";
import { Plus, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

function DashboardContent() {
  const { data: posts, isLoading, error, refetch } = usePosts();
  const deletePost = useDeletePost();
  const { logout, user } = useAuth();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setPostToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    setDeletingId(postToDelete);
    try {
      await deletePost.mutateAsync(postToDelete);
      toast.success("Post deleted successfully");
      setShowDeleteModal(false);
      setPostToDelete(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete post"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral">{user?.name}</span>
              <Link href="/posts/create">
                <Button size="sm" className="gap-2 h-9">
                  <Plus className="h-4 w-4" />
                  Create Post
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-2 h-9"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {isLoading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader size="lg" />
          </div>
        )}

        {error && (
          <ErrorState
            message="Failed to load posts. Please try again."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !error && posts && (
          <>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg mb-4 text-primary">
                  No posts yet. Create your first post!
                </p>
                <Link href="/posts/create">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Post
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={handleDeleteClick}
                    isDeleting={deletingId === post.id}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={deletingId !== null}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
