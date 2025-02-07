"use client";

import { getPosts } from "@/app/services/postService";
import { Post } from "@/components/post";

import { useState, useEffect } from "react";
import { SearchBar } from "./search-bar";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
      setFilteredPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      <SearchBar setFilteredPosts={setFilteredPosts} />
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div className="text-center text-gray-500">No posts found.</div>
      )}
    </div>
  );
}
