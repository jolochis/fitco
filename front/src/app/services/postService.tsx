import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACK_URL;
export type CreatePostData = {
  content: string;
  userId: number;
};
export const createPost = async (post: CreatePostData) => {
  try {
    const response = await axios.post(`${URL}/post`, post);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getPosts = async () => {
  try {
    const response = await axios.get(`${URL}/post`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createComment = async (data) => {
  try {
    const response = await axios.post(`${URL}/comments`, data);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const searchPosts = async (query: string) => {
  try {
    const res = await axios.get(`${URL}/post/search`, {
      params: { query },
    });

    return res.data;
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
};
