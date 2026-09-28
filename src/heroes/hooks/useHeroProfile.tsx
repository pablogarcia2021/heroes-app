import { useQuery } from "@tanstack/react-query";
import { getHeroAction } from "../actions/get-hero.action";

export const useHeroProfile = (idSlug: string) => {
  return useQuery({
    queryKey: ["heroes", { idSlug }],
    queryFn: () => getHeroAction(idSlug), // como no le mandamos argumentos y no recibe podemos llamalo de esta forma
    staleTime: 1000 * 60 * 5, // 5minutos en cache
    retry: false
  });
};
