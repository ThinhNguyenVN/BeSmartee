import { TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { IOrder } from "../../types";
import styles from "../styles";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type props = {
    order: IOrder;
};

export default function OrderItemView({ order }: props) {
    const navigation = useNavigation();
    const Products = useMemo(() => {
        return order.products.map((item) => (
            <Text key={`product-item-${order.id}-${item.id}`}>
                {" "}
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
            <View style={{ paddingHorizontal: 16 }}>{Products}</View>

            <View style={styles.orderItemNoteView}>
                <Text variant="labelLarge" style={styles.noteTitle}>
                    Note goes here
                </Text>
                <Text>{order.note}</Text>
            </View>
        </TouchableOpacity>
    );
}
