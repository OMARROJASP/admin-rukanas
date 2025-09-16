"use client"

import { useGetBannersQuery, type Banner } from "@/services/bannerApi";
import Table from "../../components/Table";
import Link from "next/link";
import { setSelectdBanner } from "@/features/banner/bannerSlice";
import { useDispatch } from "react-redux";

const Categories = () => {
    const dispatch = useDispatch();
    const {data: response, isLoading, error} = useGetBannersQuery();
    const listBanner = response?.data ? response?.data : []
    return (
        <>
        <div className="mb-4 px-4 py-2">
            <h1 className="text-black text-center text-2xl mb-3">Lista de Banners</h1>
            <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        <Link href="/dashboard/banners/create">Agregar Categoría</Link>
            </button>
{(isLoading) && <p>Loading...</p>}
      {(error) && <p>Error loading data</p>}

      <Table<Banner>
        data={listBanner}
        rowKey="bnn_id"
        columns={[
          { key: "bnn_id", header: "ID" },
          { key: "bnn_title", header: "Titulo" },
          { key: "bnn_description", header: "Descripción" },
          {
              key: "bnn_image_url_desktop",
              header: "Imagen",
              render: (bnn) => (
                <img
                  src={bnn.bnn_image_url_desktop}
                  alt={bnn.bnn_title}
                  className="w-12 h-12 rounded-md object-cover"
                />
              ),
            },
             {
              key: "bnn_image_url_mobile",
              header: "Imagen",
              render: (bnn) => (
                <img
                  src={bnn.bnn_image_url_mobile}
                  alt={bnn.bnn_title}
                  className="w-12 h-12 rounded-md object-cover"
                />
              ),
            },
          { key: "bnn_is_active", header: "Estado" },
          { key: "bnn_position", header: "Posicion" },
          {
                key: "bnn_id", // o cualquier campo que ya exista
                header: "Opciones",
                render: (bnn) => (
                  <div className="flex gap-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      <Link 
                        href={`/dashboard/banners/${bnn.bnn_id}`}
                        onClick={() => dispatch(setSelectdBanner(bnn))}
                      >Editar</Link>
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      <Link href={`/dashboard/banners/${bnn.bnn_id}`}>Eliminar</Link>
                    </button>
                  </div>
                ),
              }
        ]}
      />
        </div>
        </>
    )
}

export default Categories;