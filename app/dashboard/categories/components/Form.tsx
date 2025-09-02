"use client"

import { useCreateCategoryMutation } from "@/services/categoryApi";
import { useState } from "react";

interface Category {
  cat_name: string;
  cat_description: string;  
  cat_imageUrl: File ;
  cat_status: string;
  cat_area: string;
}

const FormCategory = ()  => {
  const [createCategory, { isLoading, isSuccess, error }] = useCreateCategoryMutation();

  const [form, setForm] = useState<Category>({
    cat_name: "",
    cat_description: "",  
    cat_imageUrl: "" as unknown as File,
    cat_status: "",
    cat_area: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a una API
    console.log("Form data:", form);
    const formData = new FormData()
    // const values = {
    //   cat_name: formData.get(form.cat_name) as string,
    //   cat_description: formData.get(form.cat_description) as string,
    //   cat_imageUrl: formData.get(form.cat_imageUrl) as File,
    //   cat_status: formData.get(form.cat_status) as string,
    //   cat_area: formData.get(form.cat_area) as string,
      
    // }
    formData.append("cat_name", form.cat_name);
       formData.append("cat_description", form.cat_description); 
       if (typeof form.cat_imageUrl === "object") {
         formData.append("cat_imageUrl", form.cat_imageUrl);
       }
       formData.append("cat_status", form.cat_status);
       formData.append("cat_area", form.cat_area);
    setLoading(false);

    try {
      const res = await createCategory(formData).unwrap();// unwrap lanza error si falla ojo a eso xd
      console.log("Category created:", res);
    }catch (error) {
      console.error("Error creando categoría ❌", error);
    } finally {
      setLoading(false);
    }

       
    }
      
    





    return (
        <>
          <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
              <div>
                <h2>Creación de Categoria</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* NOMBRE  */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Nombre de la Categoria</label>
                  <input 
                    type="text"
                    value={form.cat_name}
                    onChange={(e) => setForm({...form, cat_name: e.target.value})}
                    className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
                  />
                </div>
                  {/* DESCRIPTION  */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Descripción de la Categoria</label>
                  <input 
                    type="text"
                    value={form.cat_description}
                    onChange={(e) => setForm({...form, cat_description: e.target.value})}
                    className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
                  />
                </div>
                  {/* IMAGEN  */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Imagen de la Categoria</label>
                  <input 
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                if (file){
                  setForm({ ...form, cat_imageUrl: file })
                }  
                    }}
                    className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
                  />
                </div>
                  {/* ESTADO  */}
                  <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Estado de la Categoria</label>
                  <select
                    value={form.cat_status ? "1" : "0"}
                    onChange={(e) => setForm({...form, cat_status: e.target.value})}
                    className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
                    >
                      <option value="0">Oculto</option>
                      <option value="1">Visible </option>
                  </select>
                </div>
                {/* AREA  */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Area de la Categoria</label>
                  <input 
                    type="text"
                    value={form.cat_area}
                    onChange={(e) => setForm({...form, cat_area: e.target.value})}
                    className="mt-1 block w-full border-gray-500 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 h-[30px]"
                  />
                </div>
              </div>
              <div>
                <button type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Guardar
                </button>
              </div>
          </form>
        </>
    );
}

export default FormCategory;