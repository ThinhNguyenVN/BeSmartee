import { TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { IOrder, OrderNavigationProp } from "../../types";
import styles from "../styles";
import { Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type props = {
    order: IOrder;
};

export default function OrderItemView({ order }: props) {
    const navigation = useNavigation<OrderNavigationProp>();
    const Products = useMemo(() => {
        return order.products.map((item) => (
            <Text key={`product-item-${order.id}-${item.id}`}>
                {`${item.name} - ${item.quantity}`}
            </Text>
        ));
    }, [order.products]);

    const onPress = () => {
        navigation.navigate("OrderDetail", { order });
    };

    return (
        <TouchableOpacity style={styles.listOrderItem} onPress={onPress}>
            <Text variant="titleLarge">{`Order-${order.id}`}</Text>
            <View style={{ padding: 16 }}>{Products}</View>
            <TextInput
                mode="outlined"
                style={styles.noteInput}
                label="Note goes here"
                numberOfLines={5}
                multiline
                value={order.note}
                editable={false}
                disabled
            />
        </TouchableOpacity>
    );
}
