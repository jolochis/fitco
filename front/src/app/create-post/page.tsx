"use client";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createPost } from "../services/postService";
import { useSession } from "next-auth/react";
type FormData = {
  content: string;
};

export default function CreatePostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { data: session } = useSession();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await createPost({
      content: data.content,
      userId: session?.user?.id,
    });

    setLoading(false);
    if (res) {
      router.push("/dashboard");
    }
  });

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <Card className="w-full max-w-2xl">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="What's on your mind?"
              {...register("content", {
                required: "Content is required",
              })}
              rows={5}
              className="w-full"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
