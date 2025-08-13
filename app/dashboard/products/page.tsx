import { fetchProducts } from "@/app/helpers/api"
import DataTable from "./data-table";
import Search from "@/app/components/Search";




const Products = async() => {
    const listProducts = await fetchProducts()
    return (
        <div>
        <h1>Lista de Productos</h1>
        <Search />
        <DataTable product={listProducts}/>
         
        </div>
    )
}

export default Products;