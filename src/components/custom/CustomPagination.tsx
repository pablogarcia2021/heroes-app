import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {

  //establece en la url el queryPage  
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page") ?? "1";
  const page = isNaN(+queryPage) ? 1 : Number(queryPage); //validamos que la página sea un número.

  const handlePageChange = (page: number) => {
    //validamos que no pueda irse a la pagina 0 o superior a la ultima pagina
    if (page < 1 || page > totalPages) return;

    // cambia el valor de page por ejemplo si esta en 13 al apretar el boton anterior lo va cambiar a 12
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {/*  creamos un array del total de paginas */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={page === index + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1 }
        </Button>
      ))}

      {/* <Button variant="outline" size="sm">
        3
      </Button> */}
      {/* 
      <Button variant="ghost" size="sm" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button> */}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
