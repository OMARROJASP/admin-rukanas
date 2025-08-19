import FormProduct from "@/app/components/FormProduct";
import CreateProductForm from "@/app/components/FormProductoAux";
import { fetchCategories } from "@/app/helpers/api";

const CreateProduct = async() => {

    const categories = await fetchCategories();
    return (
        <>
            <CreateProductForm    />
        </>
    )
}

export default CreateProduct;