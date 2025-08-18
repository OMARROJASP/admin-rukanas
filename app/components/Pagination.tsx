"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { FC, useEffect, useState,  } from "react";
import { fetchProductsByFilters } from "../helpers/api";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface PaginationProps {
    text?: string;
    pageTotal?:number
}


const Paginacion: FC<PaginationProps> =({text,pageTotal=3 }) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
      const { replace } = useRouter();

    const [page, setPage] = useState(1)
    const totalPages = pageTotal
    useEffect(() => {
        async function loadProdcuts(value:string) {
            const params = new URLSearchParams(searchParams)
            if (value) {
      params.set("page", value);
    } else {
      params.delete("page");
    }


            await fetchProductsByFilters(text,page)
             replace(`${pathname}?${params.toString()}`);
        }
        
        loadProdcuts(page.toString())
    },[page])

    return(
        <>
        <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" 
        onClick={(e) => {
            e.preventDefault()
            if (page > 1) setPage(page - 1)
        }}
      />
    </PaginationItem>
    {Array.from({ length: totalPages ?? 0 }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={page === i + 1}
              onClick={(e) => {
                e.preventDefault()
                setPage(i + 1)
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext 
       href="#"
            onClick={(e) => {
              e.preventDefault()
              if (page < totalPages) setPage(page + 1)
            }} />
    </PaginationItem>
  </PaginationContent>
</Pagination>
        </>
    )

}

export default Paginacion;