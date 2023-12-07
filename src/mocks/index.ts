import { random, isEmpty } from "lodash";
import { IOrder } from "../types";
export const productNameMock = [
    "Bánh mì 362",
    "Lộc Coffee",
    "Quán Gà Duy và Thúy Comet",
    "The Coffee 1983",
    "Hủ Tiếu Gõ",
    "Gà Nướng Hồng Phúc",
    "Bubble - Milktea & Coffee",
    "Cô Trúc - Cơm Tấm",
    "Cơm Tấm Ba Bốn Ngon",
    "Lò Bánh Mì Huỳnh Mai",
];
export const noteMock = [
    "Beef Rattles Wafu - Cơm chiên bò Mỹ",
    "Sữa tươi trân châu đường đen, Sữa tươi đường đen",
    "Cơm gà teri, Mì ý, Bún thịt nướng",
    "Trà Xanh Bobapop, trà 4 Mùa Xuân",
    "Trái cây thập cẩm dầm sữa, Bánh tráng sa tế muối tắc",
    "Bánh mì 362, Bánh mì thịt nướng",
    "Happy Bowl, Sinh tố Bơ tươi",
    "Bánh mì 362,  Bánh mì thịt nướng,  Bánh mì gà",
    "Bánh tráng mắm ruốc, Bánh tráng tôm tỏi phi, Trái cây thập cẩm dầm sữa, Bánh tráng sa tế muối tắc",
    null,
];

export const quantityMock = [1, 2, 3, 4, 5, 5, 6, 22, 11, 33, 24];

export const getRandomArray = <T>(arr: Array<T>, length: number): Array<T> => {
    if (isEmpty(arr) || length <= 0) {
        return [];
    }
    const result: Array<T> = [];
    for (let i = 0; i < length; i++) {
        result.push(arr[random(arr.length)]);
    }
    return result;
};

const MAX_ORDER = 50;
const MAX_PRODUCT_ORDER = 5;

export const getMockOrders = () => {
    const notes = getRandomArray(noteMock, MAX_ORDER);
    const result = notes.map((note, index) => ({
        id: index + 1,
        note: note,
        products: getRandomArray(productNameMock, MAX_PRODUCT_ORDER).map(
            (name, index) => ({
                id: index,
                name,
                quantity: random(20),
            })
        ),
    })) as IOrder[];
    return result;
};
