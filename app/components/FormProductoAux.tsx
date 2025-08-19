"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, ProductType } from "@/app/schemas/auth";
import { useState } from "react";
import { saveProduct } from "../helpers/api";
import { toast } from "sonner";

export default function CreateProductForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductType>({
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
      const fileInput = (document.getElementById("file") as HTMLInputElement)
        ?.files?.[0];
      if (fileInput) {
        formData.append("prod_imageUrl", fileInput);
      }


      const res = await saveProduct(formData)

      toast.success( res.message ||"Producto guardo Correctamente")
    } catch (error:any) {
      toast.error(error.message || "❌ No se pudo guardar el producto")
    }
  };

  // Previsualizar imagen
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 p-4 border rounded-lg shadow"
    >
      <div>
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

      <div>
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
      <div>
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

      <div>
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

      <div>
        <label>Categoría</label>
        <input
          type="number"
          {...register("category")}
          className="border w-full p-2 rounded"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div>
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

      <div>
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

      <div>
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
        <label>Imagen</label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="block"
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
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
