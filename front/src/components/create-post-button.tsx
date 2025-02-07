"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreatePostButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/create-post")}>
      <Plus className="mr-2 h-4 w-4" /> Create Post
    </Button>
  );
}
