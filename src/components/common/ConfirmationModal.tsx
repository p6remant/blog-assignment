"use client";

import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/utils/cn";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const variantStyles = {
    danger: {
      icon: "text-red-400",
      button: "bg-red-500 hover:bg-red-700 focus:ring-red-500",
    },
    warning: {
      icon: "text-yellow-400",
      button: "bg-yellow-500 hover:bg-yellow-700 focus:ring-yellow-500",
    },
    info: {
      icon: "text-blue-400",
      button: "bg-blue-500 hover:bg-blue-700 focus:ring-blue-500",
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      showCloseButton={!isLoading}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className={cn("shrink-0", currentVariant.icon)}>
            <AlertTriangle className="h-6 w-6" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="border-white text-white"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            isLoading={isLoading}
            className={cn(currentVariant.button, "text-white")}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
