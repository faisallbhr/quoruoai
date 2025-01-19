import { useInfiniteQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  body: string;
  tags: string[];
  userId: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface PostWithUser extends Post {
  user: User;
}

const LIMIT = 5;

const fetchPostsPage = async (page: number) => {
  const skip = page * LIMIT;

  const postsRes = await fetch(
    `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`
  );
  const postsData = await postsRes.json();

  const postsWithUsers = await Promise.all(
    postsData.posts.map(async (post: Post) => {
      const userRes = await fetch(`https://dummyjson.com/users/${post.userId}`);
      const userData = await userRes.json();

      return {
        ...post,
        user: {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
      };
    })
  );

  return {
    posts: postsWithUsers,
    nextPage: postsData.total > (page + 1) * LIMIT ? page + 1 : undefined,
    total: postsData.total,
  };
};

export const useFetchPosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => fetchPostsPage(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};
