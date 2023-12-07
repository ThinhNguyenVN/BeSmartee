import { NavigationProp } from "@react-navigation/native";

export interface IProduct {
    id: number;
    name: string;
    quantity: string | number;
}
export interface IOrder {
    id: number;
    note?: string;
    products: IProduct[];
}

const OrderItem = {
    id: 1,
    note: "hey this is note",
    products: [
        { id: 1, name: "product name", quantity: 2 },
        { id: 2, name: "product name 2", quantity: 1 },
        { id: 3, name: "product name 3", quantity: 3 },
        { id: 4, name: "product name 5", quantity: 4 },
        { id: 5, name: "product name 6", quantity: 6 },
        { id: 6, name: "product name 7", quantity: 12 },
    ],
};
export const OrderListMockData = [
    OrderItem,
    OrderItem,
    OrderItem,
    OrderItem,
    OrderItem,
    OrderItem,
];

export type OrderStackParamList = {
    OrderList: undefined;
    OrderDetail: {
        order: IOrder;
    };
};

export type OrderNavigationProp = NavigationProp<OrderStackParamList>;
