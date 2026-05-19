import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { fetchCurrentUser, type UserProfile } from "../services/userService";

export default function ProfilePage() {
  const token = useAuthStore((state) => state.token);
  const clearToken = useAuthStore((state) => state.clearToken);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    fetchCurrentUser(token)
      .then((user) => {
        if (!isMounted) return;
        setProfile(user);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Failed to load profile.");
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token, navigate]);

  const initials = useMemo(() => {
    if (!profile?.nickname) return "U";
    return profile.nickname.trim().slice(0, 1).toUpperCase();
  }, [profile?.nickname]);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  if (isLoading) {
    return <div className="text-lg">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 md:p-8">
      <div className="flex items-center gap-4">
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt="User avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
            {initials}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-gray-600">Your account details</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-500">Email</span>
          <span className="font-medium">{profile?.email}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-500">Nickname</span>
          <span className="font-medium">{profile?.nickname}</span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-black text-white rounded-4xl p-2 text-lg cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
}
