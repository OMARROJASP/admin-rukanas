
import CardWrapper from "../components/CardWrapper";
import ChartWrapper from "../components/ChartWrapper";

import { fetchOrdersForDays } from "../helpers/api";


const Dashboard = async() => {
    const OrdersForDays = await fetchOrdersForDays();
    return (
        <>
            <div>
                <p>Welcome to the dashboard!</p>  
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 " >
                    <CardWrapper />                    
                </div>
                <div>
                    data de las ordenes por dia:
                    <ChartWrapper data={OrdersForDays}/>
                </div>         
            </div>
        </>
    )
}

export default Dashboard;