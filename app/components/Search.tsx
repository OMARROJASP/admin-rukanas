"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleOnChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams); // Clonamos params actuales
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const [text, setText] = useState(searchParams.get("query") || "");

  return (
    <div className="mb-4 flex">
      <input
        type="text"
        placeholder="Buscar..."
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          handleOnChange(e.target.value); // Ejecuta la búsqueda al escribir
        }}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 h-[48px]"
        onClick={() => handleOnChange(text)} // Ejecuta la búsqueda al hacer click
      >
        Buscar
      </button>
    </div>
  );
};

export default Search;
