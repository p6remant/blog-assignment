import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-bold text-primary mt-4">
            Page Not Found
          </h2>
          <p className="text-neutral mt-4 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved to a different location.
          </p>
        </div>

        <div className="flex justify-center items-center">
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
