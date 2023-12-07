import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import styles from "../styles";
import ProductListView, { IInputProduct } from "../views/ProductListView";

import { useNavigation, useRoute } from "@react-navigation/native";
import { get } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function OrderCreateScreen() {
    const [isError, setIsError] = React.useState(false);
    const { params } = useRoute();
    const navigation = useNavigation();
    const order = get(params, "order", null);
    const [note, setNote] = React.useState(order?.note);

    const onProductChange = (products: IInputProduct[]) => {
        const hasErrorFromProductList = !!products.find((item) => !!item.error);
        setIsError(hasErrorFromProductList);
    };

    const onSubmit = () => {};

    return (
        <View style={styles.detailContainer}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={styles.headerBack}
                >
                    <Text variant="titleMedium">{" Back "} </Text>
                </TouchableOpacity>
                <Text variant="titleMedium" style={styles.headerTitle}>
                    {!order ? "Add new order" : `Order-${order.id}`}
                </Text>
            </View>
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
        </View>
    );
}
