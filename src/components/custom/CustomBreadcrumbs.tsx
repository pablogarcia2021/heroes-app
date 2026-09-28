import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface Breadcrumb {
  label: string;
  to: string;
}

interface Props {
  currentPage: string;
  breadcrumb?: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumb = [] }: Props) => {
  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        {/* Inicio */}
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link to="/">Inicio</Link>} />
        </BreadcrumbItem>

        {/* Mapeo de rutas intermedias */}

        {breadcrumb.map((crumb) => (
          <div className="flex items-center gap-2" key={crumb.to}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link to={crumb.to}>{crumb.label}</Link>}
              />
            </BreadcrumbItem>
          </div>
        ))}

        {/* Página actual */}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
