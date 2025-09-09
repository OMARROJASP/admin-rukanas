"use client";
import { useParams } from "next/navigation";
import { useGetCategoryByIdQuery } from "@/services/categoryApi";
import FormCategory from "../components/Form";


const PageEdirCategoria = () => {
    const { update } = useParams();
  const { data: response, isLoading } = useGetCategoryByIdQuery(Number(update));
  console.log( "Aqui ets alaads", response);
  const info = response?.data;
if (isLoading) return <p>Cargando...</p>;
  if (!response) return <p>No encontrada</p>;
    return (
        <div>   
            <FormCategory initialData={info}/>
        </div>
    )
}
export default PageEdirCategoria;