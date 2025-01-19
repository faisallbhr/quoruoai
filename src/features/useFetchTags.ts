import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

const fetchTags = async (
  search: string
): Promise<{ value: string; label: string }[]> => {
  const response = await fetch("https://dummyjson.com/posts/tag-list");
  const tags: string[] = await response.json();

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  return filteredTags.map((tag) => ({
    value: tag,
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
  }));
};

const useFetchTags = (search: string) => {
  const debouncedSearch = useDebounce(search, 150);
  return useQuery({
    queryKey: ["tags", debouncedSearch],
    queryFn: () => fetchTags(debouncedSearch),
    enabled: !!debouncedSearch,
  });
};

export default useFetchTags;
