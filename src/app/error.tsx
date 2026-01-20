"use client";

import { Button } from "@/components/common/Button";
import { AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 rounded-full">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Something went wrong!
          </h1>
          <p className="text-neutral mb-2">
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
