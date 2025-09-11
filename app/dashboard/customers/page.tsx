"use client";

import React from "react";
import {
  useGetCustomerFilterQuery,
  type Customer,
} from "@/services/customerApi";
import Table from "../../components/Table";
import SearchC from "@/app/components/SearchC";
import PaginacionC from "@/app/components/PaginationC";
import { useSearchParams } from "next/navigation";

const Customers = () => {
   const searchParams = useSearchParams();
  const _text = searchParams.get("text") ?? "";
   const _page = Number(searchParams.get("page")) || 1;
   
   const [search, setSearch] = React.useState<string>(_text);
   const [page, setPage] = React.useState<number>(_page);

  // Hook para todos los clientes
 const { data: filteredCustomers, isLoading, error } = useGetCustomerFilterQuery({ text: search, pag:page });
  const totalPages = filteredCustomers?.data.pagination.totalPages ?? 1;
  // Escoge qué datos mostrar
  const listCustomers =
    search && filteredCustomers?.data.customersTotal
      ? filteredCustomers.data.customersTotal
      : filteredCustomers?.data.customersTotal ?? [];

  return (
    <div className="mb-4 px-4 py-2">
      <h1 className="text-black text-center text-2xl mb-3">Customers</h1>

      <SearchC onSend={setSearch} />

      {(isLoading) && <p>Loading...</p>}
      {(error) && <p>Error loading data</p>}

      <Table<Customer>
        data={listCustomers}
        rowKey="cx_id"
        columns={[
          { key: "cx_id", header: "ID" },
          { key: "cx_first_name", header: "First Name" },
          { key: "cx_last_name", header: "Last Name" },
          {
            key: "cx_phone",
            header: "Phone",
            render: (c) => (
              <span className="text-blue-600">{c.cx_phone}</span>
            ),
          },
          { key: "cx_address", header: "Address" },
          { key: "cx_city", header: "City" },
          { key: "cx_postal_code", header: "Zip Code" },
        ]}
      />
       <PaginacionC text={search} pageTotal={totalPages} ContPage={setPage}/>  
    </div>
  );
};

export default Customers;
