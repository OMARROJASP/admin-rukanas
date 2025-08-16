"use client";

import React, { FC, useState } from "react";

interface Categoria {
  id: number;
  name: string;
}

interface Producto {
  prod_id: number;
  prod_name: string;
  prod_price: number;
  prod_description: string;
  prod_imageUrl: string;
  prod_category: string;
  prod_stock: number;
  prod_ofert: number;
  prod_state: number;
}

interface FormProductProps {
  categories: Categoria[];
}
const Page:FC<FormProductProps> =  ({categories}) => {

    const [product, setProduct] = useState<Producto>({
    prod_id: 0,
    prod_name: "",
    prod_price: 0,
    prod_description: "",
    prod_imageUrl: "",
    prod_category: "",
    prod_stock: 0,
    prod_ofert: 0,
    prod_state: 1,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Producto enviado:", product);
  };


  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <div className="mb-4 col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Imagen
            </label>
            <input
              type="file"
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Producto
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 grid-cols-1">
            <label className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]">
              <option value="">Escoja una opcion</option>
              {categories.map((cat: any, index: number) => (
                <option key={index} value={cat.cat_id}>
                  {cat.cat_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 grid-cols-1">
            <label className="block text-sm font-medium text-gray-700">
              Proveedor
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 grid-cols-1">
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 grid-cols-1">
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 grid-cols-1">
            <label className="block text-sm font-medium text-gray-700">
              Ofert en %
            </label>
            <input
              type="number"
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 grid-cols-1">
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]">
              <option value="0">Oculto</option>
              <option value="1">Visible </option>
            </select>
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </form>
    </>
  );
};

export default Page;
