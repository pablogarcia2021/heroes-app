import { useQuery } from "@tanstack/react-query";
import { searchHeroAction } from "../actions/search-heros.action";

export const useSearchHero = (name: string, strength: string) => {
  

  return useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHeroAction({ name, strength }),
    staleTime: 1000 * 6 * 5,
    retry: false,
  });
};

// const { data: heroes = [] } = useQuery({
//   queryKey: ["search", { name }],
//   queryFn: () => searchHeroAction({ name }),
//   staleTime: 1000 * 60 * 5,
//   retry: false,
// });
