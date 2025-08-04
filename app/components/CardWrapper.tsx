import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, TableProperties, ScrollText, ShoppingBag    } from 'lucide-react';
 const CardWrapper = async()  =>{

    const {fetchCustomers, fetchProducts, fetchOrders} = await import("../helpers/api");

    // Fetching data from the API
    const customers = await fetchCustomers();
    const products = await fetchProducts();
    const orders = await fetchOrders();

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex gap-2">
                        <User/>
                        Total Users
                    </CardTitle>
                    <CardDescription className="text-2xl font-semibold">{customers?.length}</CardDescription>
                </CardHeader>                       
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex gap-2">
                        <TableProperties />
                        Total Products
                    </CardTitle>
                    <CardDescription className="text-2xl font-semibold">{products?.length}</CardDescription>
                </CardHeader>                       
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex gap-2">
                        <ShoppingBag />
                        Total Orders
                    </CardTitle>
                    <CardDescription className="text-2xl font-semibold">{orders?.length}</CardDescription>
                </CardHeader>                       
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex gap-2">
                        <ScrollText />
                        Total Invoices
                    </CardTitle>
                    <CardDescription className="text-2xl font-semibold">800</CardDescription>
                </CardHeader>                       
            </Card>
       
        </>
    );
}

export default CardWrapper;

