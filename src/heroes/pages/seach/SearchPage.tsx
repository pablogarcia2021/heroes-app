import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";

import { useSearchParams } from "react-router";
import { useSearchHero } from "@/heroes/hooks/useSearchHero";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const strength = searchParams.get("strength") ?? "1";

  const strengthValidation = strength === "0" ? "1" : strength;

  // llamamos al hooks
  const { data: heroes = [] } = useSearchHero(name, strengthValidation);

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super heroes y villanos"
      />

      <CustomBreadcrumbs
        currentPage="Buscador de héroes"
        // breadcrumb={[{ label: "Inicio 1", to: "/" }]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* filter and Search control */}
      <SearchControls />

      {/* herogrid */}

      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
