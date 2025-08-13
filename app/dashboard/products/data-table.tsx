"use client"

import * as React from "react"
import Image from "next/image";

interface Props {
    product: {
        prod_id: string;
        prod_name: string,
        prod_price: string,
        prod_description: string,
        prod_imageUrl: string,      
        prod_category: string,
        prod_stock: number,
        prod_ofert: number,
        prod_supplier: string
    }[]
}



const DataTable = ({ product }: Props) => {
    
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
          {product.map((row, index) => (
            <tr key={index}>
                <td className="px-6 py-4">{index}</td>
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
                <button className="px-4 py-2 bg-yellow-300 text-white rounded hover:bg-yellow-600">Editar</button>
              </td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default DataTable;   