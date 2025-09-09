"use client";
import { FC, useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  type Category,
} from "@/services/categoryApi";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

interface CategoryFormProps {
  initialData?: Category; // si viene, es edición
}

const CategoryForm: FC<CategoryFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [form, setForm] = useState({
    cat_name: "",
    cat_description: "",
    cat_imageUrl: null as File | null,
    cat_status: "1",
    cat_area: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        cat_name: initialData.cat_name,
        cat_description: initialData.cat_description,
        cat_imageUrl: null, // al editar no cargamos la imagen previa
        cat_status: initialData.cat_status,
        cat_area: initialData.cat_area,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cat_name", form.cat_name);
    formData.append("cat_description", form.cat_description);
    if (form.cat_imageUrl) {
      formData.append("cat_imageUrl", form.cat_imageUrl);
    }
    formData.append("cat_status", form.cat_status);
    formData.append("cat_area", form.cat_area);

    try {
      if (initialData) {
        // EDITAR
        await updateCategory({ id: initialData.cat_id, body: formData }).unwrap();
        console.log("✅ Categoría actualizada");
        toast.success("✅ Categoría actualizada");
      } else {
        // CREAR
        await createCategory(formData).unwrap();
        toast.success("✅ Categoría creada");
      }
      router.push('/dashboard/categories');
    } catch (err) {
      console.error("❌ Error en la categoría", err);
      toast.error("❌ Error al guardar la categoría");
    } 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {initialData ? "Editar Categoría" : "Crear Categoría"}
      </h2>

      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={form.cat_name}
          onChange={(e) => setForm({ ...form, cat_name: e.target.value })}
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <input
          type="text"
          value={form.cat_description}
          onChange={(e) =>
            setForm({ ...form, cat_description: e.target.value })
          }
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Imagen</label>
        <input
          type="file"
          onChange={(e) =>
            setForm({
              ...form,
              cat_imageUrl: e.target.files ? e.target.files[0] : null,
            })
          }
          className="mt-1 block w-full"
        />
        {/* {initialData?.cat_imageUrl && (
          <p className="text-xs text-gray-500">
            Imagen actual: {initialData.cat_imageUrl}
          </p>
        )} */}
      </div>

      <div>
        <label className="block text-sm font-medium">Estado</label>
        <select
          value={form.cat_status}
          onChange={(e) => setForm({ ...form, cat_status: e.target.value })}
          className="mt-1 block w-full border rounded px-2 py-1"
        >
          <option value="0">Oculto</option>
          <option value="1">Visible</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Área</label>
        <input
          type="text"
          value={form.cat_area}
          onChange={(e) => setForm({ ...form, cat_area: e.target.value })}
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {initialData ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default CategoryForm;
