"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";
import {
  registerSchema,
  type RegisterFormData,
} from "@/validations/auth.schema";
import { UserPlus } from "lucide-react";
import Link from "next/link";

function RegisterForm() {
  const [error, setError] = useState("");
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError("");
    const result = await registerUser(data);

    if (!result.success) {
      setError(result.error || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="p-8 border border-primary rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">
            Register
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && <Alert message={error} variant="error" />}

            <Input
              label="Name"
              type="text"
              {...register("name")}
              error={errors.name?.message}
              placeholder="Enter your name"
            />

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
              helperText="Must contain uppercase, lowercase, and number"
              placeholder="Enter your password"
            />

            <Button
              type="submit"
              isLoading={isSubmitting}
              fullWidth
              className="gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-black hover:opacity-85 font-medium transition-opacity"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
