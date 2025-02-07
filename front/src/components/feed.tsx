"use client";

import { getPosts } from "@/app/services/postService";
import { Post } from "@/components/post";
import { useState, useEffect } from "react";

interface CommentType {
  id: number;
  author: string;
  content: string;
}

interface ReactionsType {
  likes: number;
  hearts: number;
}

interface PostType {
  id: number;
  author: {
    username: string;
  };
  content: string;
  comments: CommentType[];
  reactions: ReactionsType;
}

export default function Feed() {
  const [posts, setPosts] = useState<PostType[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    }

    fetchPosts();
  }, []);

  if (!posts) {
    return <div className="text-center text-gray-500">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center text-gray-500">No posts available.</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
