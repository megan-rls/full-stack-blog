import PostListItem from "./PostListItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchPosts = async (pageParam) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params:{ page:pageParam, limit:5 },
  });
  return res.data;
};

const PostList = () => {

  // // loads all posts
  // const { isPending, error, data } = useQuery({
  //   queryKey: ["repoData"],
  //   queryFn: () => fetchPosts(),
  // }) 

  // react query - infinite query
  // localhost:3000/posts?page=1&limit=5
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => 
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  if (status === "loading") return "Loading...";

  if (status === "error") return "Something went wrong!";

  const allPosts = data?.pages?.flatMap(page => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p>
          <b>All posts loaded</b>
        </p>
      }
    >
      {/* items for infinite scroll container (posts) go here */}
      {allPosts.map(post => (
        <PostListItem key={post.__id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList