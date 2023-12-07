import { createContext } from "react";
import { IOrder } from "../types";

interface OrderContextProps {
    orders: IOrder[];
    setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

export const OrderContext = createContext<OrderContextProps>({
    orders: [],
    setOrders: () => {},
});
