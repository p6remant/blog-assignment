import { AxiosError } from "axios";
import { ApiError } from "@/types/api.types";

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    return {
      message,
      statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "An unexpected error occurred",
  };
};
