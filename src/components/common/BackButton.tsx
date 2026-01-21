"use client";

import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Button variant="outline" onClick={handleBack} className="gap-2">
      <ArrowLeft className="h-4 w-4" />
      Go Back
    </Button>
  );
};
