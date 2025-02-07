"use client";

import { getPosts } from "@/app/services/postService";
import { Post } from "@/components/post";
import { useState, useEffect, useCallback } from "react";

interface CommentType {
  id: number;
  author: { username: string }; // author como objeto con username
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
  const [posts, setPosts] = useState<PostType[] | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCommentAdded = (postId: number, newComment: CommentType) => {
    setPosts(
      posts?.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
            }
          : post
      )
    );
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading posts...</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center text-gray-500">No posts available.</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} onCommentAdded={handleCommentAdded} />
      ))}
    </div>
  );
}
