import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACK_URL;
type UserData = {
  username: string;
  email: string;
  password: string;
};
export const createUser = async (user: UserData) => {
  try {
    const data = await axios.post(`${URL}/auth/register`, user);
    return data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${URL}/auth/login`, { email, password });
    console.log("response login", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
