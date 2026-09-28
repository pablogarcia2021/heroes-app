import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  //State
  favorite: Hero[];
  favoriteCount: number;
  //Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

//sirve para compartir datos globalmente a través del árbol de componentes sin necesidad de pasar props manualmente
// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext<FavoriteHeroContext>(
  {} as FavoriteHeroContext,
);

const getFavoriteFromLocalStorage = (): Hero[] => {
  // obtener los favoritos guardados en el localstorage y lo convierte en objeto
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoriteFromLocalStorage(),
  );

  const toggleFavorite = (hero: Hero) => {
    // evaluamos si el hero existe
    const heroExist = favorites.find((h) => h.id === hero.id);

    if (heroExist) {
      // si el hero existe lo eliminamos si no lo agregamos
      const newFavorite = favorites.filter((h) => h.id !== hero.id);
      setFavorites(newFavorite);

      return;
    }

    // si no esta en el state lo agrega
    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => {
    // el some retorna un boolean si el hero existe en el state
    return favorites.some((h) => h.id === hero.id);
  };

  useEffect(() => {
    // guardamos en el localstorage y convertimos los favorites en string
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    // creamos un provider
    <FavoriteHeroContext
      value={{
        //retornamos los valores especificados en la interface
        favoriteCount: favorites.length,
        favorite: favorites,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
