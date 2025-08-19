import Paginacion from "@/app/components/Pagination";
import DataTable from "./data-table";
import Search from "@/app/components/Search";
import { FC } from "react";
import { fetchProductsByFilters } from "@/app/helpers/api";
import Link from "next/link";


interface InvoiceProps {
    searchParams?: Promise<{
        text?: string,
        page?: string
    }>;
}

const Products: FC<InvoiceProps> = async({searchParams}) => {
    const params = await searchParams;
     const data = await fetchProductsByFilters(params?.text,Number(params?.page));
    const totalPages = data.pagination.totalPages
    return (
        <div>
        <h1>Lista de Productos</h1>
        <Search />
        <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            <Link href="/dashboard/products/create">Agregar Producto</Link>
        </button>
        <DataTable text={params?.text} page={params?.page}/> 
        <Paginacion text={params?.text} pageTotal={totalPages}/>        
        </div>
    )
}

export default Products;