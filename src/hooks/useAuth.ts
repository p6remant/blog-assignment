"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";
import { LoginPayload, RegisterPayload } from "@/types/auth.types";
import toast from "react-hot-toast";

export const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, token, isAuthenticated, login, logout, setUser } =
    useAuthStore();

  const handleLogin = async (payload: LoginPayload) => {
    try {
      const response = await authService.login(payload);
      login(response.user, response.token);
      toast.success("Login successful!");
      const redirect = searchParams.get("redirect");
      router.push(redirect || "/dashboard");
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const handleRegister = async (payload: RegisterPayload) => {
    try {
      const response = await authService.register(payload);
      login(response.user, response.token);
      toast.success("Registration successful!");
      const redirect = searchParams.get("redirect");
      router.push(redirect || "/dashboard");
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.replace("/login");
    router.refresh();
  };

  return {
    user,
    token,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    setUser,
  };
};
