"use client";

import Table from "@/app/components/Table";
import {
  type Category,
  type responseCategory,
  useGetCategoryQuery,
} from "@/services/categoryApi";
import Link from "next/link";

const Categories = () => {
    const { data: responseCategory, isLoading, error } = useGetCategoryQuery();
    const listCategory: Category[] = responseCategory?.data ?? [];
    return (
    <>
      <div className="mb-4 px-4 py-2">
        <h1 className="text-black text-center text-2xl mb-3">Customers</h1>
          <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            <Link href="/dashboard/categories/create">Agregar Categoría</Link>
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading data</p>}
        <Table<Category>
          data={listCategory}
          rowKey="cat_id"
          columns={[
            { key: "cat_id", header: "ID" },
            { key: "cat_name", header: "Name" },
            { key: "cat_description", header: "Description" },
            // { key: "cat_imageUrl", header: "Image URL" },
            {
              key: "cat_imageUrl",
              header: "Imagen",
              render: (cat) => (
                <img
                  src={cat.cat_imageUrl}
                  alt={cat.cat_name}
                  className="w-12 h-12 rounded-md object-cover"
                />
              ),
            },
            { key: "cat_status", header: "Status" },
            { key: "cat_area", header: "Area" },
            {
      key: "cat_id", // o cualquier campo que ya exista
      header: "Opciones",
      render: (cat) => (
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
             <Link href={`/dashboard/categories/${cat.cat_id}`}>Editar</Link>
          </button>
          <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            <Link href={`/dashboard/categories/${cat.cat_id}`}>Eliminar</Link>
          </button>
        </div>
      ),
    },
          ]}
        />
      </div>
    </>
  );
};

export default Categories;
