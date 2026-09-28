import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FavoriteHeroProvider } from "./heroes/context/FavoriteHeroContext";

//instanciar tanstack query
const queryClient = new QueryClient();

export const HeroesApp = () => {
  return (
    <>
      {/* instanciar provider tanstack query */}
      <QueryClientProvider client={queryClient}>

        {/* contexto hero */}
        <FavoriteHeroProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={appRouter} />
        </FavoriteHeroProvider>
      </QueryClientProvider>
    </>
  );
};
