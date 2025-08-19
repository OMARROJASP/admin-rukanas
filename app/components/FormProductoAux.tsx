"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, ProductType } from "@/app/schemas/auth";
import { FC, useState } from "react";
import { saveProduct } from "../helpers/api";
import { toast } from "sonner";
import router from "next/router";
import Image from "next/image";

interface Categoria {
  cat_id: number;
  cat_name: string;
}
interface FormProductProps {
  categories: Categoria[]
}

const CreateProductForm:FC<FormProductProps> = ({categories}) => {
  const [preview, setPreview] = useState<string | null>(null);

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: zodResolver(ProductSchema),
});

  const onSubmit = async (data: ProductType) => {
    try {
      // FormData para enviar texto + archivo
      const formData = new FormData();
      formData.append("prod_name", data.name);
      formData.append("prod_price", String(data.price));
      formData.append("prod_description", data.description);
      formData.append("prod_category", String(data.category));
      formData.append("prod_stock", String(data.stock));
      formData.append("prod_supplier", String(data.supplier));
      formData.append("prod_state", data.state);
      formData.append("prod_ofert", String(data.ofert));

      // archivo (si existe)
      // archivo
    if (data.image && data.image.length > 0) {
      formData.append("prod_imageUrl", data.image[0]);
    }

      const res = await saveProduct(formData);

      toast.success(res.message || "Producto guardo Correctamente");
      router.push("/dashboard/products"); 
    } catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("❌ No se pudo guardar el producto");
  }
}
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-white rounded-lg shadow-md"
    >
         <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
         <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
<div className="mb-4 col-span-3 sm:col-span-1">
        <label>Nombre</label>
        <input
          {...register("name")}
          className="border w-full p-2 rounded"
          placeholder="Nombre del producto"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4 col-span-3 sm:col-span-1">
        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          {...register("price")}
          className="border w-full p-2 rounded"
          placeholder="Precio"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>
      <div className="mb-4 col-span-3 sm:col-span-1">
        <label>Oferta</label>
        <input
          type="number"
          step="0.01"
          {...register("ofert")}
          className="border w-full p-2 rounded"
          placeholder="Precio"
        />
        {errors.ofert && (
          <p className="text-red-500 text-sm">{errors.ofert.message}</p>
        )}
      </div>

      <div className="mb-4 col-span-3 sm:col-span-2">
        <label>Descripción</label>
        <textarea
          {...register("description")}
          className="border w-full p-2 rounded"
          placeholder="Descripción"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-4 col-span-3 sm:col-span-1">
        <label>Categoría</label>
        <select {...register("category")} className="border w-full p-2 rounded">
          <option value="">Selecciona...</option>
        {categories.map((cat: Categoria, index: number) => (
                <option key={index} value={cat.cat_id}>
                  {cat.cat_name}
                </option>
              ))}
              </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div className="mb-4 col-span-3 sm:col-span-1">
        <label>Stock</label>
        <input
          type="number"
          {...register("stock")}
          className="border w-full p-2 rounded"
        />
        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}
      </div>

      <div className="mb-4 col-span-3 sm:col-span-1">
        <label>Proveedor</label>
        <input
          type="number"
          {...register("supplier")}
          className="border w-full p-2 rounded"
        />
        {errors.supplier && (
          <p className="text-red-500 text-sm">{errors.supplier.message}</p>
        )}
      </div>

      <div className="mb-4 col-span-3 sm:col-span-1">
        <label>Estado</label>
        <select {...register("state")} className="border w-full p-2 rounded">
          <option value="">Selecciona...</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
        {errors.state && (
          <p className="text-red-500 text-sm">{errors.state.message}</p>
        )}
      </div>

     <div>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setPreview(URL.createObjectURL(file))
            } else {
              setPreview(null)
            }
          }}
          className="block w-full"
        />
        {errors.image && <p className="text-red-500">{errors.image.message?.toString()}</p>}
      </div>

      {preview && (
  <div className="mt-4">
    <p className="text-sm text-gray-600">Vista previa:</p>
    <Image
      src={preview}
      alt="Vista previa"
      width={160}   // 👈 necesario, Next exige width/height
      height={160}
      className="w-40 h-40 object-cover rounded border"
      unoptimized   // 👈 evita que Next intente optimizar un blob/base64
    />
  </div>
)}

      
         </div>
         <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
      
    </form>
  );
}


export default CreateProductForm;