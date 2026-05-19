import axios from "axios";

export type UserProfile = {
  email: string;
  nickname: string;
  avatar_url?: string | null;
};

export const fetchCurrentUser = async (token: string) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.user as UserProfile;
};
