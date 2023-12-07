import { maxBy } from "lodash";
import React, { useCallback, useContext, useEffect } from "react";
import { Alert, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import styles from "../styles";
import ProductListView, { IInputProduct } from "../views/ProductListView";

import { useNavigation, useRoute } from "@react-navigation/native";
import { get } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { OrderContext } from "../../contexts";
import { IOrder, OrderNavigationProp } from "../../types";

export default function OrderCreateScreen() {
    const { setOrders, orders } = useContext(OrderContext);
    const [isError, setIsError] = React.useState(false);
    const { params } = useRoute();
    const navigation = useNavigation<OrderNavigationProp>();
    const order = get(params, "order", null) as IOrder | any;
    const [note, setNote] = React.useState(order?.note);

    const [products, setProducts] = React.useState<IInputProduct[]>(
        order?.products ?? []
    );

    const onProductChange = (list: IInputProduct[]) => {
        const hasErrorFromProductList = !!list.find((item) => !!item.error);
        setIsError(!products.length || hasErrorFromProductList);
        setProducts(list);
    };

    const onSubmit = () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to submit your order?",
            [
                {
                    text: "Yes",
                    onPress: onSaveOrder,
                },
                {
                    text: "No",
                    style: "cancel",
                },
            ]
        );
    };

    const onDeletePress = () => {
        Alert.alert(
            "Delete Order",
            "Are you sure you want to Delete this order?",
            [
                {
                    text: "Yes",
                    onPress: onDeleteOrder,
                },
                {
                    text: "No",
                    style: "cancel",
                },
            ]
        );
    };

    const onDeleteOrder = () => {
        if (!order) {
            return;
        }
        const ordersTmp = [...orders].filter((i) => i.id !== order.id);
        setOrders(ordersTmp);
        navigation.goBack();
    };

    const onSaveOrder = useCallback(() => {
        const ordersTmp = [...orders];
        if (order) {
            let orderIndex = ordersTmp.findIndex(
                (item) => item.id === order.id
            );
            const modifyOrder = {
                ...order,
                note: note,
                products,
            };
            ordersTmp[orderIndex] = modifyOrder;
            setOrders(ordersTmp);
            navigation.goBack();
        } else {
            const newOrder = {
                id: (maxBy(orders, "id")?.id ?? 0) + 1,
                note: note,
                products,
            };
            ordersTmp.unshift(newOrder);
            setOrders(ordersTmp);
            navigation.reset({
                index: 0,
                // @ts-ignore
                routes: [{ name: "Order" }],
            });
        }
    }, [orders, note, products]);

    return (
        <View style={styles.detailContainer}>
            <KeyboardAwareScrollView>
                <TextInput
                    mode="outlined"
                    style={styles.noteInput}
                    label="Note"
                    placeholder="Add note here"
                    numberOfLines={5}
                    multiline
                    value={note}
                    onChangeText={(text) => setNote(text)}
                />

                <ProductListView
                    onChange={onProductChange}
                    productList={order?.products}
                />
            </KeyboardAwareScrollView>
            <Button mode="contained" onPress={onSubmit} disabled={isError}>
                Submit
            </Button>
            {!!order && (
                <Button
                    mode="outlined"
                    onPress={onDeletePress}
                    disabled={isError}
                    style={{ marginTop: 16 }}
                >
                    Delete
                </Button>
            )}
        </View>
    );
}
