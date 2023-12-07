import { IOrder } from "../types";
import { random } from "lodash";

export const MAX_ORDER_PAGE = 10;

export interface IOrderPayload {
    currentPage: number;
    maxLength: number;
    data: IOrder[];
}

export const getOrdersAsync = (
    currentPage: number,
    rootData: IOrder[]
): Promise<IOrderPayload> => {
    return new Promise((resolve) => {
        const currentIndex = currentPage * MAX_ORDER_PAGE;
        const data = rootData.slice(
            currentIndex,
            Math.min(currentIndex + MAX_ORDER_PAGE, rootData.length)
        );
        setTimeout(() => {
            resolve({
                currentPage,
                maxLength: rootData.length,
                data: data,
            });
        }, random(3) * 1000);
    });
};
