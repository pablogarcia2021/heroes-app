import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (  page: number,  limit: number = 6,  category: string = "all",): Promise<HeroesResponse> => {
  //validar el valor page no venga un NaN = Not A Number
  
  if (isNaN(page)) {
    page = 1;
  }

  if (isNaN(limit)) {
    limit = 6;
  }

  const { data } = await heroApi.get<HeroesResponse>(`/`, {
    params: {
      limit: limit,
      offset: (page - 1) * limit, // la pagina 0 es la primera, para la siguiente pagina tiene q traer los siguientes 6 datos ej: [0-6]-[6-12]-[12-18]....
      category: category,
    },
  });

  //mapear la informacion cambiando solo la image debido que desde banckend viene 1.jpeg -> ej: http://localhost/1.jpeg
  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));

  return {
    ...data,
    heroes: heroes,
  };
};
