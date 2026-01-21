import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { User } from "@/types/auth.types";

const AUTH_TOKEN_COOKIE = "auth_token";

const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const removeCookie = (name: string) => {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax;`;
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: (user: User, token: string) => {
          setCookie(AUTH_TOKEN_COOKIE, token);
          set(
            {
              user,
              token,
              isAuthenticated: true,
            },
            false,
            "auth/login"
          );
        },
        logout: () => {
          removeCookie(AUTH_TOKEN_COOKIE);
          set(
            {
              user: null,
              token: null,
              isAuthenticated: false,
            },
            false,
            "auth/logout"
          );
        },
        setUser: (user: User) => {
          set({ user }, false, "auth/setUser");
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: "AuthStore",
    }
  )
);
