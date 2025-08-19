export const fetchCustomers = async () => {
    try {
        const fetchCustomers = await fetch(`${process.env.BACKEND_URL}/customer`);
        const customersResult = await fetchCustomers.json();
        console.log("data customers from:", customersResult.data.length);
        return customersResult.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
export const fetchProducts = async () => {
    try {
        const fetchProducts = await fetch(`${process.env.BACKEND_URL}/product`);
        const productsResult = await fetchProducts.json();
        console.log("data products from:", productsResult.data);
        return productsResult.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }   
}

export const saveProduct = async ( product: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product`, {
      method: "POST",
      body: product,
    });

    // Si no responde bien

    const data = await res.json(); // 👈 solo una vez

    if (!res.ok) {
      throw new Error(data.message || "Error al guardar producto");
    }

    return data; // { message, data, success }
  } catch (error) {
    console.error("Error en saveProduct:", error);
    throw error;
  }
};

export const updateProduct = async (id: number, product: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`, {
      method: "PUT",
      body: product,
    });

    // Si no responde bien

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al actualizar producto");
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};


export const fetchProductsById = async (id:number) => {
    try {
        const fetchProduct = await fetch(`${process.env.BACKEND_URL}/product/${id}`);
        const productResult = await fetchProduct.json();
        console.log("data product from:", productResult.data);
        return productResult.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }   
}

export const fetchCategories = async () => {
    try {
        const fetchCategories = await fetch(`${process.env.BACKEND_URL}/category`);
        const categoriesResult = await fetchCategories.json();
        console.log("data categories from:", categoriesResult.data);
        return categoriesResult.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }   
}

export const fetchOrders = async () => {
    try {
        const fetchOrder = await fetch(`${process.env.BACKEND_URL}/order`);   
        const orderResult = await fetchOrder.json();
        console.log("data invoices from:", orderResult.data.length);
        return orderResult.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }       
}

export const fetchOrdersForDays = async () => {
    try {
        const fetchOrder = await fetch(`${process.env.BACKEND_URL}/order/allday`);   
        const orderResult = await fetchOrder.json();
        console.log("data order by days from:", orderResult.data);
        return orderResult.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }       
}

export interface Product {
  prod_id: string;
  prod_name: string;
  prod_price: string;
  prod_description: string;
  prod_imageUrl: string;      
  prod_category: string;
  prod_stock: number;
  prod_ofert: number;
  prod_supplier: string;
  prod_state: boolean;
}

export interface Pagination {
    totalItems:Product[];
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
}


export interface Data {
    products: Product[];
    pagination: Pagination;
}

export const fetchProductsByFilters = async (texto?: string, page?:number): Promise<Data>  => {
    try {
        //const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
       //const params = {
         //   text: texto || "",
        //    category: "3",
        //    page: "2"
        //};
        // console.log("Antes de la llamada")
        const limit = 3
       
    const fetchProducts = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/filtro?text=${encodeURIComponent(texto || "")}&page=${encodeURIComponent(page || 1)}&limit=${encodeURIComponent(limit)}`
    );
        const productsResult = await fetchProducts.json();
        //  await new Promise(resolve => setTimeout(resolve, 3000)); // Simula un retraso de 1 segundo
        //   console.log("Despues de la llamada")
        console.log(productsResult.data)
        //return productsResult.data.products as Product[];
        return productsResult.data as Data;
    } catch (error) {
        console.error("Error fetching data:", error);
         return {
      products: [],
      pagination: {
        totalItems: [],
        currentPage: page || 1,
        totalPages: 0,
        itemsPerPage: 3,
      },
    };
    }   
}

