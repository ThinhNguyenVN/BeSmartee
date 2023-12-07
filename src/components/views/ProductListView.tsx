// @ts-ignore
import { maxBy } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Divider, TextInput } from "react-native-paper";
import { IProduct } from "../../types";
import styles from "../styles";
import { useDidUpdateEffect } from "../../hooks";

type props = {
    productList?: IProduct[];
    onChange: (products: IInputProduct[]) => void;
};

export interface IInputProduct extends IProduct {
    error?: boolean;
}

export default function ProductListView({ productList, onChange }: props) {
    const [products, setProducts] = useState<IInputProduct[]>(
        productList || []
    );

    const onAddProduct = () => {
        const productsTmp = [...products];
        const newId = (maxBy(products, "id")?.id ?? 0) + 1;

        productsTmp.push({
            id: newId,
            name: `New product name ${newId}`,
            quantity: 1,
            error: false,
        });
        setProducts(productsTmp);
    };

    const onremoveProduct = (id: number) => () => {
        const productsTmp = [...products].filter((item) => item.id !== id);
        setProducts(productsTmp);
    };

    const onModifyProduct = (product: IInputProduct) => {
        const productsTmp = [...products];
        const productIndex = productsTmp.findIndex(
            (item) => item.id === product.id
        );
        if (productIndex >= 0) {
            product.error = !(product.quantity && product.name);
            productsTmp[productIndex] = product;
            setProducts(productsTmp);
        }
    };

    useDidUpdateEffect(() => {
        onChange(products);
    }, [products]);

    const ProductItems = useMemo(() => {
        return products.map((item, index) => (
            <View key={`add-product-item-${index}`}>
                <View style={styles.productItemView}>
                    <TouchableOpacity onPress={onremoveProduct(item.id)}>
                        <Text>X</Text>
                    </TouchableOpacity>
                    <TextInput
                        mode="outlined"
                        style={{ height: 32, flex: 1, marginHorizontal: 16 }}
                        value={item.name}
                        error={item.error}
                        onChangeText={(text) =>
                            onModifyProduct({ ...item, name: text })
                        }
                    />
                    <TextInput
                        mode="outlined"
                        style={{ height: 32, width: 40 }}
                        value={item.quantity.toString()}
                        inputMode="numeric"
                        maxLength={2}
                        error={item.error}
                        onChangeText={(value) =>
                            onModifyProduct({ ...item, quantity: value })
                        }
                    />
                </View>
                <Divider />
            </View>
        ));
    }, [products]);

    return (
        <View>
            <TouchableOpacity
                style={{ flexDirection: "row", marginVertical: 16 }}
                onPress={onAddProduct}
            >
                <Text style={{ color: "green" }}>Add product</Text>
            </TouchableOpacity>
            {ProductItems}
        </View>
    );
}
