import { useSearchParams } from "react-router";
import { use, useMemo } from "react";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { HeroStats } from "@/heroes/components/HeroStats";
import { usePaginationHero } from "@/heroes/hooks/usePaginationHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HomePage = () => {
  //establecer queryparametros
  const [searchParams, setSearchParams] = useSearchParams(); //establece los query params
  const activeTab = searchParams.get("tab") ?? "all"; //obtenemos el parametro
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    // con esta funcion guardamos en memoria el tabs seleccionado y validamos con la lista permitada y el tabs
    // que viene por la url
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  // llamamos al hooks que nos devuelve el objeto completo de useQuery
  const { data: summary } = useHeroSummary();
  const { data: heroesResponse } = usePaginationHero(+page, +limit, category);

  //  llamamos al contexto
  const { favoriteCount, favorite } = use(FavoriteHeroContext);

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHéroes"
          description="Descubre, explora y administra super heroes y villanos"
        />
        {/* Breadcrumbs */}
        <CustomBreadcrumbs currentPage="Super Heroes" />

        {/* Estadisticas Cards  */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() =>
                // de esta forma seteamos los queryparamas
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  prev.set("category", "all");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              Todos los personajes ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");

                  return prev;
                })
              }
              className="flex items-center gap-2"
            >
              Favoritos ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  prev.set("category", "hero");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  prev.set("category", "villain");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          {/* el contenido de los tabs */}

          <TabsContent value="all">
            {/* mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* mostrar todos los personajes favoritos */}
            <HeroGrid heroes={favorite} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* mostrar todos los heroes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* mostrar todos los villanos */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>
        {/* Pagination */}
        {selectedTab !== "favorites" && (
          <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        )}
      </>
    </>
  );
};
