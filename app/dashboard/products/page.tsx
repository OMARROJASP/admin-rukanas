import DataTable from "./data-table";
import Search from "@/app/components/Search";
import { FC } from "react";


interface InvoiceProps {
    searchParams?: Promise<{text?: string}>;
}

const Products: FC<InvoiceProps> = async({searchParams}) => {
    const params = await searchParams;
    
    return (
        <div>
        <h1>Lista de Productos</h1>
        <Search />
        <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Agregar Producto</button>
        <DataTable text={params?.text}/>         
        </div>
    )
}

export default Products;