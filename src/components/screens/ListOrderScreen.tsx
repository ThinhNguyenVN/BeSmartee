import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { ActivityIndicator, FlatList } from "react-native";
import styles from "../styles";

import { OrderContext } from "../../contexts";
import { IOrder } from "../../types";
import OrderItemView from "../views/OrderItemView";
import { MAX_ORDER_PAGE, getOrdersAsync } from "../../api";

export default function ListOrderScreen() {
    const [data, setData] = useState<IOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const nextPageIdentifierRef = useRef<number>(0);
    const { orders } = useContext(OrderContext);
    const [isMaxPage, setIsMaxPage] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        getOrdersAsync(nextPageIdentifierRef.current ?? 0, orders)
            .then((response) => {
                setData([...data, ...response.data]);
                nextPageIdentifierRef.current =
                    (nextPageIdentifierRef.current ?? 0) + 1;

                if (
                    nextPageIdentifierRef.current * MAX_ORDER_PAGE >=
                    response.maxLength
                ) {
                    setIsMaxPage(true);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const fetchNextPage = () => {
        if (isMaxPage || isLoading) {
            return;
        }
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setData((prev) => orders.slice(0, prev.length - 1));
    }, [orders]);

    const renderItem = ({ item }: { item: IOrder }) => {
        return <OrderItemView order={item} />;
    };

    const ListEndLoader = () => {
        if (isLoading) {
            return (
                <ActivityIndicator
                    size={"small"}
                    style={{ paddingVertical: 16 }}
                />
            );
        }
    };

    return (
        <FlatList
            style={styles.container}
            data={data}
            renderItem={renderItem}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.8}
            keyExtractor={(_, index) => `order-item-${index}`}
            ListFooterComponent={ListEndLoader}
        />
    );
}
