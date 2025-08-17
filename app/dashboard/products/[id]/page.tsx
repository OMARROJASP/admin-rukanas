
import FormProduct from "@/app/components/FormProduct";
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
      <FormProduct producto={product} categories={categories}  />
    </>
  );
};

export default Page;
