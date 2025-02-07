"use client";

import { CreatePostButton } from "@/components/create-post-button";
import Feed from "@/components/feed";
import { SearchBar } from "@/components/search-bar";

export default function Home() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <SearchBar />
        <CreatePostButton />
      </div>
      <Feed />
    </div>
  );
}
