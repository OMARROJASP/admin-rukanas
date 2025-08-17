"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { updateProduct } from "../helpers/api";
import { toast } from "sonner";


interface Categoria {
  id: number;
  name: string;
}

interface Producto {
  prod_id: number;
  prod_name: string;
  prod_price: number;
  prod_description: string;
  prod_imageUrl: File | string;
  prod_category: string;
  prod_stock: number;
  prod_ofert: number;
  prod_state: boolean;
  prod_supplier: string;
}

interface FormProductProps {
  categories: Categoria[]
  producto?: Producto;
}
const Page:FC<FormProductProps> =  ({categories, producto}) => {
  
  useEffect(() => {
    if (producto) {
      setProduct({
        prod_id: producto.prod_id,
        prod_name: producto.prod_name,
        prod_price: producto.prod_price,
        prod_description: producto.prod_description,
        prod_imageUrl: producto.prod_imageUrl,
        prod_category: parseInt(producto.prod_category) ? producto.prod_category : "",
        prod_stock: producto.prod_stock,
        prod_ofert: producto.prod_ofert,
        prod_state: producto.prod_state,
        prod_supplier: producto.prod_supplier,
      });
    }
  }, []);

  // Initialize product state

    const [product, setProduct] = useState<Producto>({
    prod_id: 0,
    prod_name: "",
    prod_price: 0,
    prod_description: "",
    prod_imageUrl: "",
    prod_category: "",
    prod_stock: 0,
    prod_ofert: 0,
    prod_state: true,
    prod_supplier: "",
  });

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
    console.log("Producto enviado:", product);

    const formData = new FormData();
    formData.append("prod_name", product.prod_name);
    formData.append("prod_price", product.prod_price.toString());
    formData.append("prod_description", product.prod_description);
    if (typeof product.prod_imageUrl === "object") {
      formData.append("prod_imageUrl", product.prod_imageUrl);
    }
    formData.append("prod_category", product.prod_category);
    formData.append("prod_stock", product.prod_stock.toString());
    formData.append("prod_ofert", product.prod_ofert.toString());
    formData.append("prod_state", product.prod_state ? "1" : "0");
    formData.append("prod_supplier", product.prod_supplier);
    formData.append("prod_id", product.prod_id.toString());
    // Aquí puedes hacer la llamada a la API para guardar el producto
    console.log("Datos del formulario:", formData);
    // Ejemplo de llamada a la API

    try {
      const res =  await updateProduct(product.prod_id,formData);

      toast.success( res.message ||"Producto Actualizado Correctamente")
    } catch (error:any) {
      toast.error(error.message || "❌ No se pudo actualizar el producto")
    } finally {
      setLoading(false)
    }
    

    
   
    
    
  };

  const params = useParams();
  const productId = params.id ? parseInt(params.id as string) : null;

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* {typeof product.prod_imageUrl === "string" && product.prod_imageUrl !== "" && (
            <div className="mb-4 col-span-3 sm:col-span-1 flex justify-center items-center" >
               <Image
                src={product.prod_imageUrl}
                alt={product.prod_name}
                width={400}   // puedes ajustar a lo que quieras
                height={300}
                className="w-full h-auto rounded-md mb-2"
              />
            </div>
          ) } */}
          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Imagen
            </label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file){
                  setProduct({ ...product, prod_imageUrl: file })
                }                
              }}
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 col-span-3 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Producto
            </label>
            <input
              type="text"
              value={product.prod_name}
              onChange={(e) => setProduct({ ...product, prod_name: e.target.value })}
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 col-span-3 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select 
            value={product.prod_category || ""}
            onChange={(e) => 
              setProduct({...product, prod_category: e.target.value })
            }
            className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]">
              <option value="">Escoja una opcion</option>
              {categories.map((cat: any, index: number) => (
                <option key={index} value={cat.cat_id}>
                  {cat.cat_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 col-span-3 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Proveedor
            </label>
            <input
              type="text"
              value={product.prod_supplier}
              onChange={(e) => setProduct({ ...product, prod_supplier: e.target.value })}
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 col-span-3 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              value={product.prod_price}
              onChange={(e) => setProduct({ ...product, prod_price: parseFloat(e.target.value) })}
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 col-span-3 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              value={product.prod_stock}
              onChange={(e) => setProduct({ ...product, prod_stock: parseInt(e.target.value) })}
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 col-span-3 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Ofert en %
            </label>
            <input
              type="number"
              value={product.prod_ofert}
              onChange={(e) => setProduct({ ...product, prod_ofert: parseInt(e.target.value) })}
              className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
            />
          </div>
          <div className="mb-4 col-span-3 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select 
            value={product.prod_state ? "1" : "0"}
            onChange={(e) => setProduct({...product,  prod_state: Boolean(Number(e.target.value)),})}
            className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]">
              <option value="0">Oculto</option>
              <option value="1">Visible </option>
            </select>
          </div>
          <div className="mb-4 col-span-3 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea 
              value={product.prod_description}
              onChange={(e) => setProduct({ ...product, prod_description: e.target.value })}
              rows={4}
            className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
               {loading ? "Actualizando..." : "Actualizar"}
        </button>
      </form>
    </>
  );
};

export default Page;



