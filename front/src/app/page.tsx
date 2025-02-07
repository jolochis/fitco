"use client";

import { CreatePostButton } from "@/components/create-post-button";
import Feed from "@/components/feed";

export default function Home() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <CreatePostButton />
      </div>
      <Feed />
    </div>
  );
}
