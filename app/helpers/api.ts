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
        console.log("data products from:", productsResult.data.length);
        return productsResult.data;
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

