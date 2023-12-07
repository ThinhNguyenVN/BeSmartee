export interface IProduct {
    name: string;
    quantity: number;
}
export interface IOrder {
    id: number;
    note: string;
    products: IProduct[];
}
