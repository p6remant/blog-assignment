import { cn } from "@/utils/cn";

interface AlertProps {
  message: string;
  variant?: "error" | "success" | "info" | "warning";
  className?: string;
}

export const Alert = ({
  message,
  variant = "error",
  className,
}: AlertProps) => {
  const variants = {
    error: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
    success:
      "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
    info: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
    warning:
      "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400",
  };

  return (
    <div
      className={cn("p-3 text-sm rounded-lg", variants[variant], className)}
      role="alert"
    >
      {message}
    </div>
  );
};
