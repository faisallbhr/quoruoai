"use client";

import { useFetchPosts } from "@/features/useFetchPosts";
import { Badge } from "./ui/badge";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Circle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PostSkeleton from "./PostSkeleton";

const PostList = () => {
  const myPosts = useSelector((state: RootState) => state.posts.posts);

  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFetchPosts();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <PostSkeleton />;
  if (isError)
    return <p className="text-center text-red-500 mt-6">Error loading posts</p>;

  return (
    <div className="divide-y-2 space-y-4">
      {myPosts &&
        myPosts
          .slice()
          .reverse()
          .map((post, index) => (
            <div key={index} className="pt-4">
              <h2 className="font-semibold text-lg">You</h2>
              <p className="pt-1 pb-2">{post.body}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-2 capitalize bg-muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
      {data?.pages.map((page) =>
        page.posts.map((post) => (
          <div key={post.id} className="pt-4">
            <h2 className="font-semibold text-lg">
              {post.user.firstName} {post.user.lastName}
            </h2>
            <p className="pt-1 pb-2">{post.body}</p>
            <div className="flex gap-2">
              {post.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-2 capitalize bg-muted">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))
      )}

      <div ref={ref} className="py-4 flex justify-center">
        {isFetchingNextPage ? (
          <Circle className="animate-spin text-muted-foreground" />
        ) : hasNextPage ? (
          <Circle className="animate-spin text-muted-foreground" />
        ) : (
          <p>No more posts to load.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
