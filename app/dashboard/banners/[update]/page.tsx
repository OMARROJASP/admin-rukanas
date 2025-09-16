"use client";
import { useParams } from "next/navigation";
import FormCategory from "../components/Form";
import { useGetCBannerByIdQuery } from "@/services/bannerApi";


const PageEditBanner = () => {
    const { update } = useParams();
  const { data: response, isLoading } = useGetCBannerByIdQuery(Number(update));
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
export default PageEditBanner;