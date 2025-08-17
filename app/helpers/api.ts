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

export const fetchProductsByFilters = async (texto?: string) => {
    try {
        //const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
       //const params = {
         //   text: texto || "",
        //    category: "3",
        //    page: "2"
        //};
        console.log("Antes de la llamada")
       
        const fetchProducts = await fetch(`http://localhost:3001/product/filtro?text=${encodeURIComponent(texto || "")}`)
        const productsResult = await fetchProducts.json();
         await new Promise(resolve => setTimeout(resolve, 3000)); // Simula un retraso de 1 segundo
          console.log("Despues de la llamada")
        return productsResult.data.products as Product[];
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }   
}

