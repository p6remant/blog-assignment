import {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  User,
} from "@/types/auth.types";

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: 1,
          name: "John Doe",
          email: payload.email,
          username: "johndoe",
        };
        const mockToken = "mock_jwt_token_" + Date.now();
        resolve({
          user: mockUser,
          token: mockToken,
        });
      }, 500);
    });
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: Date.now(),
          name: payload.name,
          email: payload.email,
          username: payload.name.toLowerCase().replace(/\s+/g, ""),
        };
        const mockToken = "mock_jwt_token_" + Date.now();
        resolve({
          user: mockUser,
          token: mockToken,
        });
      }, 500);
    });
  },
};
