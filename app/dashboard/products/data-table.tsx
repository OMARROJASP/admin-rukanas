


import * as React from "react"
import Image from "next/image";
import { fetchProductsByFilters } from "@/app/helpers/api"
import { FC } from "react";
import Link from "next/link";



interface TableProps {
    text?: string;
    page?: string;
}


const DataTable:FC <TableProps> = async({ text, page =1 }) => {

  //const listProducts = await fetchProductsByFilters(text || "");
  const data = await fetchProductsByFilters(text || "", Number(page));

  const listProducts = data.products


    
     return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
          <tr>
            <th className="px-6 py-3">Id</th>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Imagen</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Editar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white text-sm text-gray-700">
          {listProducts.map((row, index:number) => (
            <tr key={index}>
                <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{row.prod_name}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{row.prod_price}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{row.prod_stock}</td>
              <td className="px-6 py-4">
                <Image
                  src={row.prod_imageUrl}
                  alt={row.prod_name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </td>
              <td className="px-6 py-4 font-medium text-white">
                <div className="flex items-center justify-center bg-green-500 rounded-xl">
                  Activo
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                <Link href={`products/${row.prod_id}`} className="px-4 py-2 bg-yellow-300 text-white rounded hover:bg-yellow-600" >Editar</Link>
              </td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default DataTable;   