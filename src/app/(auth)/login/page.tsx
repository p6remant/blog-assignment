"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";
import { loginSchema, type LoginFormData } from "@/validations/auth.schema";
import { LogIn } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    const result = await login(data);

    if (!result.success) {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="p-8 border border-primary rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && <Alert message={error} variant="error" />}

            <Input
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="Enter your password"
            />

            <Button
              type="submit"
              isLoading={isSubmitting}
              fullWidth
              className="gap-2"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-black hover:opacity-85 font-medium transition-opacity"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
