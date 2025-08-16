
import FormProduct from "@/app/components/FormProduct";
import { fetchCategories } from "@/app/helpers/api";
const Page =  async () => {
   const categories = await fetchCategories();




  return (
    <>
      <FormProduct categories={categories}  />
    </>
  );
};

export default Page;
