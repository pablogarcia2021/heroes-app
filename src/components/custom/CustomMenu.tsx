import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
export const CustomMenu = () => {
  //const { pathname } = useLocation(); obtenemos la url actual

  //   const isActive = (path: string) => {
  //     return pathname === path;
  //   };

  return (
    <NavigationMenu className="py-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "p-2 rounded-md text-sm transition-colors block outline-none focus:outline-none",
                isActive ? "bg-slate-300 text-black" : "hover:bg-slate-100",
              )
            }
          >
            Inicio
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              cn(
                "p-2 rounded-md text-sm transition-colors block outline-none focus:outline-none",
                isActive ? "bg-slate-300 text-black" : "hover:bg-slate-100",
              )
            }
          >
            Busqueda superhéroes
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
