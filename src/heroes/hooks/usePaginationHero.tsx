import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginationHero = (page: number, limit: number, category = 'all') => {
  return useQuery({
    queryKey: ["heroes", { page, limit, category }],
    queryFn: () => getHeroesByPageAction(page, limit, category),
    staleTime: 1000 * 6 * 5,
  });
};




  // // Tanstack query llamamos a la funcion de la API
  // const { data: heroesResponse } = useQuery({
  //   // si la funcion recibe argumento, los arg tienen q ser parte del query key
  //   queryKey: ["heroes", { page: page, limit: limit }],
  //   queryFn: () => getHeroesByPageActions(+page, +limit),
  //   staleTime: 1000 * 60 * 5, //5 minutos
  // });