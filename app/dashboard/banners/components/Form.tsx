"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { useCreateBannerMutation, useUpdateBannerMutation, type Banner } from "@/services/bannerApi";

interface BannerFormProps {
  initialData?: Banner; // si viene, es edición
}

const BannerForm: FC<BannerFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  const [form, setForm] = useState({
    bnn_title: "",
    bnn_description: "",
    bnn_image_url_desktop: null as File | null,
    bnn_image_url_mobile: null as File | null,
    bnn_is_active: "1",
    bnn_position: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        bnn_title: initialData.bnn_title,
        bnn_description: initialData.bnn_description,
        bnn_image_url_desktop: null, // al editar no cargamos la imagen previa
        bnn_image_url_mobile: null, // al editar no cargamos la imagen previa
        bnn_is_active: initialData.bnn_is_active,
        bnn_position: initialData.bnn_position
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bnn_title", form.bnn_title);
    formData.append("bnn_description", form.bnn_description);
    if (form.bnn_image_url_desktop) {
      formData.append("bnn_image_url_desktop", form.bnn_image_url_desktop);
    }
    if (form.bnn_image_url_mobile) {
      formData.append("bnn_image_url_mobile", form.bnn_image_url_mobile);
    }
    formData.append("bnn_is_active", form.bnn_is_active);
    formData.append("bnn_position", form.bnn_position);

    try {
     if (initialData) {
        // EDITAR
        await updateBanner({ id: initialData.bnn_id, body: formData }).unwrap();
        console.log("✅ Banner actualizada");
        toast.success("✅ Banner actualizada");
      } else {
        // CREAR
        await createBanner(formData).unwrap();
        toast.success("✅ Banner creada");
      }
      router.push('/dashboard/banners');
    } catch (err) {
      console.error("❌ Error en la Banner", err);
      toast.error("❌ Error al guardar la Banner");
    } 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {initialData ? "Editar Banner" : "Crear Banner"}
      </h2>

      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={form.bnn_title}
          onChange={(e) => setForm({ ...form, bnn_title: e.target.value })}
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <input
          type="text"
          value={form.bnn_description}
          onChange={(e) =>
            setForm({ ...form, bnn_description: e.target.value })
          }
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Imagen Desktop</label>
        <input
          type="file"
          onChange={(e) =>
            setForm({
              ...form,
              bnn_image_url_desktop: e.target.files ? e.target.files[0] : null,
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
        <label className="block text-sm font-medium">Imagen Mobile</label>
        <input
          type="file"
          onChange={(e) =>
            setForm({
              ...form,
              bnn_image_url_mobile: e.target.files ? e.target.files[0] : null,
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
          value={form.bnn_is_active}
          onChange={(e) => setForm({ ...form, bnn_is_active: e.target.value })}
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
          value={form.bnn_position}
          onChange={(e) => setForm({ ...form, bnn_position: e.target.value })}
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

export default BannerForm;
