import { useHeroSummary } from "../hooks/useHeroSummary";
import { Badge } from "@/components/ui/badge";
import { Heart, Trophy, Users, Zap } from "lucide-react";
import { HeroStatCard } from "./HeroStatCard";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";
import { use } from "react";

export const HeroStats = () => {
  // llamamos al hooks
  const { data: summary } = useHeroSummary();

  const { favoriteCount } = use(FavoriteHeroContext);

  if (!summary) {
    return <div>cargando..</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatCard
        title="Total de personajes"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      >
        {/* podemos enivar el children solo este fragmento y lo recibimos en el componente */}
        <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
        <div className="flex gap-1 mt-2">

          {/* children */}
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount} Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount} Villanos
          </Badge>
        </div>
      </HeroStatCard>

      <HeroStatCard
        title="Favoritos"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        {/* TODO: Calcular el valor de favoritos          */}
        <div className="text-lg font-bold">{favoriteCount}</div>
        <p className="text-xs text-muted-foreground">
          {((favoriteCount / summary.totalHeroes) * 100).toFixed(1)} % del total
        </p>
      </HeroStatCard>

      <HeroStatCard
        title="Fuerte"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Fuerza: {summary?.strongestHero.strength}/10
        </p>
      </HeroStatCard>

      <HeroStatCard
        title="Inteligencia"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Inteligencia: {summary?.smartestHero.intelligence}/10
        </p>
      </HeroStatCard>
    </div>
  );
};
