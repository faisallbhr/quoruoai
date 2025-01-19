"use client";

import PostList from "@/components/PostList";
import PostModal from "@/components/PostModal";
import { RootState } from "@/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return (
    <div className="max-w-3xl mx-auto border-x min-h-dvh bg-background shadow-md p-4">
      <h1 className="text-center font-bold text-3xl">Quoruoai</h1>
      {!isLoggedIn ? (
        <p className="text-sm text-center my-2">
          Please{" "}
          <Link
            href="/login"
            prefetch={false}
            className="text-blue-500 underline">
            login
          </Link>{" "}
          if you want to share your story
        </p>
      ) : (
        <PostModal />
      )}
      <PostList />
    </div>
  );
}
