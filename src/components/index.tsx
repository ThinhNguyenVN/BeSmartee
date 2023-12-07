import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView } from "react-native";
import AppNavigation from "./navigators";
import styles from "./styles";
import { OrderContext } from "../contexts";
import { IOrder, OrderListMockData } from "../types";
import { getMockOrders } from "../mocks";

function App() {
    const [orders, setOrders] = React.useState<IOrder[]>(getMockOrders());

    return (
        <SafeAreaView style={styles.container}>
            <OrderContext.Provider value={{ orders, setOrders }}>
                <NavigationContainer>
                    <AppNavigation />
                </NavigationContainer>
            </OrderContext.Provider>
        </SafeAreaView>
    );
}

export default App;
