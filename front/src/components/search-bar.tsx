"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { searchPosts } from "@/app/services/postService";

interface SearchBarProps {
  setFilteredPosts: (posts: any[]) => void;
}

export function SearchBar({ setFilteredPosts }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const results = await searchPosts(query);
      setFilteredPosts(results);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button type="button" size="icon" onClick={handleSearch}>
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}
