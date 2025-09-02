"use client";

import React from "react";
import {
  useGetCustomersQuery,
  type Customer,
  type responseCustomer,
} from "@/services/customerApi";
import Table from "../../components/Table"

const Customers = () => {
  const { data: responseCustomer, isLoading, error } = useGetCustomersQuery();
  const listCustomer: Customer[] = responseCustomer?.data ?? [];
  return (
    <>
      <div className="mb-4 px-4 py-2">
        <h1 className="text-black text-center text-2xl mb-3">Customers</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading data</p>}
        <Table<Customer>
          data={listCustomer}
          rowKey="cx_id"
          columns={[
            { key: "cx_id", header: "ID" },
            { key: "cx_first_name", header: "First Name" },
            { key: "cx_last_name", header: "Last Name" },
            { 
            key: "cx_phone", 
            header: "Phone",
            render: (c) => <span className="text-blue-600">{c.cx_phone}</span>
            },
            { key: "cx_address", header: "Address" },
            { key: "cx_city", header: "City" },
            { key: "cx_postal_code", header: "Zid Code" }
          ]}
        />
      </div>
    </>
  );
};

export default Customers;
