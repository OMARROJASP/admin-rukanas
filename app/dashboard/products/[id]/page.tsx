
import CreateProductForm from "@/app/components/FormProductoAux";
import { fetchCategories, fetchProductsById } from "@/app/helpers/api";

interface PageProps {
  params: Promise<{ id: string }>;
}


const Page =  async ({params}: PageProps) => {
  const { id} = await params;
   const categories = await fetchCategories();
   const product = await fetchProductsById(parseInt(id));



  return (
    <>
      <CreateProductForm product={product} categories={categories}  />
    </>
  );
};

export default Page;
