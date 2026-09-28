import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

export const useHeroSummary = () => {
  return useQuery({
    queryKey: ["summary-informaton"],
    queryFn: getSummaryAction, // como no le mandamos argumentos y no recibe podemos llamalo de esta forma
    staleTime: 1000 * 60 * 5, // 5minutos en cache
  });
};
