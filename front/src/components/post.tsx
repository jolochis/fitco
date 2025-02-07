"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThumbsUp, Send } from "lucide-react";
import { Comment } from "./comment";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { createComment, getPosts } from "@/app/services/postService";

interface PostProps {
  post: {
    id: number;
    author: { username: string };
    content: string;
    comments: { id: number; author: { username: string }; content: string }[];
    reactions: { likes: number; hearts: number };
  };
}

export function Post({ post }: PostProps) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [posts, setPosts] = useState(post);
  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!session?.user) {
      console.error("Usuario no autenticado");
      return;
    }

    try {
      const userId = session.user.id;
      const postId = post.id;
      const data = {
        postId,
        userId,
        content: newComment,
      };
      const newCommentData = await createComment(data);
      await fetchPosts();
      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold">{posts.author.username}</h2>
        </div>
      </CardHeader>
      <CardContent>
        <p>{posts.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" />
            {posts.reactions.likes}
          </Button>
        </div>
        <div className="w-full space-y-2">
          {posts.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        {session?.user && (
          <form onSubmit={handleAddComment} className="flex w-full gap-2">
            <Input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}
